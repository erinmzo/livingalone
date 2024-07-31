import { PropsWithChildren } from "react";

function Page({ children }: PropsWithChildren) {
  return <div className="container mx-auto max-w-[1024px] pt-[80px] pb-[200px] min-h-screen">{children}</div>;
}

export default Page;
