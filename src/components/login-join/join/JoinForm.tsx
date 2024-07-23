"use client";

import Router, { useRouter } from "next/router";
import React, { useState } from "react";

const JoinForm = () => {
  const [nickname, setNickname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const JoinData = { nickname, email, password };

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

    const response = await fetch("/api/auth/join", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(JoinData),
    });

    const data = await response.json();
    if (response.status === 200) {
      alert("회원가입이 완료되었습니다.");
    } else {
      alert("회원가입에 실패하였습니다");
    }
    Router.push("/login");
  };

  return (
    <div className="flex flex-col w-full mt-5 items-center justify-center">
      <form onSubmit={handleJoinSubmit}>
        <label className="font-semibold mt-6">닉네임</label>
        <br />
        <input
          type="text"
          placeholder="커뮤니티에서 보여질 닉네임을 쓰세요"
          className="w-[500px] h-[49px] rounded-md border-2 border-gray-300 mt-3"
          value={nickname}
          onChange={handleNicknameChange}
        />
        <br />
        <label className="font-semibold mt-6">이메일</label>
        <br />
        <input
          type="email"
          placeholder="이메일 주소를 입력해주세요"
          className="w-[500px] h-[49px] rounded-md border-2 border-gray-300 mt-3"
          value={email}
          onChange={handleEmailChange}
        />
        <br />
        <label className="font-semibold mt-6">비밀번호</label>
        <br />
        <input
          type="password"
          placeholder="숫자와 영문조합 입력해주세요"
          className="w-[500px] h-[49px] rounded-md border-2 border-gray-300 mt-3"
          value={password}
          onChange={handlePasswordChange}
        />
        <button
          type="submit"
          className="mt-4 w-[500px] h-[49px] rounded-lg border-2 bg-black text-white flex items-center justify-center"
        >
          가입하기
        </button>
      </form>
    </div>
  );
};

export default JoinForm;
