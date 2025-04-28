// import {
//   useQuery,
//   type DefaultOptions,
//   type QueryObserverOptions,
//   type QueryOptions,
// } from "@tanstack/react-query";

import { ClientResponseError } from "pocketbase";
import { currDb } from "~/client/pocketbase";



export let validateUserName = async (username: string) => {
  try {
    let resp = await currDb
      .collection("profiles")
      .getFirstListItem(`userName="${username}"`);
    return resp && true;
  } catch (err) {
    if (err instanceof ClientResponseError && err.status == 404) return false;
    throw new Error(err as any);
  }
};
