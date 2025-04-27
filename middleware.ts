import { redirect } from "react-router";
import type { Route } from "./app/+types/root";
import { ClientResponseError, isTokenExpired } from "pocketbase";

import { createClient } from "~/client/pocketbase";
import { updateSession } from "~/middlewares/pocketbase/middleware";
export let serverLogger: Route.unstable_MiddlewareFunction = async (
  ctx,
  next,
) => {
  let start = performance.now();
  let res = await next();
  let duration = performance.now() - start;
  return await updateSession({ ...ctx }, res);
};

export let clientLogger: Route.unstable_MiddlewareFunction = async (
  { request, params, context },
  next,
) => {
  let start = performance.now();
  let res = await next();
  let duration = performance.now() - start;
  console.log(`navigated to ${request.url} in ${duration.toFixed(2)}ms`);
  return res;
};
