import { useFetcher } from "react-router";
import { useLoaderData } from "react-router";
import type { Route } from "../../home+/+types/route";
import { get_token, get_user } from "~/helpers/helpers";
import { createClient } from "~/client/pocketbase";
export let loader = async ({ request }: Route.LoaderArgs) => {
  let db = createClient();
  let cookies = request.headers.get("cookie") ?? null;
  let token = get_token(cookies ?? "") ?? null;
  let { user, profile } = await get_user(db, token!);
  return Response.json({ user, profile });
};
