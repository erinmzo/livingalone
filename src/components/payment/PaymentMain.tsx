"use client";

import { getMyPayment } from "@/apis/payment";
import { useAuthStore } from "@/zustand/authStore";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Notify } from "notiflix";
import React from "react";

function PaymentMain() {
  const user = useAuthStore((state) => state.user);
  const userId = user?.id as string;
  const router = useRouter();

  const {
    data: payment,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["payment", userId],
    queryFn: () => getMyPayment(userId),
  });

  const onClickPaymentBtnHandler = () => {
    if (payment) {
      Notify.failure("럭키박스를 이미 구매하셨습니다.");
      return;
    }
    router.push("/payment/form");
  };
  if (isPending)
    return (
      <div className="flex justify-center items-center">
        <Image
          src="/img/loading-spinner.svg"
          alt="로딩중"
          width={200}
          height={200}
        />
      </div>
    );

  if (isError)
    return <div className="flex justify-center items-center">에러...</div>;
  return (
    <div>
      PaymentMain
      <button onClick={onClickPaymentBtnHandler}>구매하기!</button>
    </div>
  );
}

export default PaymentMain;
