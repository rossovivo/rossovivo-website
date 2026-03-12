import { config as loadEnv } from "dotenv";
import contentfulManagement from "contentful-management";

type FieldSpec = {
  id: string;
  name: string;
  type: string;
  required?: boolean;
  localized?: boolean;
  disabled?: boolean;
  omitted?: boolean;
  validations?: any[];
  items?: any;
  linkType?: "Entry" | "Asset";
};

type ContentTypeSpec = {
  id: string;
  name: string;
  displayField: string;
  description?: string;
  fields: FieldSpec[];
};

loadEnv({ path: ".env.local" });
loadEnv();

const args = new Set(process.argv.slice(2));
const isDryRun = args.has("--dry-run");
const onlyArg = process.argv
  .slice(2)
  .find((arg) => arg.startsWith("--only="));
const onlyTypeIds = onlyArg
  ? new Set(
      onlyArg
        .slice("--only=".length)
        .split(",")
        .map((id) => id.trim())
        .filter(Boolean),
    )
  : null;

const symbolField = (
  id: string,
  name: string,
  required = false,
  extra: Partial<FieldSpec> = {},
): FieldSpec => ({
  id,
  name,
  type: "Symbol",
  required,
  localized: false,
  ...extra,
});

const textField = (
  id: string,
  name: string,
  required = false,
  extra: Partial<FieldSpec> = {},
): FieldSpec => ({
  id,
  name,
  type: "Text",
  required,
  localized: false,
  ...extra,
});

const richTextField = (
  id: string,
  name: string,
  required = false,
  extra: Partial<FieldSpec> = {},
): FieldSpec => ({
  id,
  name,
  type: "RichText",
  required,
  localized: false,
  ...extra,
});

const booleanField = (
  id: string,
  name: string,
  required = false,
  extra: Partial<FieldSpec> = {},
): FieldSpec => ({
  id,
  name,
  type: "Boolean",
  required,
  localized: false,
  ...extra,
});

const numberField = (
  id: string,
  name: string,
  required = false,
  extra: Partial<FieldSpec> = {},
): FieldSpec => ({
  id,
  name,
  type: "Number",
  required,
  localized: false,
  ...extra,
});

const integerField = (
  id: string,
  name: string,
  required = false,
  extra: Partial<FieldSpec> = {},
): FieldSpec => ({
  id,
  name,
  type: "Integer",
  required,
  localized: false,
  ...extra,
});

const dateField = (
  id: string,
  name: string,
  required = false,
  extra: Partial<FieldSpec> = {},
): FieldSpec => ({
  id,
  name,
  type: "Date",
  required,
  localized: false,
  ...extra,
});

const assetLinkField = (
  id: string,
  name: string,
  required = false,
  extra: Partial<FieldSpec> = {},
): FieldSpec => ({
  id,
  name,
  type: "Link",
  linkType: "Asset",
  required,
  localized: false,
  ...extra,
});

const symbolArrayField = (
  id: string,
  name: string,
  required = false,
  extra: Partial<FieldSpec> = {},
): FieldSpec => ({
  id,
  name,
  type: "Array",
  required,
  localized: false,
  items: {
    type: "Symbol",
    validations: [],
  },
  ...extra,
});

const entryArrayField = (
  id: string,
  name: string,
  linkedContentTypeId: string,
  required = false,
  extra: Partial<FieldSpec> = {},
): FieldSpec => ({
  id,
  name,
  type: "Array",
  required,
  localized: false,
  items: {
    type: "Link",
    linkType: "Entry",
    validations: [{ linkContentType: [linkedContentTypeId] }],
  },
  ...extra,
});

const assetArrayField = (
  id: string,
  name: string,
  required = false,
  extra: Partial<FieldSpec> = {},
): FieldSpec => ({
  id,
  name,
  type: "Array",
  required,
  localized: false,
  items: {
    type: "Link",
    linkType: "Asset",
    validations: [],
  },
  ...extra,
});

