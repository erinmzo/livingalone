"use client";
import MobileSideBar from "@/components/auth/mypage/sideBar/MobileSideBar";
import SideBar from "@/components/auth/mypage/sideBar/Sidebar";
import Page from "@/components/common/Page/Page";
import MobileHeader from "@/components/common/header/MobileHeader";
import MobileNav from "@/components/common/header/MobileNav";
import IsOpenProvider from "@/providers/IsOpenProvider";

import { PropsWithChildren } from "react";

function MyPageLayout({ children }: PropsWithChildren) {
  return (
    <>
      <MobileHeader hamburger title="마이페이지" />
      <IsOpenProvider>
        <Page>
          <h1 className="text-[32px] text-center font-bold hidden md:block">마이페이지</h1>
          <div className="flex md:py-[100px] px-0 lg:px-[50px]">
            <SideBar />
            <MobileSideBar />
            <main className="ml-0 md:ml-[50px] w-auto grow">{children}</main>
          </div>
        </Page>
      </IsOpenProvider>
      <MobileNav />
    </>
  );
}
export default MyPageLayout;
