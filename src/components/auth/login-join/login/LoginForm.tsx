"use client";

import { googleLogin, login } from "@/apis/auth";
import { useInputChange } from "@/hooks/useInput";
import { useAuthStore } from "@/zustand/authStore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Notify, Report } from "notiflix";
import React from "react";
import Input from "../../common/Input";

const LoginForm = () => {
  const router = useRouter();
  const saveUser = useAuthStore((state) => state.saveUser);

  const { values: input, handler: onChangeInput } = useInputChange({
    email: "",
    password: "",
  });

  const { email, password } = input;

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loginData = { email, password };
    const { data, error } = await login(loginData);

    if (error) {
      return Report.failure(
        "로그인에 실패했습니다.",
        "아이디와 비밀번호를 정확히 입력해 주세요.",
        "확인"
      );
    }

    saveUser(data.user);
    Notify.success("로그인에 성공했습니다.");
    router.push("/");
  };

  const handleGoogleLogin = async () => {
    const { error } = await googleLogin();
    if (error) return Report.failure("구글 로그인에 실패했습니다.", "", "확인");
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
            name="email"
            placeholder="이메일 주소를 입력해주세요"
            onChange={onChangeInput}
          />
        </div>
        <div className="flex flex-col mb-14">
          <Input
            label="비밀번호"
            type="password"
            value={password}
            name="password"
            placeholder="비밀번호를 입력해주세요"
            onChange={onChangeInput}
          />
        </div>
        <button className="py-3 text-xl bg-main-8 text-white rounded-3xl">
          로그인
        </button>
      </form>
      <div className="flex flex-col items-center gap-6 w-[500px]">
        <Link href="/join">
          <button className="w-[500px] py-[10px] text-xl border-2 border-[#000] rounded-3xl font-medium ">
            회원가입
          </button>
        </Link>
        <button
          className="flex items-center justify-center w-[500px] py-2 text-xl border-2 border-[#000] rounded-3xl font-medium"
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
