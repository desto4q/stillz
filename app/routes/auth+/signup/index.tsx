import { Form, Link, useActionData, useNavigation } from "react-router";
import { useEffect, useState } from "react";
import type { Route } from "../../post+/$post/+types";
import FlexCenter from "~/components/FlexCenter";
import { toast } from "sonner";

export const action = async ({ request }: Route.ActionArgs) => {
  const form = await request.formData();
  const email = form.get("email");
  const password = form.get("password");
  const firstName = form.get("username");
  const lastName = form.get("fullname");
  const image = form.get("profile_image");
  let data = {
    email,
    password,
    firstName,
    lastName,
    image,
  };
  console.log("ssos");
};
export default function index() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  useEffect(() => {
    console.log(actionData);
  }, []);
  const [showPassword, setShowPassword] = useState(false);
  let [url, setUrl] = useState<string | null>(null);
  return (
    <FlexCenter>
      <form
        className="bg-base-200 p-8 rounded-md flex flex-col border w-full max-w-lg gap-3"
        action="/auth/signup"
        method="post"
      >
        <h2 className="text-xl font-bold mx-auto">STEELD</h2>
        <div className="flex flex-col gap-1">
          <label className="label">Username</label>
          <input
            type="text"
            className="input w-full"
            name="username"
            placeholder="e.g steeld_200"
          />
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
            type="text"
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
