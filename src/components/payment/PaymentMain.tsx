"use client";

import { useAuthStore } from "@/zustand/authStore";
import { useRouter } from "next/navigation";
import React from "react";

function PaymentMain() {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  const onClickPaymentBtnHandler = () => {
    router.push("/payment/form");
  };

  return (
    <div>
      PaymentMain
      <button onClick={onClickPaymentBtnHandler}>구매하기!</button>
    </div>
  );
}

export default PaymentMain;
