"use client";

import Page from "@/components/common/Page/Page";
import PortOne from "@portone/browser-sdk/v2";
import React from "react";

function PaymentPage() {
  // TEST page 입니다!!! 여기서 test하고 나중에 코드를 토대로 새롭게 제작할 예정입니다!
  const paymentTest = async () => {
    const response = await PortOne.requestPayment({
      // Store ID 설정
      storeId: "store-1dde2d66-0b23-4480-9c18-cc7c666a63ff",
      // 채널 키 설정
      channelKey: "channel-key-4f07d679-cd8b-4143-8e64-ff67afba4b18",
      paymentId: `${crypto.randomUUID()}`,
      orderName: "혼자살때 우리가 팔 거",
      totalAmount: 1000,
      currency: "CURRENCY_KRW",
      payMethod: "CARD",
      customer: {
        // TODO 유저 정보 가져와서 넣어줘야함
        fullName: "sol",
        phoneNumber: "01000000000",
        // TODO 이것도 유저 정보 가져와서 넣기
        email: "solpark16@gmail.com",
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
        Authorization:
          "PortOne qtJ1xXWp1Tf5vcByQxwAKqeMYFlDp5OEzADIXjmucHzLUOK04Fap3SN7HhkG63uOpkafogsrikV62TWv",
      },
      body: '{"reason":"실제 상품이 아니므로 환불댐니다... 사주셔서 감사행ㅇ"}',
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
    // -------------------------------------------------------------------------

    //
    // 고객사 서버에서 /payment/complete 엔드포인트를 구현해야 합니다.
    // (다음 목차에서 설명합니다)
    const notified = await fetch(`/api/payment/complete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // paymentId와 주문 정보를 서버에 전달합니다
      body: JSON.stringify({
        paymentId: paymentId,
      }),
    });
  };

  return (
    <Page>
      <button onClick={paymentTest}>결제 진행 전설의 시작이 될 버튼</button>
    </Page>
  );
}

export default PaymentPage;
