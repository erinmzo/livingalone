"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

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
        <div className="flex flex-col">
          <label className="ml-1 mb-[10px] font-bold">닉네임</label>
          <input
            type="text"
            placeholder="커뮤니티에서 사용할 닉네임을 적어주세요"
            className="py-[9px] px-4 rounded-lg border border-[#808080] text-xl font-medium placeholder-[#999999]"
            value={nickname}
            onChange={handleNicknameChange}
          />
        </div>
        <div className="flex flex-col">
          <label className="ml-1 mb-[10px] font-bold">이메일</label>
          <input
            type="email"
            placeholder="이메일 주소를 입력해주세요"
            className="py-[9px] px-4 rounded-lg border border-[#808080] text-xl font-medium placeholder-[#999999]"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="flex flex-col">
          <label className="ml-1 mb-[10px] font-bold">비밀번호</label>
          <input
            type="password"
            placeholder="숫자와 영문조합 입력해주세요"
            className="py-[9px] px-4 rounded-lg border border-[#808080] text-xl font-medium placeholder-[#999999]"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
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
