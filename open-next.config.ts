import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// Every page is prerendered at build time, so serve that HTML straight from static
// assets instead of re-rendering it in the Worker on each request. Re-rendering the
// homepage on every visit was pushing the Worker past its CPU limit (Error 1102).
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
  enableCacheInterception: true,
});
