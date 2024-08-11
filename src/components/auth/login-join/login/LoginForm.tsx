"use client";

import { googleLogin, kakaoLogin, login } from "@/apis/auth";
import { useInputChange } from "@/hooks/useInput";
import { useAuthStore } from "@/zustand/authStore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Notify, Report } from "notiflix";
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

  const handleKakaoLogin = async () => {
    const { error } = await kakaoLogin();
    if (error)
      return Report.failure("카카오 로그인에 실패했습니다.", "", "확인");
  };

  return (
    <div className="flex flex-col justify-start items-center min-h-screen px-4 sm:px-6 mt-8 lg:px-8 sm:mb-8">
      <form
        onSubmit={handleLoginSubmit}
        className="flex flex-col justify-center w-full max-w-md space-y-4"
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
        <div className="flex flex-col mb-14 sm:mb-8">
          <Input
            label="비밀번호"
            type="password"
            value={password}
            name="password"
            placeholder="비밀번호를 입력해주세요"
            onChange={onChangeInput}
          />
        </div>
        <button className="py-3 text-xl bg-main-8 text-white rounded-3xl gap-6 sm:mt-10 md:mt-8">
          로그인
        </button>
      </form>
      <div className="flex flex-col items-center gap-6 w-full max-w-md mt-5">
        <Link href="/join" className="w-full">
          <button className="w-full py-3 text-xl border border-gray-2 rounded-3xl font-medium ">
            회원가입
          </button>
        </Link>
        <button
          className="flex items-center justify-center  w-full py-3 text-xl border border-gray-2 rounded-3xl font-medium md:text-md"
          onClick={handleGoogleLogin}
        >
          <Image
            src="/img/icon-google.png"
            alt="구글 로그인 아이콘"
            width={28}
            height={28}
            className="mr-2"
          />
          구글 간편로그인
        </button>
        <button
          className="flex items-center justify-center  w-full py-3 text-xl border border-gray-2 rounded-3xl font-medium"
          onClick={handleKakaoLogin}
        >
          <Image
            src="/img/kakaotalk-icon.png"
            alt="카카오 로그인 아이콘"
            width={28}
            height={28}
            className="mr-2"
          />
          카카오 간편로그인
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
