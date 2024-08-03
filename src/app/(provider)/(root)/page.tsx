"use client";

import TopButton from "@/components/common/button/TopButton";
import Banner from "@/components/main/common/Banner";
import JoinMarketing from "@/components/main/common/JoinMarketing";
import GroupSection from "@/components/main/group/GroupSection";
import GroupVisual from "@/components/main/group/GroupVisual";
import MustSection from "@/components/main/must/MustSection";
import MustVisual from "@/components/main/must/MustVisual";

function HomePage() {
  return (
    <>
      <div className="pb-[300px]">
        <MustVisual />
        <MustSection />
        <GroupVisual />
        <GroupSection />
        <Banner />
        <JoinMarketing />
        <TopButton />
      </div>
    </>
  );
}

export default HomePage;
