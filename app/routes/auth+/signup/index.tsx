import { Form, Link, useActionData, useNavigation } from "react-router";
import { useEffect, useState } from "react";
import type { Route } from "../../post+/$post/+types";
import FlexCenter from "~/components/FlexCenter";
import { toast } from "sonner";
import { validateUserName } from "~/hooks/querys";
import pkg from "react-debounce-input";
import { createClient } from "~/client/pocketbase";
import { ClientResponseError } from "pocketbase";
const { DebounceInput } = pkg;
export const action = async ({ request }: Route.ActionArgs) => {
  const form = await request.formData();
  const email = form.get("email") as string;
  const password = form.get("password") as string;
  const userName = form.get("username") as string;
  const fullName = form.get("fullname") as string;
  const image = form.get("profile_image") as File;
  let data = {
    email,
    password,
    image,
  };
  let db = createClient();
  let user_data = {
    password: password,
    passwordConfirm: password,
    email: email,
    emailVisiblility: true,
  };
  try {
    let resp = await db.collection("users").create(user_data);
    let profile_resp = await db.collection("profiles").create({
      userName,
      fullName,
      profileImg: image,
      user_id: resp.id,
    });
    return Response.json(
      {
        message: "check email and spam for verification link",
      },
      {
        status: 201,
      },
    );
  } catch (err) {
    if (err instanceof ClientResponseError) {
      return Response.json(
        {
          error: err.message,
          fullError: err,
        },
        {
          status: err.status,
          statusText: err.message! ?? "",
        },
      );
    }
    return Response.json(
      {
        error: "internal server error",
      },
      {
        status: 500,
      },
    );
  }
};
export default function index() {
  const actionData = useActionData();
  const navigation = useNavigation();
  // useEffect(() => {
  //   console.log(actionData);
  // }, []);
  let [url, setUrl] = useState<string | null>(null);
  let [free, setFree] = useState<boolean | null>(null);
  // let queryUsername = async () => {
  //   console.log(await validateUserName("dezz"));
  // };
  //
  let toast_response = () => {
    if (!actionData) return;
    if (actionData.error) {
      return toast.error(actionData.error);
    }
    return toast.success(actionData.message);
  };
  useEffect(() => {
    toast_response();
  }, [actionData]);
  return (
    <FlexCenter>
      <form
        encType="multipart/form-data"
        onSubmit={(e) => {
          e.preventDefault();
          if (free == null || free == true)
            return toast.error("username taken");
          let form = e.target as HTMLFormElement;
          form.submit();
        }}
        className="bg-base-200 p-8 rounded-md flex flex-col border w-full max-w-lg gap-3"
        action="/auth/signup"
        method="post"
      >
        <h2 className="text-xl font-bold mx-auto">STEELD</h2>
        <div className="flex flex-col gap-1">
          <label className="label">Username</label>
          <DebounceInput
            name="username"
            className="input w-full"
            debounceTimeout={300}
            placeholder="e.g steeld_200"
            onChange={async (e) => {
              let val = e.target.value;
              if (val.length < 3) {
                setFree(null);
                return;
              }
              let resp = await validateUserName(val);
              console.log(resp);
              setFree(resp);
            }}
          />
          {/* <input
            type="text"
            className="input w-full"
            name="username"
            placeholder="e.g steeld_200"
            onChange={(e) => {
              console.log(e.target.value);
            }}
          /> */}
          {free != null && (
            <label className="label text-primary">
              {!free ? "username free" : "username taken"}
            </label>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label className="label">Full Name</label>
          <input
            type="text"
            className="input w-full"
            name="fullname"
            placeholder="fullname"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="label">Email</label>
          <input
            type="email"
            className="input w-full"
            name="email"
            placeholder="email"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="label">Password</label>
          <input type="text" className="input w-full" name="password" />
        </div>
        <div>
          <input
            className="hidden"
            name="profile_image"
            id="profile_image"
            accept="image/*"
            type="file"
            onChange={(e) => {
              if (!e.target.files) return toast.error("file not valid");
              let files = e.target.files;

              let image = files[0];

              if (image.size > 5 * 1024 * 1024) {
                e.target.value = "";
                return toast.error("Image size should be less than 5MB");
              }

              let img_url = URL.createObjectURL(image);
              setUrl(img_url);
            }}
          />
          <label htmlFor="profile_image" className="gap-2 flex items-center">
            <div className="size-14 border">
              {url && <img src={url} className="size-full object-cover"></img>}
            </div>
            <div>
              <h2>Select ProfileImage</h2>
            </div>
          </label>
        </div>
        <button className="btn btn-primary btn-flair">Sign Up</button>
      </form>
    </FlexCenter>
  );
}
