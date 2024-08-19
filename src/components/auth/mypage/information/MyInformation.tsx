"use client";

import { editMyProfile, getMyProfile, uploadImage } from "@/apis/mypage";
import { useInputChange } from "@/hooks/useInput";
import { Profile, TProfile } from "@/types/types";
import { useAuthStore } from "@/zustand/authStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import imageCompression from "browser-image-compression";
import Image from "next/image";
import { Report } from "notiflix";
import { ChangeEvent, MouseEvent, useRef, useState } from "react";
import DaumPostcode from "react-daum-postcode";
import Input from "../../common/Input";
import SkeletonProfile from "./SkeletonProfile";

function MyInformation() {
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);
  const userId = user?.id as string;

  const [isPostModalOpen, setIsPostModalOpen] = useState<boolean>(false);
  const [address, setAddress] = useState<string>("");
  const [imgFile, setImgFile] = useState<File | null>();
  const [imgUrl, setImgUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // ref 선언
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    values: input,
    handler: onChangeInput,
    reset,
  } = useInputChange({
    nickname: "",
    detailAddress: "",
  });

  const { nickname, detailAddress } = input;

  const { data: profile, isPending } = useQuery<Profile>({
    queryKey: ["profile", userId],
    queryFn: () => getMyProfile(userId),
    enabled: !!user,
  });

  console.log(profile);
  const { mutate: editProfile } = useMutation({
    mutationFn: (newProfile: TProfile) => editMyProfile(userId, newProfile),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", userId] });
      Report.success("변경이 완료되었습니다!", "", "확인");
    },
    onSettled: () => {
      setAddress("");
      reset();
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    },
  });

  const { mutate: uploadImageProfile } = useMutation({
    mutationFn: async (profileImage: File) => {
      const formData = new FormData();
      formData.append("file", profileImage);
      setIsLoading(true);
      const response = await uploadImage(formData);
      const imageUrl = `https://nqqsefrllkqytkwxfshk.supabase.co/storage/v1/object/public/${response.fullPath}`;
      setImgUrl(imageUrl);
      return imageUrl;
    },

    onError: () => {
      Report.failure("오류", "오류", "확인");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", userId] });
      setIsLoading(false);
    },
  });

  const handleSearchAddress = () => {
    setIsPostModalOpen((prev) => !prev);
  };

  const onCompleteAddress = (data: { address: string }) => {
    setAddress(data.address);
    setIsPostModalOpen(false);
  };

  const handleUploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (file) {
        const fileType = file.type;

        if (fileType !== "image/jpeg" && fileType !== "image/png") {
          Report.warning(
            "유효하지 않은 파일 형식",
            "JPG 또는 PNG 파일만 업로드 가능합니다.",
            "확인"
          );
          return;
        }

        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1000,
          useWebWorker: true,
        };

        const compressedFile = await imageCompression(file, options);

        setImgFile(compressedFile);
        uploadImageProfile(compressedFile);
      }
    }
  };

  const handleProfileUpdate = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newProfile = {
      nickname: nickname.trim() ? nickname : profile?.nickname,
      profile_image_url: !imgUrl ? profile?.profile_image_url : imgUrl,
      address: address || profile?.address,
      detail_address: !detailAddress ? profile?.detail_address : detailAddress,
    };

    const isEmpty = !imgFile && !detailAddress && !nickname && !address;

    if (isEmpty) {
      return Report.info("변경된 내용이 없습니다.", "", "확인");
    } else if (nickname === profile?.nickname) {
      return Report.info("변경된 내용이 없습니다.", "", "확인");
    }

    if (
      nickname !== profile?.nickname &&
      nickname.trim() === "" &&
      !imgFile &&
      !detailAddress &&
      !address
    ) {
      return Report.warning("닉네임 공백", "닉네임을 적어주세요!", "확인");
    }
    console.log(nickname);

    if (!profile?.nickname) {
      if (nickname.length < 2) {
        return Report.info(
          "닉네임 길이",
          "2글자 이상으로 작성해주세요",
          "확인"
        );
      } else if (nickname.length > 8) {
        return Report.info("닉네임 길이", "8글자 이하로 작성해주세요", "확인");
      }
    }
    editProfile(newProfile);
  };

  if (isPending) return <SkeletonProfile />;

  return (
    <div className="flex-col w-full md:w-auto grow md:px-0">
      <div className="flex flex-col justify-center md:items-start items-center ">
        <div className="flex flex-col gap-8 md:gap-0 items-center">
          <h5
            className="
        font-bold text-[12px] mt-8 md:mt-0 flex items-center justify-center border border-main-8 rounded-full w-[76px] h-[30px] text-main-8 
          md:border-none md:rounded-none md:text-left md:text-black md:text-[24px] md:w-[115px] md:h-[29px] md:block "
          >
            나의 정보
          </h5>
          <div className="flex-col justify-center items-center mb-8">
            <div className="w-full flex justify-center">
              {profile && (
                <Image
                  className="border border-gray-2 bg-gray-200 rounded-full md:hidden mb-4 w-[100px] h-[100px]"
                  src={imgUrl || profile?.profile_image_url}
                  alt={profile?.nickname}
                  width={100}
                  height={100}
                />
              )}
            </div>
            <div className="text-[16px] font-bold md:hidden text-center w-full h-[19px]">
              {profile?.nickname}
            </div>
          </div>
        </div>
        <form className="flex flex-col items-center w-full">
          <div className="flex flex-col md:flex-row w-full gap-4 md:gap-[32px]">
            <div className="w-full">
              <Input
                variant="default"
                label="닉네임"
                defaultValue={nickname || profile?.nickname || "혼살러"}
                name="nickname"
                onChange={onChangeInput}
              />
            </div>
            <div className="w-full">
              <Input
                variant="default"
                type="file"
                placeholder="사진변경"
                label="프로필 사진 변경"
                onChange={(e) => handleUploadImage(e)}
                ref={inputRef}
              />
            </div>
          </div>
          <div className="relative mt-11 md:mt-16 flex flex-col w-full">
            <button
              type="button"
              className="flex gap-3 w-fit py-2 px-4 border border-gray-3 bg-white font-bold rounded-full md:mb-3 mb-2 justify-center items-center"
              onClick={handleSearchAddress}
            >
              <span className="text-center md:text-[12px] text-[16px] text-gray-3">
                주소검색
              </span>
            </button>
            {isPostModalOpen && (
              <div className="absolute left-0 top-[48px] border border-black z-[999] ">
                <DaumPostcode onComplete={onCompleteAddress}></DaumPostcode>
              </div>
            )}
            <div className="flex flex-col gap-2">
              <Input
                variant="underline"
                value={address || profile?.address! || "OO시 OO구  OO동"}
                readOnly
              />
              <Input
                variant="underline"
                defaultValue={
                  detailAddress || profile?.detail_address || "OO호"
                }
                name="detailAddress"
                onChange={onChangeInput}
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-main-8 w-full md:w-[500px] h-[52px] text-white md:mt-[62px] mt-[46px] rounded-full font-bold text-[18px] mb-[146px]"
            onClick={handleProfileUpdate}
            disabled={isLoading}
          >
            {isLoading ? "잠시만 기다려주세요..." : "변경하기"}{" "}
          </button>
        </form>
      </div>
    </div>
  );
}

export default MyInformation;
