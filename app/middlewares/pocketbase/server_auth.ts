import Client, { isTokenExpired } from "pocketbase";
import { redirect } from "react-router";
import { cookie } from "~/helpers/helpers";

export let withAuthAPi = async (req: Request, res: Response, db: Client) => {
  let error_Response = Response.json({
    message:"login"
  },{
    status: 401,
  });
  let cookies = req.headers.get("cookie") ?? null;
  let api_bool = req.url.includes("/api");
  if (!api_bool) return res;
  if (!cookies && api_bool) {
    throw error_Response;
  }

  if (!cookies) throw error_Response;
  let parsed = cookie.parse(cookies!);
  let pb_auth = parsed.pb_auth;
  if (!pb_auth && api_bool) {
    throw error_Response;
  }
  if (isTokenExpired(pb_auth!) && !api_bool) {
    throw error_Response;
  }
  if (!pb_auth) throw error_Response;
};
