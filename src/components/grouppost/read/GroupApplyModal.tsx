"use client";

import { insertGroupApply } from "@/apis/grouppost";
import { TNewGroupApplication } from "@/types/types";
import { groupPostRevalidate } from "@/utils/revalidate";
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
  const [checkBox, setCheckBox] = useState<boolean>(false);

  const addMutation = useMutation({
    mutationFn: async (newGroupApply: TNewGroupApplication) => {
      await insertGroupApply(newGroupApply);
    },
    onSuccess: () => {
      onClose();
      groupPostRevalidate(id);
      router.refresh();
    },
  });

  const addGroupApplyHandler = async () => {
    if (!name.trim() || !phone.trim() || !address.trim()) {
      alert("상세 주소를 제외한 입력창을 모두 채워주세요.");
      return;
    }
    if (!checkBox) {
      alert("서약에 체크해주세요.");
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
      <div className="z-10 p-6 w-[500px] box-border bg-white rounded-[30px] shadow-modal-custom">
        <div className="flex justify-end">
          <button onClick={onClose}>임시 엑스버튼</button>
        </div>
        <h6 className="flex justify-center font-bold text-[32px] mb-[33px]">
          공구 신청하기
        </h6>
        <input
          className="w-full h-[47px] text-[24px] mb-[26px] border-b-2 border-black p-1"
          placeholder="입금자명"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="w-full h-[47px] text-[24px] mb-[44px] border-b-2 border-black p-1"
          placeholder="+82"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button
          className="py-2 px-4 text-white bg-black rounded-full mb-3"
          onClick={() => setIsPostModalOpen(true)}
        >
          주소 검색
        </button>
        <input
          className="w-full h-[47px] text-[24px] mb-2 border-b-2 border-black p-1"
          placeholder="주소"
          value={address}
          readOnly
        />
        <input
          className="w-full h-[47px] text-[24px] mb-[40px] border-b-2 border-black p-1"
          placeholder="상세 주소"
          value={detailAddress}
          onChange={(e) => setDetailAddress(e.target.value)}
        />
        <input
          type="checkbox"
          onChange={() => {
            setCheckBox(!checkBox);
          }}
        />
        <label className="ml-2 font-bold">
          공구 참여자 는 2024년 7월 22일 아래와 같이 서약합니다.
        </label>
        <div className="text-[14px] mt-2">
          <p className="flex gap-1">
            <span>1. </span> 공구 총대가 개인정보(이름, 주소, 전화번호)를
            수집하는 것에 동의합니다.
          </p>
          <p className="flex gap-1">
            <span>2. </span> 개인정보 기입 오류 시 물건에 대한 피해, 금전적
            피해, 불이익 등 모두 감수하며, 환불받지 못하는 사실에 동의합니다.
          </p>
          <p className="flex gap-1">
            <span>3. </span> 본인 실수로 인한 불이익 발생 시 어떠한 이의제기도
            하지 않을 것을 서약합니다.
          </p>
        </div>
        <button
          className="bg-black mt-[32px] mb-[24px] text-white w-full py-4 text-[24px] rounded-full font-bold"
          onClick={addGroupApplyHandler}
        >
          확인
        </button>
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