const CONTENT_TYPES: ContentTypeSpec[] = [
  {
    id: "siteSettings",
    name: "Site Settings",
    displayField: "internalName",
    description:
      "Global contact/social/eMenu values reused across pages and shared UI.",
    fields: [
      symbolField("internalName", "Internal Name", true),
      assetLinkField("logoLight", "Logo Light (for dark backgrounds)"),
      assetLinkField("logoDark", "Logo Dark (for light backgrounds)"),
      symbolField("instagramUrl", "Instagram URL"),
      symbolField("facebookUrl", "Facebook URL"),
      symbolField("tiktokUrl", "TikTok URL"),
      symbolField("whatsappNumber", "WhatsApp Number"),
      symbolField("primaryPhone", "Primary Phone"),
      symbolField("secondaryPhone", "Secondary Phone"),
      symbolField("primaryEmail", "Primary Email"),
      symbolField("secondaryEmail", "Secondary Email"),
      textField("addresses", "Addresses (One Per Line)"),
      symbolField("footerLocationSummary", "Footer Location Summary"),
      symbolField("eMenuMediaCityUrl", "eMenu URL - Media City"),
      symbolField("eMenuBusinessBayUrl", "eMenu URL - Business Bay"),
      symbolField("orderNowPrimaryLabel", "Order CTA Primary Label"),
      symbolField("orderNowPrimaryHref", "Order CTA Primary Link"),
      symbolField("orderNowSecondaryLabel", "Order CTA Secondary Label"),
      symbolField("orderNowSecondaryHref", "Order CTA Secondary Link"),
    ],
  },
  {
    id: "location",
    name: "Location",
    displayField: "name",
    description:
      "Location cards and /locations page details including phone, hours, maps, and eMenu link.",
    fields: [
      symbolField("slug", "Slug", true, {
        validations: [{ unique: true }],
      }),
      symbolField("locationId", "Location ID"),
      symbolField("name", "Name", true),
      textField("address", "Address", true),
      symbolField("phone", "Phone", true),
      textField("hours", "Hours", true),
      symbolField("menuUrl", "eMenu URL"),
      symbolField("directionsUrl", "Directions URL"),
      symbolField("mapEmbedUrl", "Map Embed URL (iframe src)"),
      textField("directionsUrlLong", "Directions URL (Long)"),
      textField("mapEmbedUrlLong", "Map Embed URL (Long iframe src)"),
      numberField("rating", "Rating"),
      symbolField("ratingCount", "Rating Count"),
      integerField("displayOrder", "Display Order"),
      booleanField("isActive", "Is Active"),
      assetArrayField("gallery", "Gallery Images"),
    ],
  },
  {
    id: "homePage",
    name: "Home Page",
    displayField: "internalName",
    description:
      "Homepage hero, teaser, form, and section copy blocks.",
    fields: [
      symbolField("internalName", "Internal Name", true),
      symbolField("heroEyebrow", "Hero Eyebrow"),
      symbolField("heroTitle", "Hero Title", true),
      symbolField("heroTitleHighlight", "Hero Title Highlight"),
      textField("heroSubtitle", "Hero Subtitle"),
      symbolField("heroPrimaryLabel", "Hero Primary Button Label"),
      symbolField("heroPrimaryHref", "Hero Primary Button Link"),
      symbolField("heroSecondaryLabel", "Hero Secondary Button Label"),
      symbolField("heroSecondaryHref", "Hero Secondary Button Link"),
      assetLinkField("heroImage", "Hero Image"),
      assetLinkField("heroVideo", "Hero Video"),
      symbolField("heroVideoUrl", "Hero Video URL"),
      symbolField("locationsSectionTitle", "Locations Section Title"),
      entryArrayField("locations", "Locations", "location"),
      symbolField("cateringTeaserEyebrow", "Catering Teaser Eyebrow"),
      symbolField("cateringTeaserTitle", "Catering Teaser Title"),
      textField("cateringTeaserDescription", "Catering Teaser Description"),
      symbolArrayField("cateringTeaserEventTypes", "Catering Event Type List"),
      assetLinkField("cateringTeaserImage", "Catering Teaser Image"),
      symbolField("eventFormTitle", "Event Form Title"),
      textField("eventFormSubtitle", "Event Form Subtitle"),
      assetLinkField("eventFormImage", "Event Form Image"),
      symbolField("socialSectionHandle", "Social Section Handle"),
    ],
  },
  {
    id: "cateringPolaroidItem",
    name: "Catering Polaroid Item",
    displayField: "internalName",
    description: "Cards shown in catering setup/polaroid section.",
    fields: [
      symbolField("internalName", "Internal Name", true),
      symbolField("title", "Title", true),
      symbolField("tag", "Tag"),
      textField("description", "Description"),
      assetLinkField("image", "Image"),
      booleanField("isBestseller", "Is Bestseller"),
      integerField("sortOrder", "Sort Order"),
    ],
  },
  {
    id: "cateringFeatureItem",
    name: "Catering Feature Item",
    displayField: "internalName",
    description: "Feature row item (icon + copy).",
    fields: [
      symbolField("internalName", "Internal Name", true),
      symbolField("iconName", "Lucide Icon Name", true, {
        validations: [
          {
            regexp: {
              pattern: "^[A-Za-z][A-Za-z0-9]+$",
            },
            message: "Use PascalCase icon names from lucide.dev.",
          },
        ],
      }),
      symbolField("title", "Title"),
      textField("copy", "Copy", true),
      integerField("sortOrder", "Sort Order"),
    ],
  },
  {
    id: "cateringMediaItem",
    name: "Catering Media Item",
    displayField: "internalName",
    description: "Image + copy cards used in includes and optional sections.",
    fields: [
      symbolField("internalName", "Internal Name", true),
      symbolField("name", "Name", true),
      textField("quote", "Copy", true),
      symbolField("designation", "Designation"),
      assetLinkField("image", "Image"),
      integerField("sortOrder", "Sort Order"),
    ],
  },
  {
    id: "cateringPage",
    name: "Catering Page",
    displayField: "internalName",
    description:
      "General catering page copy, hero, feature lists, includes, optional upgrades, and form text.",
    fields: [
      symbolField("internalName", "Internal Name", true),
      symbolField("title", "Title", true),
      textField("subtitle", "Subtitle"),
      assetLinkField("heroImage", "Hero Image"),
      symbolField("polaroidEyebrow", "Polaroid Section Eyebrow"),
      symbolField("polaroidTitle", "Polaroid Section Title"),
      entryArrayField(
        "polaroidItems",
        "Polaroid Items",
        "cateringPolaroidItem",
      ),
      symbolField("featuresEyebrow", "Features Section Eyebrow"),
      symbolField("featuresTitle", "Features Section Title"),
      entryArrayField(
        "featureItems",
        "Feature Items",
        "cateringFeatureItem",
      ),
      symbolField("includesEyebrow", "Includes Section Eyebrow"),
      symbolField("includesTitle", "Includes Section Title"),
      entryArrayField(
        "includesItems",
        "Includes Items",
        "cateringMediaItem",
      ),
      symbolField("optionalEyebrow", "Optional Section Eyebrow"),
      symbolField("optionalTitle", "Optional Section Title"),
      entryArrayField(
        "optionalItems",
        "Optional Items",
        "cateringMediaItem",
      ),
      symbolField("eventFormTitle", "Event Form Title"),
      textField("eventFormSubtitle", "Event Form Subtitle"),
      assetLinkField("eventFormImage", "Event Form Image"),
      symbolArrayField("eventTypeOptions", "Event Type Options"),
      symbolArrayField("availableSpaceOptions", "Available Space Options"),
      symbolArrayField("setupPreferenceOptions", "Setup Preference Options"),
    ],
  },
  {
    id: "aboutPage",
    name: "About Page",
    displayField: "internalName",
    description:
      "About hero, body copy, supporting image, and CTA copy.",
    fields: [
      symbolField("internalName", "Internal Name", true),
      symbolField("heroTitle", "Hero Title"),
      symbolField("heroHighlight", "Hero Highlight"),
      assetLinkField("heroImage", "Hero Image"),
      symbolField("storyHeading", "Story Heading"),
      richTextField("storyBody", "Story Body", true),
      symbolField("storySignatureLabel", "Story Signature Label"),
      symbolField("storySignatureName", "Story Signature Name"),
      assetLinkField("storyImage", "Story Image"),
      symbolField("ctaTitle", "CTA Title"),
      symbolField("ctaHighlight", "CTA Highlight"),
      symbolField("ctaPrimaryLabel", "CTA Primary Label"),
      symbolField("ctaPrimaryHref", "CTA Primary Link"),
      symbolField("ctaSecondaryLabel", "CTA Secondary Label"),
      symbolField("ctaSecondaryHref", "CTA Secondary Link"),
    ],
  },
  {
    id: "contactPage",
    name: "Contact Page",
    displayField: "internalName",
    description:
      "Contact hero and section copy; contact details should be sourced from site settings and locations.",
    fields: [
      symbolField("internalName", "Internal Name", true),
      symbolField("heroTitle", "Hero Title"),
      symbolField("heroHighlight", "Hero Highlight"),
      textField("heroSubtitle", "Hero Subtitle"),
      symbolField("infoTitle", "Info Section Title"),
      symbolField("socialTitle", "Social Section Title"),
      symbolField("formTitle", "Form Title"),
      textField("formSubtitle", "Form Subtitle"),
      symbolField("formSubmitLabel", "Form Submit Label"),
      entryArrayField("locations", "Locations", "location"),
    ],
  },
  {
    id: "legalPage",
    name: "Legal Page",
    displayField: "internalName",
    description:
      "Privacy policy and terms-of-service content entries.",
    fields: [
      symbolField("internalName", "Internal Name", true),
      symbolField("slug", "Slug", true, {
        validations: [{ unique: true }],
      }),
      symbolField("title", "Title", true),
      symbolField("seoTitle", "SEO Title"),
      textField("seoDescription", "SEO Description"),
      dateField("lastUpdated", "Last Updated"),
      richTextField("body", "Body", true),
      symbolField("contactEmail", "Contact Email"),
    ],
  },
];

