import React from "react";
import { Outlet } from "react-router";
import NavBar from "~/components/NavBar";

export default function index() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}
