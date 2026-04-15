"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaMarkup } from "@operationnation/sanity-plugin-schema-markup";
import { schemaTypes } from "./studio/schemaTypes";
import { structure } from "./studio/structure";

const projectId = process.env.SANITY_PROJECT_ID || "qcsslhtr";
const dataset = process.env.SANITY_DATASET || "production";

export default defineConfig({
  name: "default",
  title: "Rossovivo CMS",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [structureTool({ structure }), visionTool(), schemaMarkup()],
  schema: {
    types: schemaTypes,
  },
});
