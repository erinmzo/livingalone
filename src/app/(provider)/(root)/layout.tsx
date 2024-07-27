import Footer from "@/components/common/footer/Footer";
import Header from "@/components/common/header/Header";
import { PropsWithChildren } from "react";

async function MainLayout({ children }: PropsWithChildren) {
  return (
    <div className="font-pretendard">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default MainLayout;
