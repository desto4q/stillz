import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useSearchParams } from "react-router";
import { useLoaderData } from "react-router";
import { createClient, currDb } from "~/client/pocketbase";
import Card from "~/components/Card";
import type { Route } from "../post+/+types/route";
import FlexGrid from "~/components/FlexGrid";
import TitleHeader from "~/components/TitleHeader";
import Pagination from "~/components/Pagination";
import FlexBody from "~/components/FlexBody";
import type { PostResponse } from "~/types/types";
export let loader = async ({ request, params }: Route.LoaderArgs) => {
  let db = createClient();
  let page = params.page ?? "1";
  let resp = await db.collection("posts").getList(parseInt(page), 20);
  return Response.json(resp);
};
export default function index() {
  let resp = useLoaderData();

  let [searchParams] = useSearchParams();
  let page = searchParams.get("page") ?? "1";

  let query = useQuery<PostResponse>({
    queryKey: ["home", "posts", page],
    queryFn: async () =>
      await currDb.collection("posts").getList(parseInt(page), 20),
    initialData: resp,
  });
  if (query.isFetching) return <>loading</>;
  if (query.isError || !query.data) return <>error</>;
  return (
    <FlexBody>
      <div className="flex flex-1 flex-col">
        <div className="mx-auto container">
          <TitleHeader>
            <span className="font-bold text-xl">Filters:</span> <div></div>
          </TitleHeader>

          <div className="mt-2">
            <FlexGrid>
              {query.data.items.map((e: any) => (
                <Card {...e} key={e.id} />
              ))}
            </FlexGrid>
          </div>
        </div>
        <div className="mt-auto mx-auto p-2">
          <Pagination totalPages={query.data.totalPages ?? 1} />
        </div>
      </div>
    </FlexBody>
  );
}
