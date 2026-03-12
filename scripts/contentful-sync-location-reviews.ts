import { config as loadEnv } from 'dotenv';
import contentfulManagement from 'contentful-management';

const CONTENT_TYPE_ID = 'locationReview';
const MAX_ENTRIES = 200;

const sourceReviews = [
  {
    locationId: 'media-city',
    rating: 4.3,
    ratingCount: '297',
  },
  {
    locationId: 'business-bay',
    rating: 4.3,
    ratingCount: '401',
  },
];

loadEnv({ path: '.env.local' });
loadEnv();

const args = new Set(process.argv.slice(2));
const isDryRun = args.has('--dry-run');
const shouldArchiveMissing = args.has('--archive-missing');

const getRequiredEnv = (key: string) => {
  const value = process.env[key]?.trim();
  if (!value) {
    throw new Error(`Missing required env var: ${key}`);
  }
  return value;
};

const normalizeLocationId = (value: string) => value.trim().toLowerCase();

const getLocalizedValue = (entry: any, fieldId: string, locale: string) => {
  return entry?.fields?.[fieldId]?.[locale];
};

const setLocalizedValue = (
  entry: any,
  fieldId: string,
  locale: string,
  value: string | number | undefined,
) => {
  entry.fields = entry.fields ?? {};
  entry.fields[fieldId] = entry.fields[fieldId] ?? {};

  const previous = entry.fields[fieldId][locale];

  if (value === undefined) {
    if (previous === undefined) return false;
    delete entry.fields[fieldId][locale];
    return true;
  }

  const changed = previous !== value;
  if (changed) {
    entry.fields[fieldId][locale] = value;
  }

  return changed;
};

