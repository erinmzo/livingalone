"use client";
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
    <div className="">
      <form onSubmit={handleJoinSubmit}>
        <div>
          <label className="">닉네임</label>
          <input
            type="text"
            placeholder="커뮤니티에서 사용할 닉네임을 적어주세요"
            className=""
            value={nickname}
            onChange={handleNicknameChange}
          />
        </div>
        <div>
          <label className="">이메일</label>
          <input
            type="email"
            placeholder="이메일 주소를 입력해주세요"
            className=""
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div>
          <label className="">비밀번호</label>
          <input
            type="password"
            placeholder="숫자와 영문 조합으로 입력해주세요"
            className=""
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit" className="">
          가입하기
        </button>
      </form>
    </div>
  );
};

export default JoinForm;
