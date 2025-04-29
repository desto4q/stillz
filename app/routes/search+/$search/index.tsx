import React from "react";
import { useLoaderData, useParams } from "react-router";
import type { Route } from "../../create/+types/route";
import FlexBody from "~/components/FlexBody";
import Pagination from "~/components/Pagination";
import { createClient } from "~/client/pocketbase";
import FlexGrid from "~/components/FlexGrid";
import type { PostResponse } from "~/types/types";
import Card from "~/components/Card";
export let loader = async ({ params }: Route.LoaderArgs) => {
  let { search } = params;

  let db = createClient();
  let resp = await db.collection("posts").getList(1, 20, {
    filter: `title ~ '${search}' || subtitle ~ '${search}'`,
  });
  return resp;
};

export default function index() {
  let data: PostResponse = useLoaderData();
  let { search } = useParams();
  return (
    <FlexBody className="">
      <div className="flex-1 flex flex-col mx-auto container mt-4">
        {/* {JSON.stringify(data)} */}
        <h2 className="text-xl py-2 font-bold">
          Search: <span className="label text-xl">{search}</span>
        </h2>
        <FlexGrid>
          {data.items.map((callbackfn) => (
            <Card {...callbackfn} key={callbackfn.id} />
          ))}
        </FlexGrid>
        <div className="mt-auto mx-auto">
          <Pagination totalPages={data.totalPages} />
        </div>
      </div>
    </FlexBody>
  );
}
