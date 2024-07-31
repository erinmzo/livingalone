import { PropsWithChildren } from "react";

function Page({ children }: PropsWithChildren) {
  return (
    <div className="container mx-auto w-full max-w-[1024px] pt-[80px] pb-[200px] min-h-screen px-[16px] lg:px-0">
      {children}
    </div>
  );
}

export default Page;
