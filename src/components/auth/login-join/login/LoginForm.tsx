"use client";

import { useAuthStore } from "@/zustand/authStore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Notify, Report } from "notiflix";
import React, { useState } from "react";

const LoginForm = () => {
  const router = useRouter();
  const saveUser = useAuthStore((state) => state.saveUser);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loginData = { email, password };
    const response = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(loginData),
    });

    if (response.status !== 200) {
      return Report.failure("로그인에 실패했습니다.", "아이디와 비밀번호를 정확히 입력해 주세요.", "확인");
    }
    const data = await response.json();
    saveUser(data.user);

    Notify.success("로그인에 성공했습니다.");
    router.push("/");
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <form onSubmit={handleLoginSubmit} className="flex flex-col justify-center w-[500px] mb-6">
        <div className="flex flex-col mb-6">
          <label className="ml-1 mb-[10px] font-bold">이메일</label>
          <input
            type="email"
            placeholder="이메일 주소를 입력해주세요"
            className="py-[9px] px-4 rounded-lg border border-[#808080] text-xl font-medium placeholder-[#999999]"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="flex flex-col mb-14">
          <label className="ml-1 mb-[10px] font-bold">비밀번호</label>
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요"
            className="py-[9px] px-4 rounded-lg border border-[#808080] text-xl font-medium placeholder-[#999999]"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button className="py-3 text-xl bg-black text-white rounded-lg">로그인</button>
      </form>
      <div className="flex flex-col items-center gap-6 w-[500px]">
        <Link href="/join">
          <button className="w-[500px] py-[10px] text-xl border-2 border-[#000] rounded-lg font-medium ">
            회원가입
          </button>
        </Link>
        <button className="flex items-center justify-center w-[500px] py-2 text-xl border-2 border-[#000] rounded-lg font-medium">
          <Image src="/img/icon-google.png" alt="구글 로그인 아이콘" width={32} height={32} className="mr-2" />
          구글 간편로그인
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
