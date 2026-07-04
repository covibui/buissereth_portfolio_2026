import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";
import { isSiteConfig } from "./validators";
import type { SiteConfig } from "./types";

const SITE_CONFIG_PATH = path.join(process.cwd(), "content", "config", "site.yaml");

let cachedConfig: SiteConfig | undefined;

/** Reads and validates content/config/site.yaml. Result is memoized per build/dev process. */
export function getSiteConfig(): SiteConfig {
  if (cachedConfig) {
    return cachedConfig;
  }

  const raw = fs.readFileSync(SITE_CONFIG_PATH, "utf8");
  const data: unknown = yaml.load(raw);

  if (!isSiteConfig(data)) {
    throw new Error("Invalid site config in content/config/site.yaml");
  }

  cachedConfig = data;
  return data;
}
