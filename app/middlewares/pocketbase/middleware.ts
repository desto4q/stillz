import { createClient } from "~/client/pocketbase";
import type { Route } from "../../routes/home+/+types/route";
import { redirect } from "react-router";
import { withAuth } from "./auth";
import type { AppLoadContext } from "react-router";
import { withAuthAPi } from "./server_auth";

export const updateSession = async (
  {
    request,
    context,
  }: { request: Request; params: any; context: AppLoadContext },
  res: Response,
) => {
  let db = createClient();
  let resp = await withAuth(request, res, db);
  await withAuthAPi(request, res, db);
  return res;
};
