
import React, { Suspense } from "react";
import { cookie } from "~/helpers/helpers";

export let loader = () => {
  return "";
};

export default function index() {
  return (
    <div>
      <form action={'/auth/login'}>
        <button className="btn btn-sm">Login</button>
        <Suspense fallback={<></>}>
          <Bug />
        </Suspense>
      </form>
    </div>
  );
}

let Bug = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return <>divs</>;
};
