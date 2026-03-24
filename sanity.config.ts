"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./studio/schemaTypes";

const projectId = process.env.SANITY_PROJECT_ID || "qcsslhtr";
const dataset = process.env.SANITY_DATASET || "production";

export default defineConfig({
  name: "default",
  title: "Rossovivo CMS",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