const getErrorStatus = (error: unknown) => {
  if (typeof error !== 'object' || error === null) return undefined;
  const candidate = (
    error as {
      status?: number | string;
      statusCode?: number | string;
      response?: { status?: number | string };
    }
  );

  const values = [candidate.status, candidate.statusCode, candidate.response?.status];

  for (const value of values) {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return undefined;
};

const printHelp = () => {
  console.log('Usage: pnpm contentful:sync-location-reviews [--dry-run] [--archive-missing]');
  console.log('');
  console.log('--dry-run         Show planned creates/updates without writing to Contentful.');
  console.log('--archive-missing Archive existing Contentful review entries not present in local source data.');
};

const ensureLocationReviewContentType = async (environment: any) => {
  try {
    return await environment.getContentType(CONTENT_TYPE_ID);
  } catch (error) {
    const statusCode = getErrorStatus(error);
    const serializedError =
      typeof error === 'string' ? error : JSON.stringify(error ?? {});
    const isNotFound =
      statusCode === 404 ||
      serializedError.includes('"status":404') ||
      serializedError.includes('resource could not be found') ||
      serializedError.includes(`"id":"${CONTENT_TYPE_ID}"`);

    if (!isNotFound) {
      throw error;
    }

    console.log(`Content type "${CONTENT_TYPE_ID}" not found, creating it...`);

    const created = await environment.createContentTypeWithId(CONTENT_TYPE_ID, {
      name: 'Location Review',
      displayField: 'locationId',
      fields: [
        {
          id: 'locationId',
          name: 'Location ID',
          type: 'Symbol',
          required: true,
          localized: false,
        },
        {
          id: 'rating',
          name: 'Rating',
          type: 'Number',
          required: true,
          localized: false,
        },
        {
          id: 'ratingCount',
          name: 'Rating Count',
          type: 'Symbol',
          required: true,
          localized: false,
        },
      ],
    });

    const published = await created.publish();
    console.log(`Created and published content type "${CONTENT_TYPE_ID}".`);
    return published;
  }
};

const main = async () => {
  if (args.has('--help') || args.has('-h')) {
    printHelp();
    return;
  }

  const spaceId = getRequiredEnv('CONTENTFUL_SPACE_ID');
  const cmaToken = getRequiredEnv('CONTENTFUL_CMA_TOKEN');
  const environmentId = process.env.CONTENTFUL_ENVIRONMENT?.trim() || 'master';

  const client = contentfulManagement.createClient({ accessToken: cmaToken });
  const space = await client.getSpace(spaceId);
  const environment = await space.getEnvironment(environmentId);

  const locales = await environment.getLocales();
  const defaultLocale =
    locales.items.find((item: any) => item.default)?.code ||
    locales.items[0]?.code ||
    'en-US';

  const contentType = await ensureLocationReviewContentType(environment);
  const contentTypeFieldIds = new Set(
    (contentType.fields || []).map((field: any) => field.id),
  );

  const requiredFieldIds = ['locationId', 'rating', 'ratingCount'];
  const missingRequired = requiredFieldIds.filter(
    (fieldId) => !contentTypeFieldIds.has(fieldId),
  );

  if (missingRequired.length > 0) {
    throw new Error(
      `Content type "${CONTENT_TYPE_ID}" is missing required fields: ${missingRequired.join(', ')}`,
    );
  }

  const existing = await environment.getEntries({
    content_type: CONTENT_TYPE_ID,
    limit: MAX_ENTRIES,
  });

  const existingByLocationId = new Map<string, any>();
  for (const entry of existing.items || []) {
    const locationId = getLocalizedValue(entry, 'locationId', defaultLocale);
    if (typeof locationId !== 'string') {
      continue;
    }

    existingByLocationId.set(normalizeLocationId(locationId), entry);
  }

  let created = 0;
  let updated = 0;
  let published = 0;
  let unchanged = 0;
  let archived = 0;

  for (const row of sourceReviews) {
    const key = normalizeLocationId(row.locationId);
    const existingEntry = existingByLocationId.get(key);
    const fieldPayload: Record<string, string | number> = {
      locationId: row.locationId,
      rating: row.rating,
      ratingCount: row.ratingCount,
    };

    if (!existingEntry) {
      if (isDryRun) {
        console.log(`[dry-run] create ${row.locationId}`);
      } else {
        const fields: Record<string, Record<string, string | number>> = {};
        for (const [fieldId, value] of Object.entries(fieldPayload)) {
          fields[fieldId] = { [defaultLocale]: value };
        }

        const createdEntry = await environment.createEntry(CONTENT_TYPE_ID, { fields });
        created += 1;

        await createdEntry.publish();
        published += 1;

        console.log(`created ${row.locationId}`);
      }

      continue;
    }

    existingByLocationId.delete(key);

    let hasChanges = false;
    for (const [fieldId, value] of Object.entries(fieldPayload)) {
      const changed = setLocalizedValue(existingEntry, fieldId, defaultLocale, value);
      hasChanges = hasChanges || changed;
    }

    if (!hasChanges) {
      unchanged += 1;
      continue;
    }

    if (isDryRun) {
      console.log(`[dry-run] update ${row.locationId}`);
      continue;
    }

    const updatedEntry = await existingEntry.update();
    updated += 1;

    await updatedEntry.publish();
    published += 1;

    console.log(`updated ${row.locationId}`);
  }

  if (shouldArchiveMissing) {
    for (const entry of existingByLocationId.values()) {
      const locationId =
        getLocalizedValue(entry, 'locationId', defaultLocale) || entry?.sys?.id;

      if (isDryRun) {
        console.log(`[dry-run] archive missing ${locationId}`);
        continue;
      }

      let workingEntry = entry;
      if (typeof entry.isPublished === 'function' && entry.isPublished()) {
        workingEntry = await entry.unpublish();
      }

      await workingEntry.archive();
      archived += 1;

      console.log(`archived missing ${locationId}`);
    }
  }

  console.log('');
  console.log('Sync complete');
  console.log(`Dry run: ${isDryRun ? 'yes' : 'no'}`);
  console.log(`Created: ${created}`);
  console.log(`Updated: ${updated}`);
  console.log(`Published: ${published}`);
  console.log(`Unchanged: ${unchanged}`);
  console.log(`Archived: ${archived}`);
  console.log(`Total source items: ${sourceReviews.length}`);
};

main().catch((error) => {
  console.error('contentful-sync-location-reviews failed');
  console.error(error instanceof Error ? error.message : error);

  const statusCode = getErrorStatus(error);
  const serializedError =
    typeof error === 'string' ? error : JSON.stringify(error ?? {});

  if (statusCode === 401 || serializedError.includes('access token you sent')) {
    console.error(
      'Hint: CONTENTFUL_CMA_TOKEN must be a valid Content Management API token with access to this space.',
    );
  }

  process.exitCode = 1;
});
