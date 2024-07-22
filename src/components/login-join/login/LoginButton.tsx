import React from "react";
import Link from "next/link";
import Image from "next/image";

const LoginButton = () => {
  return (
    <div className="flex flex-col w-full mt-8 items-center justify-center">
      <button className="bg-black text-white w-[500px] h-[49px] rounded-lg">
        로그인
      </button>
      <button className="mt-4 w-[500px] h-[49px] rounded-lg border-2 border-black">
        <Link href={"/join"}>회원가입</Link>
      </button>
      <button className="mt-4 w-[500px] h-[49px] rounded-lg border-2 border-black">
        <Image
          src={"/img/google-icon.png"}
          alt="구글 로그인 아이콘"
          width={20}
          height={20}
          className="absolute"
        />
        구글 간편로그인
      </button>
    </div>
  );
};

export default LoginButton;
