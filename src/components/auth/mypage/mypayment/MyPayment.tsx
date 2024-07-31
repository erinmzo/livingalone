"use client";

import { getMyPayment } from "@/apis/payment";
import { useAuthStore } from "@/zustand/authStore";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";

function MyPayment() {
  const user = useAuthStore((state) => state.user);
  const userId = user?.id as string;

  const {
    data: myPayment,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["myPayment", userId],
    queryFn: () => getMyPayment(userId),
    staleTime: 0,
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

  // const { id, name, phone, email, address, created_at, status } = myPayment;

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
            <p>{myPayment.status}</p>
          </div>
        ) : (
          <div>암것도 없으..</div>
        )}
      </div>
    )
  );
}

export default MyPayment;
