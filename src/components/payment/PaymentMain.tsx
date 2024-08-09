"use client";

import { getMyPayment, getPaymentAll } from "@/apis/payment";
import { useAuthStore } from "@/zustand/authStore";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Notify } from "notiflix";

function PaymentMain() {
  const user = useAuthStore((state) => state.user);
  const userId = user?.id as string;
  const router = useRouter();

  const { data: paymentList = [] } = useQuery({
    queryKey: ["payment"],
    queryFn: getPaymentAll,
  });

  const {
    data: payment,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["payment", userId],
    queryFn: () => getMyPayment(userId),
  });

  const onClickPaymentBtnHandler = () => {
    if (!user) {
      Notify.failure("로그인된 사용자만 구매 가능합니다.");
      return;
    }
    if (payment) {
      Notify.failure("럭키박스를 이미 구매하셨습니다.");
      return;
    }
    router.push("/payment/form");
  };
  if (isPending)
    return (
      <div className="flex min-h-screen justify-center items-center">
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
    <div className="bg-green-1 min-h-screen pt-[130px] pb-[200px] sm:pb-[400px] md:pb-[300px] lg:pb-[600px] text-center">
      <div className="bg-green-1 mx-auto max-w-[660px] px-[16px] lg:px-0">
        <div className="relative w-full">
          <Image
            src="/img/luckybox-landing/img-luckybox.jpg"
            alt="선착순 단 100명! 단돈 1000원!"
            width={0}
            height={0}
            className="w-full h-auto"
          />
        </div>

        <div className="relative mt-[63px]">
          <span className="absolute top-[-55px] left-[calc(50%-94px)] bg-white py-2 px-8 text-main-7 rounded-full text-[16px] after:pointer">
            남은 럭키박스 {100 - paymentList.length}개!
          </span>
          <button
            onClick={onClickPaymentBtnHandler}
            className="font-bold text-[20px] md:text-[24px] text-white bg-main-8 py-[10px] md:py-[16px] w-full max-w-[300px] md:w-auto md:px-[184px] rounded-full"
          >
            구매하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentMain;
