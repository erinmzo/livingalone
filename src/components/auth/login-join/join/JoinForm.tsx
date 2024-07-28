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
  });

  const { nickname, email, password } = input;

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

    if (response.ok) {
      Notify.success("회원가입이 성공적으로 완료되었습니다.");
    } else if (response.status === 401) {
      return Notify.failure("이미 존재하는 아이디 입니다.");
    } else {
      return Notify.failure("회원가입에 실패하였습니다");
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
        <button type="submit" className="w-[500px] mt-4 py-3 text-xl bg-black text-white rounded-lg">
          가입하기
        </button>
      </form>
    </div>
  );
};

export default JoinForm;
