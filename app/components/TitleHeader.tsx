import React, { type PropsWithChildren } from "react";

export default function TitleHeader({ children }: PropsWithChildren) {
  return (
    <div className="py-2 flex items-center mt-4 gap-4 px-2 md:px-0">
      {children}
    </div>
  );
}
