"use client";

import Image from "next/image";
import { useState } from "react";
import DaumPostcode from "react-daum-postcode";
import Input from "../Input/Input";
import Button from "../button/Button";

function MyInformation() {
  const [isPostModalOpen, setIsPostModalOpen] = useState<boolean>(false);
  const [address, setAddress] = useState<string>("");
  const [detailAddress, setDetailAddress] = useState<string>("");

  const onCompletePost = (data: any) => {
    setAddress(data.address);
    setIsPostModalOpen(false);
  };

  return (
    <div className="flex-col w-auto grow">
      <div className="flex justify-center items-center ">
        <div className="flex flex-col w-[563px] h-[508px] gap-6 ">
          <span className="text-lg font-medium">나의 정보</span>
          <div>
            <span>닉네임</span>
            <Input variant="default" />
          </div>
          <div>
            <span>프로필 사진변경</span>
            <Input variant="default" type="file" placeholder="사진변경" />
          </div>
          <div>
            <Button variant="primary" className="flex items-center gap-3" onClick={() => setIsPostModalOpen(true)}>
              <Image src="/img/icon-search-white.png" alt="검색 아이콘" width={20} height={20} />
              <p>주소변경</p>
            </Button>
            {isPostModalOpen && (
              <div className="absolute z-20 border-black border">
                <DaumPostcode onComplete={onCompletePost}></DaumPostcode>
              </div>
            )}
            <Input variant="underline" value={address} placeholder="주소" />
            <Input
              variant="underline"
              value={detailAddress}
              onChange={(e) => setDetailAddress(e.target.value)}
              placeholder="상세 주소"
            />
          </div>
          <Button variant="secondary">변경하기</Button>
        </div>
      </div>
    </div>
  );
}
export default MyInformation;
