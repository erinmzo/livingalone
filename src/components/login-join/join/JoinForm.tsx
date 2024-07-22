"use client";

import React, { useState } from "react";

const JoinForm = () => {
  const [nickname, setNickname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <div className="flex flex-col w-full mt-5 items-center justify-center">
      <div>
        <p className="font-semibold mt-6">닉네임</p>
        <input
          type="text"
          placeholder="커뮤니티에서 보여질 닉네임을 쓰세요"
          className="w-[500px] h-[49px] rounded-md border-2 border-gray-300 mt-3"
        />
        <p className="font-semibold mt-6">이메일</p>
        <input
          type="email"
          placeholder="이메일 주소를 입력해주세요"
          className="w-[500px] h-[49px] rounded-md border-2 border-gray-300 mt-3"
        />
        <p className="font-semibold mt-6">비밀번호</p>
        <input
          type="password"
          placeholder="숫자와 영문조합 입력해주세요"
          className="w-[500px] h-[49px] rounded-md border-2 border-gray-300 mt-3"
        />
      </div>
    </div>
  );
};

export default JoinForm;
