"use client";

import { insertGroupImage, insertGroupPost } from "@/apis/grouppost";
import InnerLayout from "@/components/common/Page/InnerLayout";
import InputField from "@/components/common/input/InputField";
import { useInputChange } from "@/hooks/useInput";
import { TNewGroupPost } from "@/types/types";
import { useAuthStore } from "@/zustand/authStore";
import { useMutation } from "@tanstack/react-query";
import { EditorProps } from "@toast-ui/react-editor";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Notify } from "notiflix";
import React, { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import GroupPostNotice from "../common/GroupPostNotice";
import { groupValidation } from "../common/GroupValidation";

import imageCompression from "browser-image-compression";

const EditorModule = dynamic(
  () => import("@/components/common/editor/EditorModule"),
  {
    ssr: false,
  }
);

function GroupWriteForm() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const [checkBox, setCheckBox] = useState(false);
  const [isDebouncing, setIsDebouncing] = useState(false);
  const [error, setError] = useState({
    titleError: "",
    endDateError: "",
    peopleNumError: "",
    itemError: "",
    priceError: "",
    imageUrlError: "",
  });

  const [imgUrl, setImgUrl] = useState<string>("");
  const editorRef = useRef<EditorProps>(null);

  const { values: input, handler: onChangeInput } = useInputChange({
    title: "",
    endDate: "",
    content: "",
    item: "",
    link: "",
    peopleNum: 0,
    price: 0,
  });
  const { title, endDate, content, item, link, peopleNum, price } = input;

  const addImageMutation = useMutation({
    mutationFn: async (newGroupImage: any) => {
      const formData = new FormData();
      formData.append("file", newGroupImage);
      const response = await insertGroupImage(formData);
      setImgUrl(
        `https://nqqsefrllkqytkwxfshk.supabase.co/storage/v1/object/public/groupposts/${response.path}`
      );
    },
  });

  const addImageHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setError((prev) => ({
      ...prev,
      imageUrlError: "",
    }));
    if (e.target.files) {
      const newGroupImage = e.target.files[0];
      const fileType = newGroupImage.type;

      if (newGroupImage && !fileType.includes("image")) {
        Notify.failure("이미지 파일만 업로드 해주세요");
        return;
      }

      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1000,
        useWebWorker: true,
      };

      const compressedFile = await imageCompression(newGroupImage, options);

      addImageMutation.mutate(compressedFile);
    }
  };

  const addMutation = useMutation({
    mutationFn: async (newGroupPost: TNewGroupPost) => {
      await insertGroupPost(newGroupPost);
    },
    onSuccess: () => {
      Notify.success("공구템 등록이 완료되었습니다!");
      router.push("/grouppost");
      setIsDebouncing(false);
    },
    onError: () => {
      setIsDebouncing(false);
    },
  });

  const addGroupPostHandler = async () => {
    if (isDebouncing) {
      return;
    }

    const isValid = groupValidation(
      setError,
      title,
      endDate,
      peopleNum,
      item,
      price,
      imgUrl
    );
    if (!isValid) {
      return;
    }
    if (!user) {
      return;
    }

    if (!editorRef.current) return Notify.failure("모든 항목을 입력해주세요");
    if (!checkBox) {
      Notify.failure("체크박스를 체크해주세요.");
      return;
    }
    setIsDebouncing(true);

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const startDate = `${year}-${month}-${day}`;

    if (editorRef.current) {
      const editorContent = editorRef.current.getInstance().getMarkdown();
      const newGroupPost: TNewGroupPost = {
        id: uuidv4(),
        user_id: user.id,
        title,
        start_date: startDate,
        end_date: endDate,
        people_num: +peopleNum,
        price,
        content: editorContent,
        item,
        link,
        img_url: imgUrl,
        is_finished: false,
      };

      addMutation.mutate(newGroupPost);
    }
  };

  return (
    <InnerLayout>
      <GroupPostNotice checkBox={checkBox} setCheckBox={setCheckBox} />

      <div className="flex flex-col gap-3 md:gap-5">
        <InputField
          labelName="제목"
          name="title"
          type="text"
          value={title}
          placeHolder="제목을 입력해주세요"
          minLength={1}
          onchangeValue={onChangeInput}
          error={error.titleError}
        />
        <div className="flex gap-2 md:gap-[41px]">
          <div className="flex gap-[2px]">
            <label
              htmlFor="endDate"
              className="hidden md:flex flex-0 w-[70px] md:w-[78px] h-[38px] items-center md:text-[18px] text-gray-4"
            >
              공구기간
            </label>
            <label className="flex md:hidden flex-0 w-[70px] md:w-[78px] h-[38px] items-center md:text-[18px] text-gray-4">
              마감일
            </label>
            <div className="flex gap-2">
              <label className="hidden h-[38px] md:flex items-center text-[14px] text-black">
                마감일
              </label>
              <div>
                <input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={endDate}
                  onChange={onChangeInput}
                  className="rounded-none border-b-[1px] border-gray-3 py-2 px-[2px] md:text-[18px] font-bold text-black outline-none"
                />
                {error.endDateError && (
                  <p className={`text-red-3 text-[12px] mt-2`}>
                    {error.endDateError}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-2 overflow-hidden">
            <label
              htmlFor="peopleNum"
              className="flex-0 shrink-0 w-[70px] md:w-[78px] h-[38px] flex items-center md:text-[18px] text-gray-4"
            >
              공구인원
            </label>
            <div>
              <input
                id="peopleNum"
                name="peopleNum"
                type="number"
                placeholder="숫자만 입력해주세요."
                value={peopleNum}
                onChange={onChangeInput}
                className="rounded-none w-auto max-w-[83px] md:w-[100px] pl-[2px] px-[2px] py-2 border-b border-gray-3 md:text-[18px] font-bold text-black outline-none"
              />
              {error.peopleNumError && (
                <p className={`text-red-3 text-[12px] mt-2`}>
                  {error.peopleNumError}
                </p>
              )}
            </div>
          </div>
        </div>

        <InputField
          labelName="상품이름"
          name="item"
          type="text"
          value={item}
          placeHolder="제품명을 입력해주세요."
          minLength={1}
          onchangeValue={onChangeInput}
          error={error.itemError}
        />
        <InputField
          labelName="공구가격"
          name="price"
          type="number"
          value={price}
          placeHolder="숫자만 입력해주세요."
          minLength={1}
          onchangeValue={onChangeInput}
          error={error.priceError}
        />
        <InputField
          labelName="상품링크"
          name="link"
          type="text"
          value={link}
          placeHolder="(선택사항) 상품소개 페이지 링크를 넣어주세요."
          minLength={1}
          onchangeValue={onChangeInput}
        />
        <div className="ml-[70px] md:ml-[78px] flex flex-col md:flex-row gap-2 md:gap-4 items-start mb-[6px]">
          <input
            className="hidden"
            id="image-file"
            type="file"
            onChange={addImageHandler}
          />
          <label
            className="flex justify-center items-center px-7 py-[7px] border border-gray-4 bg-gray-1 font-bold text-[12px] text-gray-4 rounded-full cursor-pointer"
            htmlFor="image-file"
          >
            {imgUrl ? "이미지 수정" : "이미지 업로드"}
          </label>
          {error.imageUrlError && (
            <p className={`text-red-3 text-[12px] mt-2`}>
              {error.imageUrlError}
            </p>
          )}
          {imgUrl && (
            <Image
              src={imgUrl}
              alt="선택한 이미지"
              width={200}
              height={200}
              className="border md:border-none rounded-[4px] md:rounded-none border-gray-3 w-[44px] h-[44px] md:w-[200px] md:h-auto object-cover"
            />
          )}
        </div>
      </div>
      <div className="mt-[14px]">
        <EditorModule editorRef={editorRef} />
      </div>
      <div className="flex justify-center pb-[123px] md:pb-[250px] lg:pb-0">
        <button
          className="bg-main-8 w-full md:w-[300px] py-[10px] text-white rounded-full font-bold text-[20px] mt-6 md:mt-[64px]"
          onClick={addGroupPostHandler}
        >
          등록하기
        </button>
      </div>
    </InnerLayout>
  );
}

export default GroupWriteForm;
