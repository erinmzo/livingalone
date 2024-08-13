"use client";

import { googleLogin, kakaoLogin, login } from "@/apis/auth";
import { useInputChange } from "@/hooks/useInput";
import { useAuthStore } from "@/zustand/authStore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Notify, Report } from "notiflix";
import Input from "../../common/Input";
import { useState } from "react";

const LoginForm = () => {
  const router = useRouter();
  const saveUser = useAuthStore((state) => state.saveUser);

  const { values: input, handler: onChangeInput } = useInputChange({
    email: "",
    password: "",
  });

  // 1. useState로 에러처리하는 놈을 만들었다.
  const [error, setError] = useState({
    emailError: "",
    passwordError: "",
  });

  const { email, password } = input;

  // 정규표현식
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loginData = { email, password };

    // TODO:
    // 1. email 형식에 맞추지 않으면 에러 메세지 만들기
    // 2. 비밀번호는 숫자+영문 포함해서 6글자 이상으로 하기

    // email 유효성 검사

    if (!emailRegex.test(email)) {
      setError((prev) => ({
        ...prev,
        emailError: "이메일 형식으로 입력해주세요. ex) example@example.com",
      }));
      return;
    }

    // 비밀번호 유효성 검사

    if (!passwordRegex.test(password)) {
      setError((prev) => ({
        ...prev,
        passwordError:
          "비밀번호는 숫자와 영문자 조합으로 6글자 이상이어야 합니다.",
      }));
      return;
    }

    // 2. 유효성 검사에 실패하면 setError로 state를 변경한다.
    // if (password.length < 6) {
    //   return setError({
    //     emailError: "",
    //     passwordError: "비밀번호는 영문 숫자포함 6자리 이상이어야 합니다.",
    //   });
    // }

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

  const handleKakaoLogin = async () => {
    const { error } = await kakaoLogin();
    if (error)
      return Report.failure("카카오 로그인에 실패했습니다.", "", "확인");
  };

  return (
    <div className="flex flex-col justify-start items-center min-h-screen px-4 sm:px-6 mt-8 lg:px-8 sm:mb-8">
      <form
        onSubmit={handleLoginSubmit}
        className="flex flex-col justify-center w-full max-w-md space-y-7"
      >
        <div className="flex flex-col mb-5 sm:mb-3">
          <Input
            label="이메일"
            type="text"
            value={email}
            name="email"
            placeholder="이메일 주소를 입력해주세요"
            onChange={onChangeInput}
            error={error.emailError}
          />
        </div>
        <div className="flex flex-col mt-4 sm:mb-3">
          <Input
            label="비밀번호"
            type="password"
            value={password}
            name="password"
            placeholder="비밀번호를 입력해주세요"
            onChange={onChangeInput}
            // 3. Input 컴포넌트에 error를 넣는다.
            error={error.passwordError}
          />
        </div>
        <button className="py-2 text-xl bg-main-8 text-white rounded-3xl sm:mt-10 md:mt-8 md:text-lg sm:text-sm">
          로그인
        </button>
      </form>
      <div className="flex flex-col items-center gap-4 w-full max-w-md mt-6 sm:mt-16 sm:text-sm md:mt-5">
        <Link href="/join" className="w-full">
          <button className="flex items-center justify-center text-lg border border-gray-2 py-2 rounded-3xl font-medium w-full sm:py-2 sm:text-base md:text-md">
            회원가입
          </button>
        </Link>
        <button
          className="flex items-center justify-center sm:py-2 sm:text-base w-full py-2 text-lg border border-gray-2 rounded-3xl font-medium md:text-md"
          onClick={handleGoogleLogin}
        >
          <Image
            src="/img/icon-google.png"
            alt="구글 로그인 아이콘"
            width={24}
            height={24}
            className="mr-2"
          />
          구글 간편로그인
        </button>
        <button
          className="flex items-center justify-center w-full py-2 text-lg border border-gray-2 rounded-3xl font-medium sm:py-2 sm:text-base  md:text-md"
          onClick={handleKakaoLogin}
        >
          <Image
            src="/img/kakaotalk-icon.png"
            alt="카카오 로그인 아이콘"
            width={24}
            height={24}
            className="mr-2"
          />
          카카오 간편로그인
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
