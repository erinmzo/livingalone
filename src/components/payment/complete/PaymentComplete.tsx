"use client";

import Link from "next/link";

function PaymentComplete({ paymentId }: { paymentId: string }) {
  return (
    <div className="flex flex-col justify-center items-center">
      <h4 className="font-semibold text-2xl md:text-3xl">
        주문이 완료되었습니다!
      </h4>
      <p className="text-center text-[#ff0000] w-[210px] md:w-auto mt-[15px] md:mt-5 text-base md:text-lg">
        저희 프로젝트를 위해 결제해주신 1000원은 즉시 자동 환불됩니다
      </p>
      <div className="w-[300px] md:w-[504px] h-[141px] md:h-[204px] bg-main-1 mt-[14px] md:mt-5 rounded-xl flex flex-col justify-center items-center">
        <p className="text-gray-3 text-[14px] md:text-lg text-center">
          주문번호 : {paymentId}
        </p>
        <p className="mt-[14px] md:mt-6 text-gray-4 text-[18px] md:text-2xl font-bold">
          [혼자살때 럭키박스]
        </p>
        <p className="text-gray-4 md:text-gray-3 text-lg font-semibold mt-[3px] md:mt-3">
          결제금액: 1000원
        </p>
      </div>
      <Link href={"/mypage/mypayment"} className="w-full flex justify-center">
        <button className="mt-7 w-full max-w-[300px] md:w-[500px] h-[44px] md:h-[52px] bg-main-8  text-white rounded-3xl text-xl text-bold ">
          주문내역 확인하기
        </button>
      </Link>
    </div>
  );
}

export default PaymentComplete;
