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
      updateMutation.mutate(updatePayment);
    }
  };

  return (
    user &&
    user.id && (
      <div className="flex-col">
        <h5 className="font-bold text-[24px] mb-[32px] w-full">결제 내역</h5>
        {myPayment ? (
          <div className="border border-gray-2 w-[330px] rounded-lg p-5">
            <p className="text-[10px] text-gray-3 mb-2">
              주문번호 {myPayment.id}
            </p>
            <div className="flex items-center gap-[10px] mb-2">
              <Image
                src="/img/luckybox-my.png"
                alt="럭키박스"
                width={58}
                height={58}
              />
              <div
                className={`${
                  myPayment.status === "CANCELLED"
                    ? "text-gray-3"
                    : "text-black"
                }`}
              >
                <p className="mb-1">혼자살때 럭키박스</p>
                <p>
                  <span className="font-bold">1,000</span>원
                </p>
              </div>
            </div>

            <h6
              className={`text-[10px] font-bold mb-1 ${
                myPayment.status === "CANCELLED" ? "text-gray-2" : "text-gray-4"
              }`}
            >
              주문자 정보
            </h6>
            <div
              className={`${
                myPayment.status === "CANCELLED" ? "text-gray-2" : "text-gray-3"
              } text-[10px] mb-2`}
            >
              <p className="mb-1">{myPayment.name}</p>
              <p className="mb-1">
                {myPayment.phone} | {myPayment.email}
              </p>
              <p>주문자 주소 : {myPayment.address}</p>
            </div>
            {/* 디자인에 해당 내용이 들어가지 않아 임시로 주석처리 했습니다. */}
            {/* <p>
              상태 :{" "}
              {myPayment.status === "CANCELLED" ? "환불 완료" : "결제 완료"}
            </p> */}

            {myPayment.status === "PAID" ? (
              <button
                className="border border-main-8 text-main-8 text-[12px] font-bold rounded-full py-2 px-4"
                onClick={() => refundHandler(myPayment.id)}
              >
                환불하기
              </button>
            ) : (
              <button
                className=" border bg-gray-2 text-gray-3 text-[12px] font-bold rounded-full py-2 px-4"
                disabled
              >
                환불완료
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
