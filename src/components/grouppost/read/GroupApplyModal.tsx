"use client";

import { insertGroupApply } from "@/apis/grouppost";
import { TNewGroupApplication } from "@/types/types";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import DaumPostcode from "react-daum-postcode";
import { v4 as uuidv4 } from "uuid";

interface PropsType {
  id: string;
  onClose: () => void;
}

function GroupApplyModal({ id, onClose }: PropsType) {
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [isPostModalOpen, setIsPostModalOpen] = useState<boolean>(false);
  const [address, setAddress] = useState<string>("");
  const [detailAddress, setDetailAddress] = useState<string>("");

  const addMutation = useMutation({
    mutationFn: async (newGroupApply: TNewGroupApplication) => {
      await insertGroupApply(newGroupApply);
    },
    onSuccess: () => {
      onClose();
      router.refresh();
    },
  });

  const addGroupApplyHandler = async () => {
    // TODO 유효성 검사 넣기
    if (!name.trim() || !phone.trim() || !address.trim()) {
      alert("상세 주소를 제외한 입력창을 모두 채워주세요.");
      return;
    }
    const newGroupApply: TNewGroupApplication = {
      id: uuidv4(),
      post_id: id,
      user_phone: phone,
      user_name: name,
      user_address: address,
      user_detail_address: detailAddress,
      is_paid: false,
      // TODO 로그인 기능 완료 시 가져온 값 넣기
      user_id: "38341ad9-3080-4072-997e-2f53feca7bf0",
    };
    addMutation.mutate(newGroupApply);
  };

  const onCompletePost = (data: any) => {
    setAddress(data.address);
    setIsPostModalOpen(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center ">
      <div className="z-10 w-[1000px] min-h-[300px] bg-white rounded-[30px] shadow-modal-custom">
        <button onClick={onClose}>임시 엑스버튼</button>
        <h6>공구 신청하기</h6>
        <input
          placeholder="입금자명"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="+82"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button onClick={() => setIsPostModalOpen(true)}>주소 검색</button>
        <input placeholder="주소" value={address} readOnly />
        <input
          placeholder="상세 주소"
          value={detailAddress}
          onChange={(e) => setDetailAddress(e.target.value)}
        />
        <button onClick={addGroupApplyHandler}>확인</button>
      </div>
      {isPostModalOpen && (
        <div className="absolute z-20 border-black border">
          <DaumPostcode onComplete={onCompletePost}></DaumPostcode>
        </div>
      )}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black bg-opacity-50"
      ></div>
    </div>
  );
}

export default GroupApplyModal;
