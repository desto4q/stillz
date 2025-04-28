import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useSearchParams } from "react-router";
import { useLoaderData } from "react-router";
import { createClient, currDb } from "~/client/pocketbase";
import Card from "~/components/Card";
import type { Route } from "../post+/+types/route";
import FlexGrid from "~/components/FlexGrid";
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

  let query = useQuery({
    queryKey: ["home", "posts", page],
    queryFn: async () =>
      await currDb.collection("posts").getList(parseInt(page), 20),
    initialData: resp,
  });
  if (query.isFetching) return <>loading</>;
  if (query.isError || !query.data) return <>error</>;
  return (
    <div className="mx-auto container">
      <div className="flex gap-2 items-center mt-4 py-2">
        <span className="font-bold text-xl">Filters:</span> <div></div>
      </div>

      <div className="mt-4">
        <FlexGrid>
          {query.data.items.map((e: any) => (
            <Card {...e} key={e.id} />
          ))}
        </FlexGrid>
      </div>
    </div>
  );
}
