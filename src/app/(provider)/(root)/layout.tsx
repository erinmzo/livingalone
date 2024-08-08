import Footer from "@/components/common/footer/Footer";
import Header from "@/components/common/header/Header";
import GetUserProvider from "@/providers/GetUserProvider";
import { PropsWithChildren } from "react";

async function MainLayout({ children }: PropsWithChildren) {
  return (
    <div className="font-pretendard">
      <GetUserProvider>
        <div className="hidden md:block">
          <Header />
        </div>
        <div className="relative">
          <div className="pb-[5%]">{children}</div>
          <Footer />
        </div>
      </GetUserProvider>
    </div>
  );
}

export default MainLayout;
