import SideBar from "@/components/auth/mypage/sideBar/Sidebar";
import Page from "@/components/common/Page/Page";
import { PropsWithChildren } from "react";

function MyPageLayout({ children }: PropsWithChildren) {
  return (
    <Page>
      <h1 className="text-[32px] text-center font-bold">마이페이지</h1>
      <div className="flex py-[100px] px-[50px]">
        <SideBar />
        <div className="ml-[50px] w-auto grow">{children}</div>
      </div>
    </Page>
  );
}

export default MyPageLayout;
