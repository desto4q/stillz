import React from "react";
import { currDb } from "~/client/pocketbase";
import type { UserData, UserProfile } from "~/types/types";

export default function ProfileImage(props: UserProfile) {
  let resp = currDb.files.getURL(props, props.profileImg);

  return <img className="size-full object-cover" src={resp}></img>;
}
