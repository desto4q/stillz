import { createClient } from "~/client/pocketbase";

export let loader = async () => {
  let db = createClient();
  let resp = await db
    .collection("users")
    .authWithPassword("desto4.q@gmail.com", "destie45");
  return Response.json({ hello: "world", resp });
};
