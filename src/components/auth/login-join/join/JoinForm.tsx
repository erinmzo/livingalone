"use client";
import { useInputChange } from "@/hooks/useInput";
import { useRouter } from "next/navigation";
import { Notify } from "notiflix";
import React from "react";
import Input from "../../common/Input";

const JoinForm = () => {
  const router = useRouter();

  const { values: input, handler: onChangeInput } = useInputChange({
    nickname: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const { nickname, email, password, passwordConfirm } = input;

  const joinData = { nickname, email, password };

  const handleSubmitJoin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch("/api/auth/join", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(joinData),
    });
    const data = await response.json();

    if (data.message === "Unable to validate email address: invalid format") {
      return Notify.failure("이메일 형식으로 입력해주세요.");
    }

    if (data.message === "User already registered") {
      return Notify.failure("이미 등록된 이메일 입니다.");
    }

    if (data.message === "Password should be at least 6 characters.") {
      return Notify.failure("비밀번호는 6자리 이상되어야 합니다.");
    }

    if (password !== passwordConfirm) {
      return Notify.failure("비밀번호가 일치하지 않습니다.");
    }

    if (response.ok) {
      Notify.success("회원가입이 성공적으로 완료되었습니다.");
    }

    router.push("/login");
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <form onSubmit={handleSubmitJoin} className="flex flex-col justify-center gap-6 w-[500px] mb-6">
        <Input
          label="닉네임"
          type="text"
          value={nickname}
          name="nickname"
          placeholder="커뮤니티에서 사용할 닉네임을 적어주세요"
          onChange={onChangeInput}
        />
        <Input
          label="이메일"
          type="text"
          value={email}
          name="email"
          placeholder="이메일 주소를 입력해주세요"
          onChange={onChangeInput}
        />
        <Input
          label="비밀번호"
          type="password"
          value={password}
          name="password"
          placeholder="숫자와 영문 조합으로 입력해주세요"
          onChange={onChangeInput}
        />
        <Input
          label="비밀번호 확인"
          type="password"
          value={passwordConfirm}
          name="passwordConfirm"
          placeholder="비밀번호를 한번 더 입력해주세요."
          onChange={onChangeInput}
        />
        <button type="submit" className="w-[500px] mt-4 py-3 text-xl bg-main-8 text-white rounded-full">
          가입하기
        </button>
      </form>
    </div>
  );
};

export default JoinForm;
