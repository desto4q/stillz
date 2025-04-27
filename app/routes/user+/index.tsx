import React, { useEffect } from "react";
import type { Route } from "../home+/+types/route";
import { useLoaderData } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { get_token, get_user } from "~/helpers/helpers";
import { createClient } from "~/client/pocketbase";
import FlexBody from "~/components/FlexBody";
import { Outlet } from "react-router";
import ProfileGrid from "~/components/ProfileGrid";
export let loader = async ({ request }: Route.LoaderArgs) => {
  let url = new URL(request.url);
  url.pathname = "/api/user";
  let db = createClient();
  let cookies = request.headers.get("cookie") ?? null;
  let token = get_token(cookies ?? "") ?? null;
  let { user, profile } = await get_user(db, token!);
  return Response.json({ user, profile });
};
export interface UserProfile {
  collectionId: string;
  collectionName: string;
  created: string;
  fullName: string;
  id: string;
  profileImageUrl: string;
  updated: string;
  userName: string;
  user_id: string;
}

export interface User {
  collectionId: string;
  collectionName: string;
  created: string;
  email: string;
  emailVisibility: boolean;
  id: string;
  updated: string;
  verified: boolean;
}

export interface UserData {
  user: User;
  profile: UserProfile;
}
export default function index() {
  let user_data = useLoaderData();

  let query = useQuery<UserData>({
    queryKey: ["user_info"],
    queryFn: async () => {
      let resp = await fetch("api/user", {
        credentials: "include",
      });
      return await resp.json();
    },
    initialData: user_data,
  });
  useEffect(() => {
    console.log(query.data);
  }, [query.data]);
  if (query.isFetching) <>loading</>;
  if (query.error || !query.data) <>error</>;
  return (
    <FlexBody>
      <div className="flex-1 mx-auto w-full container px-2 md:px-0">
        <div className="relative">
          <div className="w-full bg-base-200 h-[252px] rounded-md rounded-bl-[72px] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/50"></div>
          </div>

          <div className="absolute left-0 bottom-0  flex items-center gap-2">
            <div className=" size-28 rounded-full bg-base-300"></div>
            <div className="">
              <h2 className="text-2xl font-bold">
                {query.data.profile.fullName}
              </h2>
              <p className="text-md opacity-70">
                @{query.data.profile.userName}
              </p>
            </div>
          </div>
        </div>

        <div className="items mt-4 px-2">
          <ProfileGrid {...query.data.profile} />
        </div>
      </div>
    </FlexBody>
  );
}
