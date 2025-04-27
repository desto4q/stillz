import { ClientResponseError } from "pocketbase";
import React from "react";
import { Outlet } from "react-router";
import NavBar from "~/components/NavBar";
import { getSession } from "~/method/methods";
import type { Route } from "../api/user/+types";

export default function index() {
  return (
    <>
      <NavBar /> <Outlet />
    </>
  );
}
