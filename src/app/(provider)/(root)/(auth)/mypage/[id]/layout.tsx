import Page from "@/components/common/Page/Page";
import SideBar from "@/components/mypage/sideBar/Sidebar";
import { PropsWithChildren } from "react";

function MyPageLayout({ children }: PropsWithChildren) {
  return (
    <Page>
      <h1 className="text-3xl text-center font-bold mb-20">마이페이지</h1>
      <div className="flex">
        <SideBar />
        {children}
      </div>
    </Page>
  );
}

export default MyPageLayout;
