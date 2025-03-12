import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";


export default defineConfig({
  base: "/gha-search-pagination/",
  plugins: [
    remix({
      // https://remix.run/docs/en/main/guides/spa-mode
      ssr: false,
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true,
      },
    }),
    // Custom plugin resolves warning - Failed to resolve "remix:manifest" from /Users/... An id should be written. Did you pass a URL?
    {
      name: "remix-manifest-resolver",
      resolveId(id) {
        if (id === "remix:manifest") {
          return id;
        }
      },
      // Optional: warning is suppressed without this hook
      // Provides an empty object for 'remix:manifest' if HMR triggers, but HMR remains non-functional
      load(id) {
        if (id === "remix:manifest") {
          return "export default {}";
        }
      }
    },
    tsconfigPaths(),
  ],
});