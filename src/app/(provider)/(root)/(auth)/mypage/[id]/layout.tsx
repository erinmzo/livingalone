import Page from "@/components/common/Page/Page";
import SideBar from "@/components/mypage/sideBar/Sidebar";
import { PropsWithChildren } from "react";

function MyPageLayout({ children }: PropsWithChildren) {
  return (
    <Page>
      <div className="flex">
        <SideBar />
        {children}
      </div>
    </Page>
  );
}

export default MyPageLayout;
