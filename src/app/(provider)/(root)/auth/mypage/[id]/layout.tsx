import MyPageNav from "@/components/mypage/MyPageNav";
import { PropsWithChildren } from "react";

function MyPageLayout({ children }: PropsWithChildren) {
  return (
    <>
      <MyPageNav />
      <div>{children}</div>
    </>
  );
}

export default MyPageLayout;
