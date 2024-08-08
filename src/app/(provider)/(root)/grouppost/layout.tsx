import MobileHeader from "@/components/common/header/MobileHeader";
import MobileNav from "@/components/common/header/MobileNav";
import IsOpenProvider from "@/providers/IsOpenProvider";
import { PropsWithChildren } from "react";

function GroupPostLayout({ children }: PropsWithChildren) {
  return (
    <>
      <MobileHeader title="같이 사 공구템" />
      <IsOpenProvider>
        <main>{children}</main>
      </IsOpenProvider>
      <MobileNav />
    </>
  );
}

export default GroupPostLayout;
