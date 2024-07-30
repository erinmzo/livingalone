"use client";

import PortOne from "@portone/browser-sdk/v2";
import { useRouter } from "next/navigation";
import { Notify } from "notiflix";
import React from "react";
import { v4 as uuidv4 } from "uuid";

type TPaymentInput = {
  purchaserName: string;
  purchaserPhone: string;
  purchaserEmail: string;
  purchaserDetailAddress: string;
};

function PaymentButton({
  input,
  purchaserAddress,
  firstCheckBox,
  secondCheckBox,
}: {
  input: TPaymentInput;
  purchaserAddress: string;
  firstCheckBox: boolean;
  secondCheckBox: boolean;
}) {
  const {
    purchaserName,
    purchaserPhone,
    purchaserEmail,
    purchaserDetailAddress,
  } = input;

  const router = useRouter();

  const paymentHandler = async () => {
    if (
      !purchaserName.trim() ||
      !purchaserPhone.trim() ||
      !purchaserEmail.trim() ||
      !purchaserAddress.trim() ||
      !purchaserDetailAddress.trim()
    ) {
      Notify.failure("빈 칸을 모두 채워주세요.");
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
    });

    if (response?.code != null) {
      // 오류 발생
      return alert(response.message);
    }

    const paymentId = response?.paymentId;

    await fetch("/api/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ paymentId }),
    });

    router.push(`/payment/complete?paymentId=${paymentId}`);
  };

  return <button onClick={paymentHandler}>결제하기</button>;
}

export default PaymentButton;
