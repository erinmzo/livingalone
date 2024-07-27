"use client";

import { useAuthStore } from "@/zustand/authStore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Notify, Report } from "notiflix";
import React, { useState } from "react";
import Input from "../../common/Input";
import { createClient } from "@/supabase/client";

const LoginForm = () => {
  const router = useRouter();
  const saveUser = useAuthStore((state) => state.saveUser);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const supabase = createClient();

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
      return Report.failure(
        "로그인에 실패했습니다.",
        "아이디와 비밀번호를 정확히 입력해 주세요.",
        "확인"
      );
    }

    const data = await response.json();
    saveUser(data.user);
    Notify.success("로그인에 성공했습니다.");
    router.push("/");
  };

  const handleGoogleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });
    if (data) alert("구글 로그인 중");
    if (error) console.log("error : ", error);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <form
        onSubmit={handleLoginSubmit}
        className="flex flex-col justify-center w-[500px] mb-6"
      >
        <div className="flex flex-col mb-6">
          <Input
            label="이메일"
            type="text"
            value={email}
            placeholder="이메일 주소를 입력해주세요"
            onChange={handleEmailChange}
          />
        </div>
        <div className="flex flex-col mb-14">
          <Input
            label="비밀번호"
            type="password"
            value={password}
            placeholder="비밀번호를 입력해주세요"
            onChange={handlePasswordChange}
          />
        </div>
        <button className="py-3 text-xl bg-black text-white rounded-lg">
          로그인
        </button>
      </form>
      <div className="flex flex-col items-center gap-6 w-[500px]">
        <Link href="/join">
          <button className="w-[500px] py-[10px] text-xl border-2 border-[#000] rounded-lg font-medium ">
            회원가입
          </button>
        </Link>
        <button
          className="flex items-center justify-center w-[500px] py-2 text-xl border-2 border-[#000] rounded-lg font-medium"
          onClick={handleGoogleLogin}
        >
          <Image
            src="/img/icon-google.png"
            alt="구글 로그인 아이콘"
            width={32}
            height={32}
            className="mr-2"
          />
          구글 간편로그인
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
