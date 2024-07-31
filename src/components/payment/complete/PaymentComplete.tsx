"use client";

import { insertPayment } from "@/apis/payment";
import { useAuthStore } from "@/zustand/authStore";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useRef } from "react";

function PaymentComplete({ paymentId }: { paymentId: string }) {
  const user = useAuthStore((state) => state.user);
  const hasRun = useRef(false);

  const addMutation = useMutation({
    // TODO 나중에 타입 수정
    mutationFn: async (newPayment: any) => {
      await insertPayment(newPayment);
    },
    onSuccess: () => {
      // router.push("/grouppost");
    },
  });

  const getPaymentInfo = async () => {
    const notified = await fetch(
      `/api/payment/complete?paymentId=${paymentId}`
    );
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
      <p>주문이 완료되었습니다!</p>
      <p>1000원 즉시 환불 될 것입니다...</p>
      <p>주문번호 : {paymentId}</p>
      {/* 마이페이지 주문 조회로 이동 */}
      <button>주문정보 확인하기</button>
    </div>
  );
}

export default PaymentComplete;
