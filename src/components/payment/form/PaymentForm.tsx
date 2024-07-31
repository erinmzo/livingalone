"use client";

import { useInputChange } from "@/hooks/useInput";
import React, { useEffect, useState } from "react";
import DaumPostcode from "react-daum-postcode";
import PaymentButton from "./PaymentButton";
import { useAuthStore } from "@/zustand/authStore";
import { useQuery } from "@tanstack/react-query";
import { Profile } from "@/types/types";
import { getMyProfile } from "@/apis/mypage";

function PaymentForm() {
  const user = useAuthStore((state) => state.user);
  const userId = user?.id as string;
  console.log(user);
  const { data: profile, isPending } = useQuery<Profile>({
    queryKey: ["myProfile", userId],
    queryFn: () => getMyProfile(userId),
    enabled: !!user,
  });

  const [isPostModalOpen, setIsPostModalOpen] = useState<boolean>(false);
  const [purchaserAddress, setPurchaserAddress] = useState<string>("");
  const [purchaserDetailAddress, setPurchaserDetailAddress] =
    useState<string>("");
  const [purchaserEmail, setPurchaserEmail] = useState<string>("");
  const [firstCheckBox, setFirstCheckBox] = useState<boolean>(false);
  const [secondCheckBox, setSecondCheckBox] = useState<boolean>(false);
  const { values: input, handler: onChangeInput } = useInputChange({
    purchaserName: "",
    purchaserPhone: "",
  });

  const { purchaserName, purchaserPhone } = input;

  const onCompletePost = (data: { address: string }) => {
    setPurchaserAddress(data.address);
    setIsPostModalOpen(false);
  };

  useEffect(() => {
    if (profile?.address && profile.detail_address && user?.email) {
      setPurchaserAddress(profile.address);
      setPurchaserDetailAddress(profile.detail_address);
      setPurchaserEmail(user.email);
    }
  }, [profile, user]);

  return (
    <div>
      결제 폼 페이지 제작중
      <div>
        <label>주문자 성함</label>
        <input
          name="purchaserName"
          placeholder="주문자의 성함을 입력해주세요."
          value={purchaserName}
          onChange={onChangeInput}
        />
      </div>
      <div>
        <label>주문자 연락처</label>
        <input
          name="purchaserPhone"
          placeholder="주문자의 연락처를 입력해주세요."
          value={purchaserPhone}
          onChange={onChangeInput}
        />
      </div>
      <div>
        <label>주문자 이메일</label>
        <input
          name="purchaserEmail"
          placeholder="주문자의 이메일을 입력해주세요."
          value={purchaserEmail}
          onChange={onChangeInput}
        />
      </div>
      {/* TODO 주소 넣는거 넣기. 주소는 기본적으로 기존에 유저 정보의 주소로 넣어야함 */}
      <div>
        <label>주문자 주소</label>
        <button onClick={() => setIsPostModalOpen((prev) => !prev)}>
          주소변경
        </button>
        <input
          name="recipientAddress"
          placeholder="주소"
          value={purchaserAddress}
          readOnly
        />
        <input
          name="purchaserDetailAddress"
          placeholder="상세 주소"
          value={purchaserDetailAddress}
          onChange={(e) => setPurchaserDetailAddress(e.target.value)}
        />
      </div>
      <div>
        <input
          type="checkbox"
          onChange={() => {
            setFirstCheckBox(!firstCheckBox);
          }}
        />
        <label className="ml-2 font-bold">
          개인정보 활용 동의 (워딩 재구성 필요)
        </label>
      </div>
      <div>
        <input
          type="checkbox"
          onChange={() => {
            setSecondCheckBox(!secondCheckBox);
          }}
        />
        <label className="ml-2 font-bold">
          실제 판매 상품이 아니기에, 결제 시 즉시 환불처리 됩니다.
          이해하셨습니까?
        </label>
      </div>
      <PaymentButton
        input={input}
        purchaserAddress={purchaserAddress}
        purchaserDetailAddress={purchaserDetailAddress}
        purchaserEmail={purchaserEmail}
        firstCheckBox={firstCheckBox}
        secondCheckBox={secondCheckBox}
      />
      {isPostModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="absolute z-20 border-black border">
            <DaumPostcode onComplete={onCompletePost}></DaumPostcode>
          </div>
        </div>
      )}
    </div>
  );
}

export default PaymentForm;
