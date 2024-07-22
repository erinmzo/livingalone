import Image from "next/image";
import React from "react";
import Title from "./readpost/Title";
import UserInfo from "./readpost/UserInfo";
import PostImage from "./readpost/PostImage";
import ItemInfo from "./readpost/ItemInfo";
import Contents from "./readpost/Contents";

function ReadPost() {
  return (
    <div>
      {/* 전체 wrap */}

      <div>
        {/* 상단부분 묶기 */}
        <Title />
        <UserInfo />
        <PostImage />
      </div>

      <div>
        {/* 포스팅부분 */}
        <ItemInfo />
        <div>{/* 라인 넣기 이것도 div로 해야하나? 구분선 뭘로 하더라 */}</div>
        <Contents />
      </div>
    </div>
  );
}

export default ReadPost;
