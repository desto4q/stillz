import { useQuery } from "@tanstack/react-query";
import React from "react";
import type { UserProfile } from "~/routes/user+";
import Card from "./Card";

export interface Post {
  collectionId: string;
  collectionName: string;
  created: string;
  id: string;
  subtitle: string;
  title: string;
  updated: string;
  user_id: string;
  video: string;
  duration: number;
  thumb: string;
  userName: string;
}

interface PostResponse {
  items: Post[];
  page: number;

  perPage: number;
  totalItems: number;
  totalPages: number;
}
export default function ProfileGrid(props: UserProfile) {
  let arr = Array(20).fill((e: any) => "sos");

  let query = useQuery<PostResponse>({
    queryKey: [props.user_id, "videos"],
    queryFn: async () => {
      let resp = await fetch("/api/user/videos");
      return await resp.json();
    },
  });
  if (query.isFetching) <>loading</>;
  if (query.isError || !query.data) <>error</>;
  return (
    <div className="">
      <div className="flex items-center">
        <h2 className="font-bold text-lg">{props.fullName} Videos</h2>
      </div>
      <div className="mt-6 grid grid-cols-4 gap-4">
        {query.data?.items.map((item) => {
          return <Card {...item} key={item.id} />;
        })}
      </div>
    </div>
  );
}
