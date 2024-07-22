import InnerLayout from "@/components/common/Page/InnerLayout";
import React from "react";
import ReadPost from "./ReadPost";
import ReadTopBtn from "./ReadTopBtn";
import TopList from "./TopList";

function Read() {
  return (
    <InnerLayout>
      <ReadPost />
      <ReadTopBtn />
      <TopList />
    </InnerLayout>
  );
}

export default Read;
