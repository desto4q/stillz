import cookie from "cookie";
import type Client from "pocketbase";
import { ClientResponseError } from "pocketbase";
import { redirect } from "react-router";
import { generateVideoThumbnail } from "generate-video-dumbnail";
let get_token = (cookies: string) => {
  let token = cookie.parse(cookies).pb_auth;
  return token;
};
let generate_thumb = async (url: string) => {
  try {
    let blob: Blob | undefined;
    let resp = await generateVideoThumbnail(url, 3, {
      quality: 0.5,
      onBlobCreated: (e) => {
        blob = e.blob;
      },
    });

    return blob;
  } catch (err) {
    throw new Error(err as any);
  }
};

let get_user = async (db: Client, token: string | undefined) => {
  db.authStore.loadFromCookie(token!);
  let user = db.authStore.record;
  try {
    let profile = await db
      .collection("profiles")
      .getFirstListItem(`user_id="${user?.id}"`);
    return { user, profile };
  } catch (err) {
    // if (err instanceof ClientResponseError) {
    //   throw redirect("/user/register");
    // }
    return Response.json(
      {
        message: err,
      },
      { status: 500 },
    );
  }
};
export { cookie, get_token, get_user, generate_thumb };