const getRequiredEnv = (key: string) => {
  const value = process.env[key]?.trim();
  if (!value) {
    throw new Error(`Missing required env var: ${key}`);
  }
  return value;
};

const getErrorStatus = (error: unknown) => {
  if (typeof error !== "object" || error === null) return undefined;
  const candidate = error as {
    status?: number | string;
    statusCode?: number | string;
    response?: { status?: number | string };
  };

  const values = [
    candidate.status,
    candidate.statusCode,
    candidate.response?.status,
  ];
  for (const value of values) {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return undefined;
};

const printHelp = () => {
  console.log(
    "Usage: pnpm contentful:sync-cms-model [--dry-run] [--only=typeA,typeB]",
  );
  console.log("");
  console.log(
    "--dry-run            Show planned content type creates/updates without writing.",
  );
  console.log(
    "--only=...           Comma-separated content type ids to sync (optional).",
  );
  console.log("");
  console.log(
    "Existing content types (e.g. menuItem, locationReview) are left untouched.",
  );
};

const clone = <T>(value: T): T => {
  if (value === undefined) {
    return value;
  }
  return JSON.parse(JSON.stringify(value)) as T;
};

const areEqual = (left: unknown, right: unknown) =>
  JSON.stringify(left ?? null) === JSON.stringify(right ?? null);

const getContentTypeOrNull = async (environment: any, contentTypeId: string) => {
  try {
    return await environment.getContentType(contentTypeId);
  } catch (error) {
    const statusCode = getErrorStatus(error);
    const serialized = typeof error === "string" ? error : JSON.stringify(error);
    const isNotFound =
      statusCode === 404 ||
      serialized.includes('"status":404') ||
      serialized.includes("resource could not be found");

    if (isNotFound) return null;
    throw error;
  }
};

const syncContentType = async (
  environment: any,
  spec: ContentTypeSpec,
): Promise<"created" | "updated" | "unchanged"> => {
  const existing = await getContentTypeOrNull(environment, spec.id);

  if (!existing) {
    if (isDryRun) {
      console.log(`[dry-run] create content type ${spec.id}`);
      return "created";
    }

    const created = await environment.createContentTypeWithId(spec.id, {
      name: spec.name,
      description: spec.description,
      displayField: spec.displayField,
      fields: spec.fields.map((field) => clone(field)),
    });

    await created.publish();
    console.log(`created content type ${spec.id}`);
    return "created";
  }

  let changed = false;

  if (existing.name !== spec.name) {
    existing.name = spec.name;
    changed = true;
  }

  if ((existing.description ?? "") !== (spec.description ?? "")) {
    existing.description = spec.description;
    changed = true;
  }

  if (existing.displayField !== spec.displayField) {
    existing.displayField = spec.displayField;
    changed = true;
  }

  const fieldById = new Map<string, any>(
    (existing.fields || []).map((field: any) => [field.id, field]),
  );

  for (const targetField of spec.fields) {
    const currentField = fieldById.get(targetField.id);

    if (!currentField) {
      const nextField = clone(targetField);
      existing.fields.push(nextField);
      fieldById.set(targetField.id, nextField);
      changed = true;
      continue;
    }

    const keys: Array<keyof FieldSpec> = [
      "name",
      "type",
      "required",
      "localized",
      "disabled",
      "omitted",
      "validations",
      "items",
      "linkType",
    ];

    for (const key of keys) {
      const nextValue = (targetField as any)[key];
      const currentValue = currentField[key];
      if (!areEqual(currentValue, nextValue)) {
        currentField[key] = clone(nextValue);
        changed = true;
      }
    }
  }

  // Keep content type definitions non-destructive while enforcing target order:
  // known spec fields first (in spec order), then any extra existing fields.
  const targetFieldIds = spec.fields.map((field) => field.id);
  const targetFieldSet = new Set(targetFieldIds);
  const orderedKnownFields = targetFieldIds
    .map((fieldId) => fieldById.get(fieldId))
    .filter((field): field is any => Boolean(field));
  const orderedExtraFields = (existing.fields || []).filter(
    (field: any) => !targetFieldSet.has(field.id),
  );
  const reorderedFields = [...orderedKnownFields, ...orderedExtraFields];

  const currentOrder = (existing.fields || []).map((field: any) => field.id);
  const nextOrder = reorderedFields.map((field: any) => field.id);
  if (!areEqual(currentOrder, nextOrder)) {
    existing.fields = reorderedFields;
    changed = true;
  }

  if (!changed) {
    console.log(`unchanged content type ${spec.id}`);
    return "unchanged";
  }

  if (isDryRun) {
    console.log(`[dry-run] update content type ${spec.id}`);
    return "updated";
  }

  const updated = await existing.update();
  await updated.publish();
  console.log(`updated content type ${spec.id}`);
  return "updated";
};

const main = async () => {
  if (args.has("--help") || args.has("-h")) {
    printHelp();
    return;
  }

  const filteredSpecs =
    onlyTypeIds === null
      ? CONTENT_TYPES
      : CONTENT_TYPES.filter((spec) => onlyTypeIds.has(spec.id));

  if (filteredSpecs.length === 0) {
    throw new Error(
      "No content types selected. Check --only values against script content type ids.",
    );
  }

  const spaceId = getRequiredEnv("CONTENTFUL_SPACE_ID");
  const cmaToken = getRequiredEnv("CONTENTFUL_CMA_TOKEN");
  const environmentId = process.env.CONTENTFUL_ENVIRONMENT?.trim() || "master";

  const client = contentfulManagement.createClient({ accessToken: cmaToken });
  const space = await client.getSpace(spaceId);
  const environment = await space.getEnvironment(environmentId);

  let created = 0;
  let updated = 0;
  let unchanged = 0;

  for (const spec of filteredSpecs) {
    const result = await syncContentType(environment, spec);
    if (result === "created") created += 1;
    if (result === "updated") updated += 1;
    if (result === "unchanged") unchanged += 1;
  }

  console.log("");
  console.log("CMS model sync complete");
  console.log(`Dry run: ${isDryRun ? "yes" : "no"}`);
  console.log(`Created: ${created}`);
  console.log(`Updated: ${updated}`);
  console.log(`Unchanged: ${unchanged}`);
  console.log(`Processed: ${filteredSpecs.length}`);
};

main().catch((error) => {
  console.error("contentful-sync-cms-model failed");
  console.error(error instanceof Error ? error.message : error);

  const statusCode = getErrorStatus(error);
  const serializedError =
    typeof error === "string" ? error : JSON.stringify(error ?? {});

  if (statusCode === 401 || serializedError.includes("access token you sent")) {
    console.error(
      "Hint: CONTENTFUL_CMA_TOKEN must be a valid Content Management API token with access to this space.",
    );
  }

  process.exitCode = 1;
});
