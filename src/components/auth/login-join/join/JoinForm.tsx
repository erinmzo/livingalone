"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Input from "../../common/Input/Input";

const JoinForm = () => {
  const router = useRouter();
  const [nickname, setNickname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleJoinSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const joinData = { nickname, email, password };

    const response = await fetch("/api/auth/join", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(joinData),
    });
    if (response.status === 200) {
      alert("회원가입이 완료되었습니다.");
    } else {
      alert("회원가입에 실패하였습니다");
    }
    router.push("/login");
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <form
        onSubmit={handleJoinSubmit}
        className="flex flex-col justify-center gap-6 w-[500px] mb-6"
      >
        <Input
          label="닉네임"
          type="text"
          value={nickname}
          placeholder="커뮤니티에서 사용할 닉네임을 적어주세요"
          onChange={handleNicknameChange}
        />
        <Input
          label="이메일"
          type="text"
          value={email}
          placeholder="이메일 주소를 입력해주세요"
          onChange={handleEmailChange}
        />
        <Input
          label="비밀번호"
          type="password"
          value={password}
          placeholder="숫자와 영문 조합으로 입력해주세요"
          onChange={handlePasswordChange}
        />
        <Link href="/login">
          <button
            type="submit"
            className="w-[500px] mt-4 py-3 text-xl bg-black text-white rounded-lg"
          >
            가입하기
          </button>
        </Link>
      </form>
    </div>
  );
};

export default JoinForm;