import { defineCliConfig } from "sanity/cli";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

const projectId = process.env.SANITY_PROJECT_ID || "qcsslhtr";
const dataset = process.env.SANITY_DATASET || "production";

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  deployment: { appId: "vik55k3fmp4kfbvyoghfp1gv" },
});
