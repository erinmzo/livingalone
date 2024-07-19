import Page from "@/components/common/Page";
import MyPageNav from "@/components/mypage/MyPageNav";
import { PropsWithChildren } from "react";

function MyPageLayout({ children }: PropsWithChildren) {
  return (
    <Page>
      <MyPageNav />
      <div>{children}</div>
    </Page>
  );
}

export default MyPageLayout;
