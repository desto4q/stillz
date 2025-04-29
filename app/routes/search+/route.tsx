import React from "react";
import { Outlet } from "react-router";
import NavBar from "~/components/NavBar";

export default function route() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}
