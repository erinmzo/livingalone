import Footer from "@/components/common/footer/Footer";
import Header from "@/components/common/header/Header";
import { PropsWithChildren } from "react";

async function MainLayout({ children }: PropsWithChildren) {
  return (
    <div className="font-pretendard">
      <Header />
      <div className="relative">
        <main className="pb-[5%]">{children}</main>
        <Footer />
      </div>
    </div>
  );
}

export default MainLayout;
