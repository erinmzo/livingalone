import Footer from "@/components/common/footer/Footer";
import Header from "@/components/common/header/Header";
import IsOpenProvider from "@/providers/IsOpenProvider";
import { PropsWithChildren } from "react";

async function MainLayout({ children }: PropsWithChildren) {
  return (
    <div className="font-pretendard">
      <Header />
      <div className="relative">
        <IsOpenProvider>
          <main className="pb-[5%]">{children}</main>
        </IsOpenProvider>
        <Footer />
      </div>
    </div>
  );
}

export default MainLayout;
