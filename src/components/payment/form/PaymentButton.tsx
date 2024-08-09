"use client";

import { refundPayment } from "@/apis/payment";
import PortOne from "@portone/browser-sdk/v2";
import { useRouter } from "next/navigation";
import { Notify } from "notiflix";
import React, { Dispatch, SetStateAction } from "react";
import { v4 as uuidv4 } from "uuid";

type TPaymentInput = {
  purchaserName: string;
  purchaserPhone: string;
};

function PaymentButton({
  input,
  purchaserAddress,
  purchaserDetailAddress,
  purchaserEmail,
  firstCheckBox,
  secondCheckBox,
  setError,
}: {
  input: TPaymentInput;
  purchaserAddress: string;
  purchaserEmail: string;
  purchaserDetailAddress: string;
  firstCheckBox: boolean;
  secondCheckBox: boolean;
  setError: Dispatch<
    SetStateAction<{
      nameError: string;
      phoneError: string;
      emailError: string;
      addressError: string;
    }>
  >;
}) {
  const { purchaserName, purchaserPhone } = input;

  const router = useRouter();

  const paymentHandler = async () => {
    setError({
      nameError: "",
      phoneError: "",
      emailError: "",
      addressError: "",
    });
    if (!purchaserName.trim()) {
      setError((prev) => ({
        ...prev,
        nameError: "성함은 필수 입력입니다.",
      }));
      return;
    }
    if (!purchaserPhone.trim()) {
      setError((prev) => ({
        ...prev,
        phoneError: "연락처는 필수 입력입니다.",
      }));
      return;
    }
    const phone_regex = /^01([0|1|6|7|8|9])-([0-9]{3,4})-([0-9]{4})$/;
    if (!phone_regex.test(purchaserPhone)) {
      setError((prev) => ({
        ...prev,
        phoneError: "전화번호는 01X-XXXX-XXXX 형식으로 작성해주세요.",
      }));
      return;
    }
    if (!purchaserEmail.trim()) {
      setError((prev) => ({
        ...prev,
        emailError: "이메일은 필수 입력입니다.",
      }));
      return;
    }
    const email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
    if (!email_regex.test(purchaserEmail)) {
      setError((prev) => ({
        ...prev,
        emailError: "이메일을 정확히 입력해주세요.",
      }));
      return;
    }

    if (!firstCheckBox || !secondCheckBox) {
      Notify.failure("체크박스를 모두 체크해주세요.");
      return;
    }
    const response = await PortOne.requestPayment({
      // Store ID 설정
      storeId: "store-1dde2d66-0b23-4480-9c18-cc7c666a63ff",
      // 채널 키 설정
      channelKey: "channel-key-4f07d679-cd8b-4143-8e64-ff67afba4b18",
      paymentId: uuidv4(),
      orderName: "혼자살때 럭키박스",
      totalAmount: 1000,
      currency: "CURRENCY_KRW",
      payMethod: "CARD",
      customer: {
        fullName: purchaserName,
        phoneNumber: purchaserPhone,
        email: purchaserEmail,
        address: {
          addressLine1: purchaserAddress,
          addressLine2: purchaserDetailAddress,
        },
      },
      bypass: {
        inicis_v2: {
          acceptmethod: ["SKIN(#00B8A2)"],
        },
      },

      redirectUrl: `http://localhost:3000/payment/check`,
    });

    if (response?.code != null) {
      // 오류 발생
      return alert(response.message);
    }

    const paymentId = response?.paymentId;

    router.push(`/payment/check?paymentId=${paymentId}`);
  };

  return (
    <button
      className="w-[500px] py-[13px] bg-main-8 bold text-[22px] text-gray-1 rounded-full"
      onClick={paymentHandler}
    >
      결제하기
    </button>
  );
}

export default PaymentButton;
