"use client";

import { getMyProfile } from "@/apis/mypage";
import Input from "@/components/auth/common/Input";
import InnerLayout from "@/components/common/Page/InnerLayout";
import { useInputChange } from "@/hooks/useInput";
import { Profile } from "@/types/types";
import { useAuthStore } from "@/zustand/authStore";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useState } from "react";
import DaumPostcode from "react-daum-postcode";
import PaymentButton from "./PaymentButton";

function PaymentForm() {
  const user = useAuthStore((state) => state.user);

  const userId = user?.id as string;
  const {
    data: profile,
    isPending,
    isError,
  } = useQuery<Profile>({
    queryKey: ["myProfile", userId],
    queryFn: () => getMyProfile(userId),
    enabled: !!user,
  });

  const [isPostModalOpen, setIsPostModalOpen] = useState<boolean>(false);
  const [purchaserAddress, setPurchaserAddress] = useState<string>("");
  const [purchaserDetailAddress, setPurchaserDetailAddress] =
    useState<string>("");
  const [purchaserEmail, setPurchaserEmail] = useState<string>("");
  const [firstCheckBox, setFirstCheckBox] = useState<boolean>(false);
  const [secondCheckBox, setSecondCheckBox] = useState<boolean>(false);
  const { values: input, handler: onChangeInput } = useInputChange({
    purchaserName: "",
    purchaserPhone: "",
  });

  const [error, setError] = useState({
    nameError: "",
    phoneError: "",
    emailError: "",
    addressError: "",
  });

  const { purchaserName, purchaserPhone } = input;

  const onCompletePost = (data: { address: string }) => {
    setPurchaserAddress(data.address);
    setIsPostModalOpen(false);
  };

  useEffect(() => {
    if (profile?.address && profile.detail_address && user?.email) {
      setPurchaserAddress(profile.address);
      setPurchaserDetailAddress(profile.detail_address);
      setPurchaserEmail(user.email);
    }
  }, [profile, user]);
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
    <InnerLayout>
      <div className="flex flex-col justify-center items-center">
        <h3 className="hidden md:block mb-[66px] font-bold text-[30px]">
          주문서 작성
        </h3>

        <div className="flex flex-col w-[504px]"></div>
        <div className="flex flex-col gap-[23px] w-full md:w-[504px] mb-[24px] md:mb-[48px]">
          <Input
            variant="default"
            label="성함"
            placeholder="주문자의 성함을 입력해주세요"
            value={purchaserName}
            name="purchaserName"
            onChange={onChangeInput}
            error={error.nameError}
          />

          <Input
            variant="default"
            label="연락처"
            placeholder="010-XXXX-XXXX"
            value={purchaserPhone}
            name="purchaserPhone"
            onChange={onChangeInput}
            error={error.phoneError}
          />

          <Input
            variant="default"
            label="이메일"
            placeholder="주문자의 이메일을 입력해주세요."
            value={purchaserEmail}
            name="purchaserEmail"
            onChange={(e) => setPurchaserEmail(e.target.value)}
            error={error.emailError}
          />
        </div>

        <div className="flex flex-col gap-2 w-full md:w-[504px]">
          <button
            className="w-[73px] mb-1 py-[7px] border border-gray-4 bold text-[12px] rounded-full"
            onClick={() => setIsPostModalOpen((prev) => !prev)}
          >
            주소검색
          </button>
          <Input
            variant="underline"
            placeholder="주소"
            value={purchaserAddress}
            name="recipientAddress"
            readOnly={true}
            error={error.emailError}
          />

          <Input
            variant="underline"
            placeholder="상세 주소"
            value={purchaserDetailAddress}
            name="purchaserDetailAddress"
            onChange={(e) => setPurchaserDetailAddress(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2 w-[268px] md:w-[504px] mt-[56px] md:mt-[35px] mb-[20px] md:mb-[46px] pl-[10px]">
          <div className="flex">
            <input
              type="checkbox"
              onChange={() => {
                setFirstCheckBox(!firstCheckBox);
              }}
            />
            <label className="ml-2 md:font-bold text-[16px]">
              개인정보(이름, 연락처, 이메일, 주소)를 수집하는 것에 동의합니다.
            </label>
          </div>
          <div className="flex">
            <input
              type="checkbox"
              onChange={() => {
                setSecondCheckBox(!secondCheckBox);
              }}
            />
            <label className="ml-2 md:font-bold text-[16px] text-[#FF0000]">
              실제 판매 상품이 아니기에, 결제 시 즉시 환불처리 됩니다.
            </label>
          </div>
        </div>

        <PaymentButton
          input={input}
          purchaserAddress={purchaserAddress}
          purchaserDetailAddress={purchaserDetailAddress}
          purchaserEmail={purchaserEmail}
          firstCheckBox={firstCheckBox}
          secondCheckBox={secondCheckBox}
          setError={setError}
        />
        {isPostModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="absolute z-20 border-black border">
              <DaumPostcode onComplete={onCompletePost}></DaumPostcode>
            </div>
          </div>
        )}
      </div>
    </InnerLayout>
  );
}

export default PaymentForm;
