"use client";

import { editPayment, getMyPayment, refundPayment } from "@/apis/payment";
import { Payment, TNewPayment } from "@/types/types";
import { useAuthStore } from "@/zustand/authStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";

function MyPayment() {
  const user = useAuthStore((state) => state.user);
  const userId = user?.id as string;
  const queryClient = useQueryClient();

  const {
    data: myPayment,
    isPending,
    isError,
  } = useQuery<Payment>({
    queryKey: ["myPayment", userId],
    queryFn: () => getMyPayment(userId),
  });

  const updateMutation = useMutation({
    // TODO 나중에 타입 수정
    mutationFn: async (updatePayment: TNewPayment) => {
      await editPayment(updatePayment);
    },
    onSuccess: () => {
      alert("환불이 완료되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["myPayment", userId] });
    },
  });

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

  const refundHandler = async (paymentId: string) => {
    const data = await refundPayment(paymentId);
    if (data.success) {
      const updatePayment: TNewPayment = {
        id: myPayment.id,
        name: myPayment.name,
        address: myPayment.address,
        phone: myPayment.phone,
        email: myPayment.email,
        user_id: myPayment.user_id,
        status: "CANCELLED",
      };
      console.log(updatePayment);
      updateMutation.mutate(updatePayment);
    }
  };

  return (
    user &&
    user.id && (
      <div className="flex-col">
        <h5 className="font-bold text-[24px] mb-[32px] w-full">결제 내역</h5>
        {myPayment ? (
          <div>
            <p>주문번호 : {myPayment.id}</p>
            <p>상품명 : [혼자살때 럭키박스]</p>
            <p>결제금액 : 1,000원</p>
            <p>주문자 성함 : {myPayment.name}</p>
            <p>주문자 연락처 : {myPayment.phone}</p>
            <p>주문자 이메일 : {myPayment.email}</p>
            <p>주문자 주소 : {myPayment.address}</p>
            <p>
              상태 :{" "}
              {myPayment.status === "CANCELLED" ? "환불 완료" : "결제 완료"}
            </p>
            {myPayment.status === "PAID" && (
              <button onClick={() => refundHandler(myPayment.id)}>
                환불하기
              </button>
            )}
          </div>
        ) : (
          <div>주문 내역이 없습니다.</div>
        )}
      </div>
    )
  );
}

export default MyPayment;
