import Image from "next/image";
import React from "react";

function ReadComment() {
  return (
    <div>
      {/* <Image/> */}
      <div>
        <div>
          <span>닉네임</span>
          <span>생성일자</span>
        </div>
        <div>
          <span>작성내용</span>
        </div>
      </div>
    </div>
  );
}

export default ReadComment;
