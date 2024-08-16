import MobileHeader from "@/components/common/header/MobileHeader";
import MobileNav from "@/components/common/header/MobileNav";
import IsOpenProvider from "@/providers/IsOpenProvider";
import { PropsWithChildren } from "react";

function MustPostLayout({ children }: PropsWithChildren) {
  return (
    <>
      <MobileHeader title="자랑해 자취템" />
      <IsOpenProvider>
        <main>{children}</main>
      </IsOpenProvider>
      <MobileNav />
    </>
  );
}

export default MustPostLayout;
