import React from "react";
import Link from "next/link";

const JoinButton = () => {
  return (
    <div className="flex flex-col w-full mt-8 items-center justify-center">
      <button className="bg-black text-white w-[500px] h-[49px] rounded-lg">
        <Link href={"/login"}>가입하기</Link>
      </button>
    </div>
  );
};

export default JoinButton;
