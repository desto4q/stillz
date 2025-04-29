import Client, { isTokenExpired } from "pocketbase";
import { redirect } from "react-router";
import { cookie } from "~/helpers/helpers";
let safe_urls = ["/auth", "/home", "/search", "/api", "/post", "/test"];

export let withAuth = async (req: Request, res: Response, db: Client) => {
  let cookies = req.headers.get("cookie") ?? null;
  let url_bool = safe_urls.some((predicate) => req.url.includes(predicate));
  let api_bool = req.url.includes("/api");
  // console.log(!cookies,!url_bool);
  if (!cookies && !url_bool) {
    throw redirect("/auth/login");
  }
  if (!cookies) return;
  let parsed = cookie.parse(cookies!);
  let pb_auth = parsed.pb_auth;
  if (!pb_auth && !url_bool) {
    throw redirect("/auth/login");
  }
  if (isTokenExpired(pb_auth!) && !url_bool) {
    throw redirect("/auth/login");
  }
  if (!pb_auth) return null;
  db.authStore.loadFromCookie(pb_auth!);
  let user = db.authStore.record;

  return user;
};
