import PocketBase, { isTokenExpired } from "pocketbase";
import type { Route } from "../+types/root";
import { cookie } from "~/helpers/helpers";
import { createClient } from "~/client/pocketbase";

export let getSession = async (req: Route.LoaderArgs) => {
  let cookies = (await req.request.headers.get("cookie")) ?? null;
  if (!cookies) {
    throw Response.json(
      {
        error: "login",
      },
      {
        status: 401,
      },
    );
  }
  let pb_auth = cookie.parse(cookies).pb_auth;
  if (!pb_auth) {
    throw Response.json(
      {
        error: "login",
      },
      {
        status: 401,
      },
    );
  }

  if (isTokenExpired(pb_auth)) {
    throw Response.json(
      {
        error: "login",
      },
      {
        status: 401,
      },
    );
  }

  let db = createClient();
  db.authStore.loadFromCookie(pb_auth);
  let user = db.authStore.record;

  let user_data = await db
    .collection("profiles")
    .getFirstListItem(`user_id="${user?.id}"`);

  return { user_data, db };
};
