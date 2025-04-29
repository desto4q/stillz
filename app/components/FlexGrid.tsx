import React, { type PropsWithChildren } from "react";
import FlexBody from "./FlexBody";

export default function FlexGrid({ children }: PropsWithChildren) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 px-3 md:px-0 ">
      {children}
    </div>
  );
}
