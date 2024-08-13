import FrontBanner from "@/components/common/banner/FrontBanner";
import TopButton from "@/components/common/button/TopButton";
import MobileHeader from "@/components/common/header/MobileHeader";
import MobileNav from "@/components/common/header/MobileNav";
import Banner from "@/components/main/common/Banner";
import JoinMarketing from "@/components/main/common/JoinMarketing";
import GroupSection from "@/components/main/group/GroupSection";
import GroupVisual from "@/components/main/group/GroupVisual";
import MustSection from "@/components/main/must/MustSection";
import MustVisual from "@/components/main/must/MustVisual";
import IsOpenProvider from "@/providers/IsOpenProvider";

function HomePage() {
  return (
    <>
      <FrontBanner />
      <MobileHeader />
      <IsOpenProvider>
        <main className="md:pb-[300px]">
          <MustVisual />
          <MustSection />
          <GroupVisual />
          <GroupSection />
          <Banner />
          <JoinMarketing />
          <TopButton />
        </main>
      </IsOpenProvider>
      <MobileNav />
    </>
  );
}

export default HomePage;
