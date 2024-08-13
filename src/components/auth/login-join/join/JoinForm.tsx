"use client";
import { useInputChange } from "@/hooks/useInput";
import { useRouter } from "next/navigation";
import { Notify } from "notiflix";
import React, { useState } from "react";
import Input from "../../common/Input";

const JoinForm = () => {
  const router = useRouter();

  const { values: input, handler: onChangeInput } = useInputChange({
    nickname: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [error, setError] = useState({
    emailError: "",
    passwordError: "",
    passwordConfirmError: "",
    nicknameError: "",
  });

  const { nickname, email, password, passwordConfirm } = input;

  const joinData = { nickname, email, password };
  // 정규표현식
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

  const handleSubmitJoin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError({
      emailError: "",
      passwordError: "",
      passwordConfirmError: "",
      nicknameError: "",
    });

    const response = await fetch("/api/auth/join", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(joinData),
    });
    const data = await response.json();

    if (nickname.length < 2 || nickname.length >= 8) {
      setError((prev) => ({
        ...prev,
        nicknameError: "닉네임은 2~8글자 사이로 입력해주세요",
      }));
    }

    if (data.message === "Unable to validate email address: invalid format") {
      setError((prev) => ({
        ...prev,
        emailError: "이메일 형식으로 입력해주세요.",
      }));
      return;
    }

    if (!emailRegex.test(email)) {
      setError((prev) => ({
        ...prev,
        emailError: "이메일 형식으로 입력해주세요. ex) example@example.com",
      }));
      return;
    }

    if (data.message === "User already registered") {
      setError((prev) => ({
        ...prev,
        emailError: "이미 등록된 이메일 입니다.",
      }));
      return;
    }

    if (!passwordRegex.test(password)) {
      setError((prev) => ({
        ...prev,
        passwordError:
          "비밀번호는 숫자와 영문자 조합으로 6자리 이상이어야 합니다.",
      }));
      return;
    }

    // if (
    //   data.message === "Password should be at least 6 characters." ||
    //   password.length === 0
    // ) {
    //   setError((prev) => ({
    //     ...prev,
    //     passwordError: "비밀번호는 6자리 이상되어야 합니다.",
    //   }));
    //   return;
    // }

    if (password !== passwordConfirm) {
      setError((prev) => ({
        ...prev,
        passwordConfirmError: "비밀번호가 일치하지 않습니다.",
      }));
      return;
    }

    if (response.ok) {
      Notify.success("회원가입이 성공적으로 완료되었습니다.");
    }

    router.push("/login");
  };

  return (
    <div className="flex flex-col justify-normal items-center min-h-screen px-4 sm:px-6 mt-10 lg:px-8">
      <form
        onSubmit={handleSubmitJoin}
        className="flex flex-col justify-center gap-6 w-full mb-6 max-w-lg"
      >
        <Input
          label="닉네임"
          type="text"
          value={nickname}
          name="nickname"
          placeholder="커뮤니티에서 사용할 닉네임을 적어주세요"
          onChange={onChangeInput}
          error={error.nicknameError}
        />
        <Input
          label="이메일"
          type="text"
          value={email}
          name="email"
          placeholder="이메일 주소를 입력해주세요"
          onChange={onChangeInput}
          error={error.emailError}
        />

        <Input
          label="비밀번호"
          type="password"
          value={password}
          name="password"
          placeholder="숫자와 영문 조합으로 입력해주세요"
          onChange={onChangeInput}
          error={error.passwordError}
        />
        <Input
          label="비밀번호 확인"
          type="password"
          value={passwordConfirm}
          name="passwordConfirm"
          placeholder="비밀번호를 한번 더 입력해주세요."
          onChange={onChangeInput}
          error={error.passwordConfirmError}
        />
        <button
          type="submit"
          className="w-full mt-1 py-3 text-xl bg-main-8 text-white rounded-full"
        >
          가입하기
        </button>
      </form>
    </div>
  );
};

export default JoinForm;
