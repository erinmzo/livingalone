"use client";

import { insertPayment, refundPayment } from "@/apis/payment";
import { TNewPayment } from "@/types/types";
import { useAuthStore } from "@/zustand/authStore";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect, useRef } from "react";

function PaymentComplete({ paymentId }: { paymentId: string }) {
  const user = useAuthStore((state) => state.user);
  const hasRun = useRef(false);

  const addMutation = useMutation({
    // TODO 나중에 타입 수정
    mutationFn: async (newPayment: TNewPayment) => {
      await insertPayment(newPayment);
    },
  });

  const getPaymentInfo = async () => {
    // 즉시 환불
    await refundPayment(paymentId);
    const notified = await fetch(
      `/api/payment/complete?paymentId=${paymentId}`
    );
    const paymentData = await notified.json();
    if (paymentData && user) {
      const newPayment: TNewPayment = {
        id: paymentId,
        name: paymentData.customer.name,
        address: paymentData.customer.address.oneLine,
        phone: paymentData.customer.phoneNumber,
        email: paymentData.customer.email,
        user_id: user?.id,
        status: paymentData.status,
      };
      addMutation.mutate(newPayment);
    }
  };

  useEffect(() => {
    if (user && !hasRun.current) {
      getPaymentInfo();
      hasRun.current = true;
    }
  }, [user]);

  return (
    <div className="flex flex-col justify-center items-center">
      <h4 className="font-semibold text-3xl">주문이 완료되었습니다!</h4>
      <p className="text-[#ff0000] mt-5 text-lg">
        저희 프로젝트를 위해 결제해주신 1000원은 즉시 자동 환불됩니다
      </p>
      <div className="w-[504px] h-[204px] bg-main-1 mt-5 rounded-xl flex flex-col justify-center items-center">
        <p className="text-gray-3 text-lg">주문번호 : {paymentId}</p>
        <p className="mt-6 text-2xl">[혼자살때 럭키박스]</p>
        <p className="text-gray-3 text-lg font-semibold mt-3">
          결제금액: 1000원
        </p>
      </div>
      <Link href={"/mypage/mypayment"}>
        <button className="mt-7 w-[500px] h-[52px] py-3 bg-main-8  text-white rounded-3xl text-xl text-bold ">
          주문내역 확인하기
        </button>
      </Link>
    </div>
  );
}

export default PaymentComplete;
