import { PropsWithChildren } from "react";

function Page({ children }: PropsWithChildren) {
  return (
    <div className="container mx-auto w-full lg:max-w-[1024px] lg:pt-[80px] lg:pb-[500px] min-h-screen px-[16px] lg:px-0">
      {children}
    </div>
  );
}

export default Page;
