import React from "react";
import { Outlet } from "react-router";
import NavBar from "~/components/NavBar";

export default function ComponentName() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}
