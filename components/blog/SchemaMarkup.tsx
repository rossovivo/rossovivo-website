import {
  NextSchemaScript,
  type Schema,
} from "@operationnation/sanity-plugin-schema-markup/nextSchemaScript";

type SchemaMarkupProps = {
  schema: Schema[];
};

const projectId = process.env.SANITY_PROJECT_ID || "qcsslhtr";
const dataset = process.env.SANITY_DATASET || "production";

export function SchemaMarkup({ schema }: SchemaMarkupProps) {
  return (
    <NextSchemaScript
      schema={schema}
      projectId={projectId}
      dataset={dataset}
    />
  );
}
