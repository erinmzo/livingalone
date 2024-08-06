"use client";

import { editMyProfile, getMyProfile, uploadImage } from "@/apis/mypage";
import { useInputChange } from "@/hooks/useInput";
import { Profile, TProfile } from "@/types/types";
import { useAuthStore } from "@/zustand/authStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Report } from "notiflix";
import { ChangeEvent, MouseEventHandler, useState } from "react";
import DaumPostcode from "react-daum-postcode";
import Input from "../../common/Input";
import SkeletonProfile from "./SkeletonProfile";

function MyInformation() {
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);
  const userId = user?.id as string;

  const [isPostModalOpen, setIsPostModalOpen] = useState<boolean>(false);
  const [address, setAddress] = useState<string>("");
  const [imgFile, setImgFile] = useState<any>();
  const [imgUrl, setImgUrl] = useState<string>("");

  const { values: input, handler: onChangeInput } = useInputChange({
    nickname: "",
    detailAddress: "",
  });

  const { nickname, detailAddress } = input;

  const { data: profile, isPending } = useQuery<Profile>({
    queryKey: ["profile", userId],
    queryFn: () => getMyProfile(userId),
    enabled: !!user,
  });

  const { mutate: editProfile } = useMutation({
    mutationFn: (newProfile: TProfile) => editMyProfile(userId, newProfile),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["profile", userId] }),
  });
  // 이미지
  const { mutate: uploadImageProfile } = useMutation({
    mutationFn: async (profileImage: File) => {
      const formData = new FormData();
      formData.append("file", profileImage);
      const response = await uploadImage(formData);
      setImgUrl(
        `https://nqqsefrllkqytkwxfshk.supabase.co/storage/v1/object/public/${response.fullPath}`
      );
      return `https://nqqsefrllkqytkwxfshk.supabase.co/storage/v1/object/public/${response.fullPath}`;
    },
    onMutate: async (profileImage: File) => {
      await queryClient.cancelQueries({ queryKey: ["profile", userId] });

      const previousProfile = queryClient.getQueryData<Profile>([
        "profile",
        userId,
      ]);

      if (previousProfile) {
        queryClient.setQueryData(["profile", userId], {
          ...previousProfile,
          profile_image_url: `https://nqqsefrllkqytkwxfshk.supabase.co/storage/v1/object/public/${profileImage}`,
        });
      }

      return { previousProfile };
    },
    onError: (err, profileImage, context) => {
      if (context?.previousProfile) {
        queryClient.setQueryData(["profile", userId], context.previousProfile);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", userId] });
    },
  });

  const handleSearchAddress = () => {
    setIsPostModalOpen((prev) => !prev);
  };

  const onCompleteAddress = (data: { address: string }) => {
    setAddress(data.address);
    setIsPostModalOpen(false);
  };

  const handleUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImgFile(e.target.files[0]);
      uploadImageProfile(e.target.files[0]);
    }
  };

  const handleProfileUpdate: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    const newProfile = {
      nickname: nickname || profile?.nickname,
      profile_image_url: imgUrl || profile?.profile_image_url,
      address: address || profile?.address,
      detail_address: detailAddress || profile?.detail_address,
    };

    const isChanged = !!nickname || !!imgFile || !!address || !!detailAddress;

    if (!isChanged) {
      Report.info("변경된 내용이 없습니다.", "", "확인");
      return;
    }

    if (!nickname.trim()) {
      return Report.warning("닉네임 공백", "닉네임을 적어주세요 !", "확인");
    } else if (nickname.length > 8) {
      return Report.warning("닉네임 길이", "8자 이하로 적어주세요", "확인");
    }

    editProfile(newProfile);
    Report.success("변경이 완료되었습니다!", "", "확인");
  };

  if (isPending) return <SkeletonProfile />;

  return (
    <div className="flex-col w-auto grow">
      <div className="flex flex-col justify-center items-start gap-8">
        <h5 className="font-bold text-[24px]">나의 정보</h5>
        <form className="flex flex-col items-center">
          <div className="flex w-full gap-[32px]">
            <div className="w-full">
              <Input
                variant="default"
                label="닉네임"
                placeholder={profile?.nickname}
                value={nickname}
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
              />
            </div>
          </div>
          <div className="relative mt-16 flex flex-col w-full">
            <button
              type="button"
              className="flex gap-3 w-[73px] py-2 border border-gray-3 bg-white font-bold rounded-full mb-3 justify-center items-center "
              onClick={handleSearchAddress}
            >
              <span className=" text-center text-[12px] text-gray-3">
                주소변경
              </span>
            </button>
            {isPostModalOpen && (
              <div className="absolute left-0 top-[48px] border border-black  ">
                <DaumPostcode onComplete={onCompleteAddress}></DaumPostcode>
              </div>
            )}
            <div className="flex flex-col gap-2 ">
              <Input
                variant="underline"
                value={address}
                onChange={() => {}}
                placeholder={profile?.address!}
              />
              <Input
                variant="underline"
                value={detailAddress}
                name="detailAddress"
                onChange={onChangeInput}
                placeholder={profile?.detail_address!}
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-main-8 w-[500px] h-[52px] text-white  py-2 mt-[50px] rounded-full font-bold text-[18px]"
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