import { useAtom } from "jotai";
import React, { useState, type SyntheticEvent } from "react";
import { drawer_atom } from "~/client/ui";

let stopPropagation = (e: SyntheticEvent) => {
  e.stopPropagation();
};
export default function SideBar() {
  let [open, setOpen] = useAtom(drawer_atom);
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
        className={`w-xs p-2 bg-base-200 ${!open && "translate-x-[-100%]"} duration-150`}
        onClick={stopPropagation}
      >
        <h2 className="text-xl font-bold">Stillz</h2>
        <nav className="flex flex-col gap-2">
          <h2>link</h2>
        </nav>
        <div className="text-xl"></div>
      </div>
    </div>
  );
}
