"use client";

import JoinMarketing from "@/components/main/common/JoinMarketing";
import GroupSection from "@/components/main/group/GroupSection";
import GroupVisual from "@/components/main/group/GroupVisual";
import MustSection from "@/components/main/must/MustSection";
import MustVisual from "@/components/main/must/MustVisual";

function HomePage() {
  return (
    <>
      <MustVisual />
      <MustSection />
      <GroupVisual />
      <GroupSection />
      <JoinMarketing />
    </>
  );
}

export default HomePage;
