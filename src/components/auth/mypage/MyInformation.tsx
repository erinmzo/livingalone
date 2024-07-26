"use client";

import { useEditProfile } from "@/zustand/profileStore";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { ChangeEventHandler, MouseEventHandler, useState } from "react";
import DaumPostcode from "react-daum-postcode";
import Input from "../common/Input";
import { useAuthStore } from "@/zustand/authStore";
import { getMyProfile } from "@/apis/mypage";
import { Profile } from "@/types/types";

function MyInformation() {
  // const { nickname, setNickname, setUserPic } = useEditProfile();
  const user = useAuthStore((state) => state.user);
  const userId = user?.id as string;

  const [isPostModalOpen, setIsPostModalOpen] = useState<boolean>(false);
  const [address, setAddress] = useState<string>("");
  const [detailAddress, setDetailAddress] = useState<string>("");
  const [localNickname, setLocalNickname] = useState<string>("");
  const [localUserPic, setLocalUserPic] = useState<string | null>(null);

  const { data: profile, isPending } = useQuery<Profile>({
    queryKey: ["profile", userId],
    queryFn: () => getMyProfile(userId),
  });

  const handleSearchAddress = () => {
    setIsPostModalOpen((prev) => !prev);
  };

  const onCompletePost = (data: { address: string }) => {
    setAddress(data.address);
    setIsPostModalOpen(false);
  };

  const handleNickname: ChangeEventHandler<HTMLInputElement> = (e) => {
    setLocalNickname(e.target.value);
  };

  const handleDetailAddress: ChangeEventHandler<HTMLInputElement> = (e) => {
    setDetailAddress(e.target.value);
  };

  const handleProfileUpdate: MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault();
  };

  return (
    <div className="flex-col w-auto grow">
      <div className="flex flex-col justify-center items-start gap-8">
        <h5 className="font-bold text-[20px]">나의 정보</h5>
        <form className="w-[400px]">
          <div className="flex flex-col gap-6">
            <Input
              variant="default"
              label="닉네임"
              placeholder={profile?.nickname}
              value={localNickname}
              onChange={handleNickname}
            />
            <Input
              variant="default"
              type="file"
              placeholder="사진변경"
              label="프로필 사진 변경"
            />
          </div>
          <div className="relative mt-6">
            <button
              type="button"
              className="flex gap-3 py-[10px] px-[16px] bg-black hover:bg-slate-800 rounded-full"
              onClick={handleSearchAddress}
            >
              <Image
                src="/img/icon-search-white.png"
                alt="검색 아이콘"
                width={20}
                height={20}
              />
              <span className="text-white">주소변경</span>
            </button>
            {isPostModalOpen && (
              <div className="absolute left-0 top-[48px] border border-black">
                <DaumPostcode onComplete={onCompletePost}></DaumPostcode>
              </div>
            )}
            <Input variant="underline" value={address} placeholder="주소" />
            <Input
              variant="underline"
              value={detailAddress}
              onChange={handleDetailAddress}
              placeholder="상세 주소"
            />
          </div>
          <button
            type="submit"
            className="bg-[#808080] text-white w-full py-2 mt-[50px] rounded-lg font-bold text-[18px]"
            onClick={handleProfileUpdate}
          >
            변경하기
          </button>
        </form>
      </div>
    </div>
  );
}
export default MyInformation;
