import { PropsWithChildren } from "react";

function InnerLayout({ children }: PropsWithChildren) {
  return <div className="w-[680px] mx-auto">{children}</div>;
}

export default InnerLayout;
