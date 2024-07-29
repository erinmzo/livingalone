"use client";

import PortOne from "@portone/browser-sdk/v2";
import { useRouter } from "next/navigation";
import { Notify } from "notiflix";
import React from "react";

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
  // console.log(input);
  // console.log(purchaserAddress.trim());
  // console.log(process.env.NEXT_PUBLIC_PORTONE_API_KEY);
  // console.log(firstCheckBox);
  // console.log(secondCheckBox);
  // 우선 구매자 유효성 검사 제작
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
      paymentId: `${crypto.randomUUID()}`,
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
    console.log(response);
    if (response?.code != null) {
      // 오류 발생
      return alert(response.message);
    }
    const paymentId = response?.paymentId;

    // 즉시 환불 로직입니다. 나중에 route handler 변경 예정 -------------------------
    const url = `https://api.portone.io/payments/${paymentId}/cancel`;
    const options = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `PortOne ${process.env.NEXT_PUBLIC_PORTONE_API_KEY}`,
      },
      body: '{"reason":"실제 상품이 아니므로 환불됩니다. 구매해주셔서 감사합니다!"}',
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
    // -------------------------------------------------------------------------
    router.push(`/payment/complete?paymentId=${paymentId}`);
    // 고객사 서버에서 /payment/complete 엔드포인트를 구현해야 합니다.
    // (다음 목차에서 설명합니다)
    // const notified = await fetch(
    //   `/api/payment/complete?paymentId=${paymentId}`
    // );
    // const paymentData = await notified.json();
    // console.log(paymentData);
  };

  return <button onClick={paymentHandler}>결제하기</button>;
}

export default PaymentButton;
