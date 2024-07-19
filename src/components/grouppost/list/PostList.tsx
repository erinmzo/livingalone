"use client";

import { useQuery } from "@tanstack/react-query";

function PostList() {
  return (
    <div>
      <h5>같이 사 공구템</h5>
      <p>공동구매를 통해 자취에 필요한 물품을 저렴한 💰금액에 구매해보세요</p>
      <div>
        <button>진행중</button>
        <button>종료됨</button>
      </div>
    </div>
  );
}

export default PostList;
