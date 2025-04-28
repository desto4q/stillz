import React, { type PropsWithChildren } from "react";
import FlexBody from "./FlexBody";

export default function FlexCenter({ children }: PropsWithChildren) {
  return (
    <FlexBody>
      <div className="flex-1 grid place-items-center">{children}</div>
    </FlexBody>
  );
}
