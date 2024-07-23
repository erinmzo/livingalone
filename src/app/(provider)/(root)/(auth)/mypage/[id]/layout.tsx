import Page from "@/components/common/Page/Page";
import SideBar from "@/components/mypage/sideBar/Sidebar";
import { PropsWithChildren } from "react";

function MyPageLayout({ children }: PropsWithChildren) {
  return (
    <Page>
      <h1 className="text-[32px] text-center font-bold">마이페이지</h1>
      <div className="flex py-[100px] px-[50px]">
        <SideBar />
        {children}
      </div>
    </Page>
  );
}

export default MyPageLayout;
