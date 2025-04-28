import type { PropsWithChildren } from "react";

interface FLEXBODYPROPS extends PropsWithChildren {
  className?: string;
}
function FlexBody({ children, className }: FLEXBODYPROPS) {
  return (
    <div className={`flex min-h-[calc(100dvh-80px)] + ${className ?? ""}`}>
      {children}
    </div>
  );
}

export default FlexBody;
