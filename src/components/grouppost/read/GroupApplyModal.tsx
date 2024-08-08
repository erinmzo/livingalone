"use client";

import { insertGroupApply } from "@/apis/grouppost";
import { TNewGroupApplication } from "@/types/types";
import { postRevalidate } from "@/utils/revalidate";
import { useAuthStore } from "@/zustand/authStore";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Notify, Report } from "notiflix";
import { useState } from "react";
import DaumPostcode from "react-daum-postcode";
import { v4 as uuidv4 } from "uuid";

interface PropsType {
  id: string;
  onClose: () => void;
}

function GroupApplyModal({ id, onClose }: PropsType) {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [isPostModalOpen, setIsPostModalOpen] = useState<boolean>(false);
  const [address, setAddress] = useState<string>("");
  const [detailAddress, setDetailAddress] = useState<string>("");
  const [checkBox, setCheckBox] = useState<boolean>(false);

  // 유효성 검사 useState
  const [error, setError] = useState({
    phoneError: "",
    nameError: "",
    addressError: "",
  });

  const handleSearchAddress = () => {
    setIsPostModalOpen((prev) => !prev);
  };

  const addMutation = useMutation({
    mutationFn: async (newGroupApply: TNewGroupApplication) => {
      await insertGroupApply(newGroupApply);
    },
    onSuccess: () => {
      onClose();
      Report.success("신청이 완료되었습니다.", "", "확인");
      postRevalidate(`/grouppost/read/${id}`);
      router.refresh();
    },
  });

  const addGroupApplyHandler = async () => {
    setError({
      phoneError: "",
      nameError: "",
      addressError: "",
    });

    if (!name.trim()) {
      setError((prev) => ({
        ...prev,
        nameError: "이름을 입력해주세요.",
      }));
      return;
    }
    const phoneCheck = /^01([0|1|6|7|8|9])-([0-9]{3,4})-([0-9]{4})$/;
    if (!phoneCheck.test(phone)) {
      setError((prev) => ({
        ...prev,
        phoneError: "010-XXXX-XXXX 형식으로 입력해주세요.",
      }));
      return;
    }
    if (!address.trim()) {
      setError((prev) => ({
        ...prev,
        addressError: "주소를 검색하고 등록해주세요.",
      }));
      return;
    }
    if (!checkBox) {
      Notify.failure("서약에 체크해주세요.");
      return;
    }
    if (!user) {
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
      user_id: user.id,
    };
    addMutation.mutate(newGroupApply);
  };

  const onCompletePost = (data: { address: string }) => {
    setAddress(data.address);
    setIsPostModalOpen(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[999]">
      <div className="z-10 p-6 w-[500px] box-border bg-white rounded-2xl shadow-modal-custom">
        <div className="flex justify-end">
          <button onClick={onClose}>
            <Image
              src="/img/icon-delete.png"
              alt="모달 종료 버튼"
              width={24}
              height={24}
            />
          </button>
        </div>
        <h6 className="flex justify-center font-bold text-[32px] mb-[33px]">
          공구 신청하기
        </h6>
        <div className="px-9">
          <input
            className="w-full h-[47px] text-[24px] border-b-2 border-black p-1"
            placeholder="입금자명"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {error.nameError && (
            <p className={`text-red-3 mt-2`}>{error.nameError}</p>
          )}

          <input
            className="w-full h-[47px] mt-[26px] text-[24px] border-b-2 border-black p-1"
            placeholder="010-0000-0000"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {error.phoneError && (
            <p className={`text-red-3 mt-2`}>{error.phoneError}</p>
          )}
          <button
            className="py-2 px-4 mt-[44px] text-[12px] font-bold text-gray-3 border border-gray-3 rounded-full mb-3"
            onClick={handleSearchAddress}
          >
            주소검색
          </button>
          <input
            className="w-full h-[47px] text-[24px] border-b-2 border-black p-1"
            placeholder="주소"
            value={address}
            readOnly
          />
          {error.addressError && (
            <p className={`text-red-3 mt-2`}>{error.addressError}</p>
          )}
          <input
            className="w-full h-[47px] text-[24px] mt-2 mb-[40px] border-b-2 border-black p-1"
            placeholder="상세 주소"
            value={detailAddress}
            onChange={(e) => setDetailAddress(e.target.value)}
          />
        </div>
        <div className="px-[26px]">
          <input
            type="checkbox"
            onChange={() => {
              setCheckBox(!checkBox);
            }}
          />
          <label
            className={`ml-2 font-bold ${
              checkBox ? "text-gray-5" : "text-gray-4"
            }`}
          >
            공구 참여자 는 2024년 7월 22일 아래와 같이 서약합니다.
          </label>
          <div
            className={`text-[14px] mt-2 ${
              checkBox ? "text-gray-5" : "text-gray-3"
            }`}
          >
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
            className={`${
              checkBox ? "bg-main-8" : "bg-gray-2"
            } mt-[32px] mb-[24px] text-white w-full py-4 text-[24px] rounded-full font-bold`}
            onClick={addGroupApplyHandler}
          >
            확인
          </button>
        </div>
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
