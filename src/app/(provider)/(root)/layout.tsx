import Footer from "@/components/common/footer/Footer";
import Header from "@/components/common/header/Header";
import { createClient } from "@/supabase/server";
import { PropsWithChildren } from "react";

async function MainLayout({ children }: PropsWithChildren) {
  const supabase = createClient();
  const { data: userSessionInfo } = await supabase.auth.getUser();
  return (
    <div>
      <Header userSessionInfo={userSessionInfo} />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default MainLayout;
