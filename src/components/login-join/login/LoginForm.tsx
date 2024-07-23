"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const loginData = { email, password };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(loginData),
    });

    if (response.status !== 200) {
      return alert("아이디와 비밀번호를 정확히 입력해 주세요");
    }

    const data = await response.json();
    alert("로그인에 성공하였습니다.");
  };

  return (
    <div className="flex flex-col w-full mt-5 items-center justify-center">
      <form onSubmit={handleLoginSubmit}>
        <label className="font-semibold mt-6 ">이메일</label>
        <br />
        <input
          type="email"
          placeholder="이메일 주소를 입력해주세요"
          className="w-[500px] h-[49px] rounded-md border-2 border-gray-300 mt-3"
          value={email}
          onChange={handleEmailChange}
        />
        <br />
        <label className="font-semibold mt-14">비밀번호</label>
        <br />
        <input
          type="password"
          placeholder="비밀번호를 입력해주세요"
          className="w-[500px] h-[49px] rounded-md border-2 border-gray-300 mt-3"
          value={password}
          onChange={handlePasswordChange}
        />
        <br />
        <button className="bg-black text-white w-[500px] h-[49px] rounded-lg mt-6">
          로그인
        </button>
        <Link
          href={"/join"}
          className="mt-4 w-[500px] h-[49px] rounded-lg border-2 border-black flex items-center justify-center"
        >
          회원가입
        </Link>
        <button className="mt-4 w-[500px] h-[49px] rounded-lg border-2 border-black flex items-center justify-center">
          <Image
            src={"/img/google-icon.png"}
            alt="구글 로그인 아이콘"
            width={20}
            height={20}
            className="mr-2"
          />
          구글 간편로그인
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
