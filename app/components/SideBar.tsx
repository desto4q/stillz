import { useQueryClient } from "@tanstack/react-query";
import { useAtom } from "jotai";
import React, { useState, type SyntheticEvent } from "react";
import { Link } from "react-router";
import { currDb } from "~/client/pocketbase";
import { drawer_atom } from "~/client/ui";
import type { UserData } from "~/types/types";

let stopPropagation = (e: SyntheticEvent) => {
  e.stopPropagation();
};
export default function SideBar() {
  let [open, setOpen] = useAtom(drawer_atom);
  let client = useQueryClient();
  let data = client.getQueryData<UserData>(["user_info"]);
  let closeSideBar= ()=>{
    setTimeout((handler) => {
      setOpen(false);
    }, 200);
  }
  return (
    <div
      className={`fixed top-0 right-0 h-dvh w-full    z-50 flex ${
        open ? "bg-base-200/50 backdrop-blur-xs" : "pointer-events-none"
      }`}
      onClick={(e) => {
        console.log("backdrop");
        setOpen(false);
      }}
    >
      <div
        className={`w-xs p-2 bg-base-200 flex flex-col ${!open && "translate-x-[-100%]"} duration-150`}
        onClick={stopPropagation}
      >
        <h2 className="text-2xl font-bold p-4 border-b border-primary/25 mb-4">Stillz</h2>
        <nav
          className="flex flex-col gap-2 flex-1"
          onClick={() => {
            closeSideBar()
          }}
        >
          <Link
            className={"btn  btn-primary btn-ghost justify-start text-xl"}
            to="/user"
          >
            Profile
          </Link>
          <Link
            className={"btn  btn-primary btn-ghost justify-start text-xl"}
            to="/create"
          >
            Create
          </Link>
        </nav>
        <div className="">
          {data && (
            <Link to="/user" className="flex items-center btn justify-start btn-soft btn-primary" viewTransition onClick={closeSideBar}>
              <div className="size-10">
                <img
                  className="size-full object-cover rounded-full"
                  src={currDb.files.getURL(
                    data.profile,
                    data.profile.profileImg,
                  )}
                  alt=""
                />
              </div>
              <div className="ml-2 label text-xl">@{data.profile.userName}</div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
