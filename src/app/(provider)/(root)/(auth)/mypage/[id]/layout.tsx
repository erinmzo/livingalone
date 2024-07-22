import Page from "@/components/common/Page/Page";
import MyPageNav from "@/components/mypage/MyPageNav";
import SideBar from "@/components/mypage/sideBar/Sidebar";
import { PropsWithChildren } from "react";

function MyPageLayout({ children }: PropsWithChildren) {
  return (
    <Page>
      <div className="flex">
        <SideBar />
        <div>{children}</div>
      </div>
    </Page>
  );
}

export default MyPageLayout;
