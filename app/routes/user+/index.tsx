import React, { useEffect, useRef } from "react";
import type { Route } from "../home+/+types/route";
import { useLoaderData } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { get_token, get_user } from "~/helpers/helpers";
import { createClient } from "~/client/pocketbase";
import FlexBody from "~/components/FlexBody";
import { Outlet } from "react-router";
import ProfileGrid from "~/components/ProfileGrid";
import type { UserData } from "~/types/types";
import ProfileImage from "~/components/ProfileImg";
export let loader = async ({ request }: Route.LoaderArgs) => {
  let url = new URL(request.url);
  url.pathname = "/api/user";
  let db = createClient();
  let cookies = request.headers.get("cookie") ?? null;
  let token = get_token(cookies ?? "") ?? null;
  let { user, profile } = await get_user(db, token!);
  return Response.json({ user, profile });
};

export default function index() {
  let user_data = useLoaderData();
  let dialogRef = useRef<HTMLDialogElement>(null);
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
  if (!query.data) return <>error</>;

  return (
    <FlexBody>
      <div className="flex-1 mx-auto w-full container px-2 md:px-0">
        <dialog
          ref={dialogRef}
          className="modal"
          onClick={(e) => {
            dialogRef.current?.close();
          }}
        >
          <div
            className="max-h-[calc(100dvh_*_4/5)] w-[calc(100vw_*_3/5)] bg-base-100 p-4 rounded-md flex flex-col"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <h3 className="font-bold text-lg"></h3>
            <div className="flex-1">
              <ProfileImage {...query.data.profile} />
            </div>
            <div className="flex items-center justify-between mt-2">
              <p className="py-4">
                Press ESC key or click the button below to close
              </p>
              <form method="dialog">
                <button className="btn btn-error btn-flair">Close</button>
              </form>
            </div>
          </div>
        </dialog>
        <div className="relative">
          <div className="w-full bg-base-200 h-[252px] rounded-md rounded-bl-[72px] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/50"></div>
          </div>
          <div className="absolute left-0 bottom-0  flex items-center gap-2">
            <button
              className=" !size-28 rounded-full bg-base-300 overflow-hidden   btn btn-circle btn-ghost border-2  hover:border-primary"
              onClick={() => {
                if (!dialogRef.current) return;
                let dialog = dialogRef.current;

                dialog.showModal();
              }}
            >
              <ProfileImage {...query.data.profile} />
            </button>
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
