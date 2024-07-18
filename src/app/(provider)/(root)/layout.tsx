import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import { PropsWithChildren } from "react";

function MainLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default MainLayout;
