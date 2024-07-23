"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Notify, Report } from "notiflix";
import React, { useState } from "react";

const LoginForm = () => {
  const router = useRouter();
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

    Notify.success("로그인에 성공했습니다.");
    router.push("/");
  };

  return (
    <div className="">
      <form onSubmit={handleLoginSubmit}>
        <div>
          <label className="">이메일</label>
          <input
            type="email"
            placeholder="이메일 주소를 입력해주세요"
            className="rounded-md border border-gray-300"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div>
          <label className="">비밀번호</label>
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요"
            className="rounded-md border border-gray-300"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button className="bg-black text-white rounded-lg">로그인</button>
      </form>
      <div>
        <Link href="/join" className="">
          회원가입
        </Link>
        <button className="">
          <Image src="/img/icon-google.png" alt="구글 로그인 아이콘" width={20} height={20} className="mr-2" />
          구글 간편로그인
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
