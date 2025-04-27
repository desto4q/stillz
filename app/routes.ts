// import { type RouteConfig, index } from "@react-router/dev/routes";

// export default [index("routes/home.tsx")] satisfies RouteConfig;

// app/routes.ts
import { remixRoutesOptionAdapter } from "@react-router/remix-routes-option-adapter";
import { flatRoutes } from "remix-flat-routes";
  // Matches Next.js-style route files: page.tsx, layout.tsx, etc.
const routeRegex =
  /(?:^|[/\\])((route|index|layout|loading|error|not-found|template|default)|_[^/\\]+|[^/\\]+\.route)\.(ts|tsx|js|jsx|md|mdx)$/;

export default remixRoutesOptionAdapter((defineRoutes) => {
  return flatRoutes("routes", defineRoutes, {
    ignoredRouteFiles: ["**/.*"], // Ignore dot files (like .DS_Store)
    //appDir: 'app',
    //routeDir: 'routes',
    //basePath: '/',
    //paramPrefixChar: '$',
    nestedDirectoryChar: "+",
    routeRegex: routeRegex,
    //routeRegex: /((\${nestedDirectoryChar}[\/\\][^\/\\:?*]+)|[\/\\]((index|route|layout|page)|(_[^\/\\:?*]+)|([^\/\\:?*]+\.route)))\.(ts|tsx|js|jsx|md|mdx)$$/,
  });
});

// export const unstable_clientMiddleware = [clientLogger];
