import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { Toaster } from "sonner";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { clientLogger, serverLogger } from "middleware";
import { createClient } from "./client/pocketbase";
import { get_token, get_user } from "./helpers/helpers";
import { useLoaderData } from "react-router";
import type { UserData } from "./routes/user+";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

let client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export let loader = async ({ request }: Route.LoaderArgs) => {
  let url = new URL(request.url);
  url.pathname = "/api/user";
  let db = createClient();
  let cookies = request.headers.get("cookie") ?? null;
  let token = get_token(cookies ?? "") ?? null;
  let { user, profile } = await get_user(db, token!);
  return Response.json({ user, profile });
};
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme={"dark"}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <QueryClientProvider client={client}>
          <Toaster richColors theme="dark" position="top-right" />
          {children}
          <ScrollRestoration />
          <Scripts />
        </QueryClientProvider>
      </body>
    </html>
  );
}

export default function App() {
  let user_data = useLoaderData();

  let query = useQuery<UserData>({
    queryKey: ["user_info"],
    queryFn: async () => {
      let resp = await fetch("api/user", {
        credentials: "include",
      });
      if (!resp.ok) throw new Error(resp.statusText);
      return await resp.json();
    },
    initialData: user_data,
  });
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}

export const unstable_middleware = [serverLogger];
export const unstable_clientMiddleWare = [clientLogger];
