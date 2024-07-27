import Footer from "@/components/common/footer/Footer";
import Header from "@/components/common/header/Header";
import { PropsWithChildren } from "react";

async function MainLayout({ children }: PropsWithChildren) {
  //  console.log("userSessionInfo", userSessionInfo);
  return (
    <div className="font-pretendard">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default MainLayout;
