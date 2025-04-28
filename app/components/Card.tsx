import React, { Suspense } from "react";
import { currDb } from "~/client/pocketbase";
import {
  format,
  formatDistanceToNow,
  formatDistanceToNowStrict,
} from "date-fns";
import type { Post } from "./ProfileGrid";
import humanizeDuratiom from "humanize-duration";
import parse from "parse-duration";
import {
  HumanizeDuration,
  HumanizeDurationLanguage,
} from "humanize-duration-ts";
import { Link } from "react-router";

let durr = new HumanizeDuration(new HumanizeDurationLanguage());

export default function Card(props: Post) {
  let url = currDb.files.getURL(props, props.thumb);
  let dur = durr.humanize(props.duration, {
    round: true,
  });
  return (
    <Link
      to={`/post/${props.id}`}
      className="flex flex-col  gap-1  hover:grayscale-100 active:scale-[.99] duration-150 cursor-pointer"
    >
      <div className="aspect-video w-full bg-primary/25 flex relative rounded-md ">
        {/* <div className="badge absolute badge-primary badge-xs">{dur}</div> */}
        <img
          src={url}
          alt=""
          className="w-full aspect-video object-cover rounded-md"
        />
      </div>
      <div>
        <h2 className="text-sm font-bold">{props.title}</h2>
        <p className="flex items-center justify-between text-xs opacity-50">
          @{props.userName} <span className="font-bold">{dur}</span>
        </p>
      </div>
    </Link>
  );
}
