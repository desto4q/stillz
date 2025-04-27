import PocketBase from "pocketbase";
import { cookie } from "~/helpers/helpers";

let createClient = () => {
  let db = new PocketBase("http://127.0.0.1:8090");
  return db;
};

let currDb = new PocketBase("http://127.0.0.1:8090");

export { createClient, currDb };
