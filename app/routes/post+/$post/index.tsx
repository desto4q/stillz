import React, { Suspense, useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import type { Route } from "../../user+/register/+types";
import { createClient, currDb } from "~/client/pocketbase";
import FlexBody from "~/components/FlexBody";
import { ArrowLeftIcon, PlayIcon } from "lucide-react";
import type { Post } from "~/components/ProfileGrid";
import { Player } from "react-tuby";
import "react-tuby/css/main.css";
import { ClientOnly } from "remix-utils/client-only";
import Client from "pocketbase";
import BackBtn from "~/components/BackBtn";

export let loader = async ({ request, params }: Route.LoaderArgs) => {
  let url = new URL(request.url);
  let id = params.post;
  let db = createClient();
  let post = await db.collection("posts").getOne(id!);
  return post;
};
export default function index() {
  let resp: Post = useLoaderData();
  useEffect(() => {
    console.table(resp);
  }, []);
  let [isWatching, setIsWatching] = useState(false);
  let vid_url = currDb.files.getURL(resp, resp.video);
  let img_url = currDb.files.getURL(resp, resp.thumb);

  return (
    <FlexBody>
      <div className="container mx-auto flex-1">
        <div className="py-2 flex items-center mt-4 gap-4 px-2">
          <BackBtn />
          <h2>{resp.title}</h2>
        </div>
        <div className="w-full aspect-video bg-base-200 rounded-xl relative isolate duration-150">
          <ClientOnly fallback={<></>}>
            {() => <Player src={vid_url} poster={img_url} />}
          </ClientOnly>
          {/* <Suspense fallback={<>...</>}> */}
          {/* <ClientOnly fallback={<div>...</div>}>
              {()=><Player src={vid_url} poster={img_url} />}
              <ClientOnly/> */}
          {/* </Suspense> */}
        </div>

        <div className="mt-4 p-4 bg-base-200 rounded-md flex flex-col gap-2">
          <h2 className="text-xl font-bold">{resp.title}</h2>
          <p>{resp.subtitle}</p>
          <div className="info">
            <div className=" flex gap-2 items-center">
              <span className="text-lg font-bold opacity-70">Artist:</span>
              <div className="py-2 flex gap-2 items-center">
                <div className="size-12 rounded-full bg-base-100"></div>
                <div>
                  <h2 className="font-bold text-lg">{resp.userName}</h2>
                  {/* <h2 className="font-bold text-lg">{resp.userName}</h2> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FlexBody>
  );
}
