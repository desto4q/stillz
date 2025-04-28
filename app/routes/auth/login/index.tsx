import type { Route } from "./+types";
import { redirect, useActionData } from "react-router";
import { useEffect } from "react";
import { toast } from "sonner";
import { ClientResponseError } from "pocketbase";
import { cookie } from "~/helpers/helpers";
import { createClient } from "~/client/pocketbase";

export let loader = async (req: Route.LoaderArgs) => {
  return "";
};
export let action = async (req: Route.ActionArgs) => {
  let form = await req.request.formData();
  let auth_data = {
    email: form.get("email") as string,
    password: form.get("password") as string,
  };
  let db = createClient();
  try {
    let resp = await db
      .collection("users")
      .authWithPassword(auth_data.email, auth_data.password);
    let token = db.authStore.exportToCookie();
    console.log("token", token);
    let authCookie = cookie.serialize("pb_auth", token, {
      path: "/",
    });
    let header = new Headers();
    header.append("set-cookie", authCookie);
    return redirect("/home", {
      headers: header,
    });
  } catch (err) {
    if (err instanceof ClientResponseError) {
      return {
        error: err.message,
      };
    }
    return {
      error: err,
    };
  }
};
function index() {
  let form_resp = useActionData();
  let logger = () => {
    if (form_resp) {
      if (form_resp.error) {
        return toast.error(form_resp.error);
      }
      toast.success(form_resp.message);
    }
  };
  useEffect(() => {
    logger();
  }, [form_resp]);
  return (
    <div className="min-h-dvh flex bg-base-200">
      <div className="grid place-items-center flex-1 ">
        <form
          method="post"
          className="p-8 bg-base-100 drop-shadow-lg rounded-md flex flex-col gap-4  w-full max-w-lg mx-4 md:mx-0"
        >
          <h2 className="text-xl font-bold mx-auto">STEELD</h2>
          <div className="">
            <label htmlFor="" className="label">
              Email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              className="input w-full mt-2"
            />
          </div>
          <div className="">
            <label htmlFor="" className="label">
              password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="input w-full mt-2"
            />
          </div>
          <button className="btn w-full btn-primary">Login</button>

          <div className="flex items-center gap-2 py-2">
            <span className="h-1 bg-primary/25 w-full"></span>
            <p>OR</p>
            <span className="h-1 bg-primary/25 w-full"></span>
          </div>

          <button
            className="btn btn-secondary w-full btn-soft"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default index;
