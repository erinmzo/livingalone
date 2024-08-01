"use client";

import { getPaymentAll } from "@/apis/payment";
import { useAuthStore } from "@/zustand/authStore";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect, useRef } from "react";

function PaymentComplete({ paymentId }: { paymentId: string }) {
  const user = useAuthStore((state) => state.user);
  const hasRun = useRef(false);

  const addMutation = useMutation({
    // TODO 나중에 타입 수정
    mutationFn: async (newPayment: any) => {
      await getPaymentAll(newPayment);
    },
  });

  const getPaymentInfo = async () => {
    const notified = await fetch(`/api/payment/complete?paymentId=${paymentId}`);
    const paymentData = await notified.json();
    if (paymentData && user) {
      const newPayment = {
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
    <div>
      <h4>주문이 완료되었습니다!</h4>
      <p>저희 프로젝트를 위해 결제해주신 1000원은 즉시 자동 환불됩니다</p>
      <div>
        <p>주문번호 : {paymentId}</p>
        <p>[혼자살때 럭키박스]</p>
        <p>결제금액: 1000원</p>
      </div>
      <Link href={"/mypage/mypayment"}>
        <button>주문내역 확인하기</button>
      </Link>
    </div>
  );
}

export default PaymentComplete;
