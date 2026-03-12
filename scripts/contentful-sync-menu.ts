import { config as loadEnv } from 'dotenv';
import contentfulManagement from 'contentful-management';
import { fallbackMenuCategories } from '../lib/menu-fallback';
import type { MenuCategory, MenuItem } from '../lib/menu';

const CONTENT_TYPE_ID = 'menuItem';
const FEATURE_TAGS = ['Vegetarian', 'Gluten Free', 'Bestseller'] as const;
const MAX_ENTRIES = 1000;

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

const normalizeKey = (category: string, name: string) => {
  return `${category.trim().toLowerCase()}::${name.trim().toLowerCase()}`;
};

const parseFeatures = (raw?: string) => {
  if (!raw) return [] as string[];

  const cleaned = raw.trim();
  if (!cleaned) return [] as string[];

  if (cleaned.includes(',')) {
    return cleaned
      .split(',')
      .map((part) => part.trim())
      .filter(Boolean);
  }

  const matched = FEATURE_TAGS.filter((tag) => cleaned.includes(tag));
  if (matched.length > 0) {
    return [...matched];
  }

  return [cleaned];
};

const flattenMenu = (categories: MenuCategory[]) => {
  const flattened: Array<{
    category: string;
    item: MenuItem;
    sortOrder: number;
    key: string;
  }> = [];

  for (const category of categories) {
    category.items.forEach((item, index) => {
      flattened.push({
        category: category.name,
        item,
        sortOrder: index + 1,
        key: normalizeKey(category.name, item.name),
      });
    });
  }

  return flattened;
};

const getLocalizedValue = (entry: any, fieldId: string, locale: string) => {
  return entry?.fields?.[fieldId]?.[locale];
};

const setLocalizedValue = (
  entry: any,
  fieldId: string,
  locale: string,
  value: string | number | string[] | undefined,
) => {
  entry.fields = entry.fields ?? {};
  entry.fields[fieldId] = entry.fields[fieldId] ?? {};

  const previous = entry.fields[fieldId][locale];

  if (value === undefined) {
    if (previous === undefined) return false;
    delete entry.fields[fieldId][locale];
    return true;
  }

  const changed = JSON.stringify(previous) !== JSON.stringify(value);
  if (changed) {
    entry.fields[fieldId][locale] = value;
  }

  return changed;
};

const printHelp = () => {
  console.log('Usage: pnpm contentful:sync-menu [--dry-run] [--archive-missing]');
  console.log('');
  console.log('--dry-run         Show planned creates/updates without writing to Contentful.');
  console.log('--archive-missing Archive existing Contentful menu entries not present in local menu data.');
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

const ensureMenuContentType = async (environment: any) => {
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
      name: 'Menu Item',
      displayField: 'name',
      fields: [
        {
          id: 'name',
          name: 'Name',
          type: 'Symbol',
          required: true,
          localized: false,
        },
        {
          id: 'category',
          name: 'Category',
          type: 'Symbol',
          required: true,
          localized: false,
        },
        {
          id: 'price',
          name: 'Price',
          type: 'Number',
          required: true,
          localized: false,
        },
        {
          id: 'description',
          name: 'Description',
          type: 'Text',
          required: false,
          localized: false,
        },
        {
          id: 'features',
          name: 'Features',
          type: 'Array',
          required: false,
          localized: false,
          items: {
            type: 'Symbol',
          },
        },
        {
          id: 'sortOrder',
          name: 'Sort Order',
          type: 'Integer',
          required: false,
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
  const defaultLocale = locales.items.find((item: any) => item.default)?.code || locales.items[0]?.code || 'en-US';

  const contentType = await ensureMenuContentType(environment);
  const contentTypeFieldIds = new Set((contentType.fields || []).map((field: any) => field.id));
  const featuresField = (contentType.fields || []).find((field: any) => field.id === 'features');
  const featuresFieldType = featuresField?.type;

  const requiredFieldIds = ['name', 'category', 'price'];
  const missingRequired = requiredFieldIds.filter((fieldId) => !contentTypeFieldIds.has(fieldId));
  if (missingRequired.length > 0) {
    throw new Error(
      `Content type \"${CONTENT_TYPE_ID}\" is missing required fields: ${missingRequired.join(', ')}`,
    );
  }

  const existing = await environment.getEntries({
    content_type: CONTENT_TYPE_ID,
    limit: MAX_ENTRIES,
  });

  const existingByKey = new Map<string, any>();
  for (const entry of existing.items || []) {
    const category = getLocalizedValue(entry, 'category', defaultLocale);
    const name = getLocalizedValue(entry, 'name', defaultLocale);

    if (typeof category !== 'string' || typeof name !== 'string') {
      continue;
    }

    existingByKey.set(normalizeKey(category, name), entry);
  }

  const flattenedMenu = flattenMenu(fallbackMenuCategories);

  let created = 0;
  let updated = 0;
  let published = 0;
  let unchanged = 0;
  let archived = 0;

  for (const row of flattenedMenu) {
    const existingEntry = existingByKey.get(row.key);

    const featureList = parseFeatures(row.item.features);
    const normalizedFeatures =
      featureList.length === 0
        ? undefined
        : featuresFieldType === 'Array'
          ? featureList
          : featureList.join(' ');

    const fieldPayload: Record<string, string | number | string[] | undefined> = {
      name: row.item.name,
      category: row.category,
      price: row.item.price,
      description: row.item.description,
      features: normalizedFeatures,
      sortOrder: row.sortOrder,
    };

    if (!contentTypeFieldIds.has('description')) {
      delete fieldPayload.description;
    }
    if (!contentTypeFieldIds.has('features')) {
      delete fieldPayload.features;
    }
    if (!contentTypeFieldIds.has('sortOrder')) {
      delete fieldPayload.sortOrder;
    }

    if (!existingEntry) {
      if (isDryRun) {
        console.log(`[dry-run] create ${row.category} -> ${row.item.name}`);
      } else {
        const fields: Record<string, Record<string, string | number | string[]>> = {};

        for (const [fieldId, value] of Object.entries(fieldPayload)) {
          if (value === undefined) continue;
          fields[fieldId] = { [defaultLocale]: value };
        }

        const createdEntry = await environment.createEntry(CONTENT_TYPE_ID, { fields });
        created += 1;

        await createdEntry.publish();
        published += 1;

        console.log(`created ${row.category} -> ${row.item.name}`);
      }

      continue;
    }

    existingByKey.delete(row.key);

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
      console.log(`[dry-run] update ${row.category} -> ${row.item.name}`);
      continue;
    }

    const updatedEntry = await existingEntry.update();
    updated += 1;

    await updatedEntry.publish();
    published += 1;

    console.log(`updated ${row.category} -> ${row.item.name}`);
  }

  if (shouldArchiveMissing) {
    for (const entry of existingByKey.values()) {
      const category = getLocalizedValue(entry, 'category', defaultLocale) || 'Unknown';
      const name = getLocalizedValue(entry, 'name', defaultLocale) || entry?.sys?.id;

      if (isDryRun) {
        console.log(`[dry-run] archive missing ${category} -> ${name}`);
        continue;
      }

      let workingEntry = entry;
      if (typeof entry.isPublished === 'function' && entry.isPublished()) {
        workingEntry = await entry.unpublish();
      }

      await workingEntry.archive();
      archived += 1;

      console.log(`archived missing ${category} -> ${name}`);
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
  console.log(`Total source items: ${flattenedMenu.length}`);
};

main().catch((error) => {
  console.error('contentful-sync-menu failed');
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
