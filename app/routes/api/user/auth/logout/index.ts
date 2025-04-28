import type { Route } from ".react-router/types/app/routes/user+/register/+types";
import { cookie } from "~/helpers/helpers";
import { redirect } from "react-router";

export let action = async ({ request }: Route.ActionArgs) => {
  let cookies = request.headers.get("cookie");
  let new_pb = cookie.serialize("pb_auth", "rand", {
    maxAge: -1,
  });
  let header = new Headers();
  header.append("set-cookie", new_pb);
  return redirect("/", {
    headers: header,
  });
};
