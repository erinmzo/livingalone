"use client";

import { insertMustImage, insertMustPost } from "@/apis/mustpost";
import InnerLayout from "@/components/common/Page/InnerLayout";
import { MustCategory, TNewMustPost } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { Notify } from "notiflix";
import React, { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import InputField from "./InputField";
import SelectCategory from "./SelectCategory";

import { useInputChange } from "@/hooks/useInput";
import { useAuthStore } from "@/zustand/authStore";
import { useCategoryStore } from "@/zustand/mustStore";
import { EditorProps } from "@toast-ui/react-editor";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { mustValidation } from "../common/MustValidation";

const EditorModule = dynamic(
  () => import("@/components/common/editor/EditorModule"),
  {
    ssr: false,
  }
);

function MustWriteForm() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const queryClient = useQueryClient();
  const selectedCategory = useCategoryStore((state) => state.selectedCategory);
  const maxImageSize = 2 * 1024 * 1024;

  const [imgUrl, setImgUrl] = useState<string>("");
  const editorRef = useRef<EditorProps>(null);
  const [selectedCategoryName, setSelectedCategoryName] =
    useState<string>("선택");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");

  const [error, setError] = useState({
    titleError: "",
    categoryError: "",
    itemNameError: "",
    companyError: "",
    priceError: "",
    imageUrlError: "",
  });

  const { values: input, handler: onChangeInput } = useInputChange({
    title: "",
    date: "",
    itemName: "",
    company: "",
    price: 0,
    content: "",
  });
  const { title, itemName, company, price } = input;

  const selectCategory = (category: MustCategory) => {
    setSelectedCategoryName(category.name);
    setSelectedCategoryId(category.id);
  };

  const { mutate: addMustPost } = useMutation({
    mutationFn: (newMustPost: TNewMustPost) => insertMustPost(newMustPost),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["mustPosts", selectedCategory],
      });
      router.push("/mustpost");
    },
  });

  const { mutate: addImage } = useMutation({
    mutationFn: async (newMustPostImage: any) => {
      const formData = new FormData();
      formData.append("file", newMustPostImage);
      const response = await insertMustImage(formData);
      setImgUrl(
        `https://nqqsefrllkqytkwxfshk.supabase.co/storage/v1/object/public/mustposts/${response.path}`
      );
    },
  });

  const addImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setError((prev) => ({
      ...prev,
      imageUrlError: "",
    }));

    if (e.target.files) {
      const newMustPostImage = e.target.files[0];

      if (newMustPostImage.size > maxImageSize) {
        Notify.failure("2MB 이하의 이미지로 업로드해주세요");
        return;
      }
      addImage(newMustPostImage);
    }
  };

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const startDate = `${year}-${month}-${day}` as string;

  const addMustPostBtn = async () => {
    const isValid = mustValidation(
      setError,
      title,
      selectedCategoryId,
      itemName,
      company,
      price,
      imgUrl
    );
    if (!isValid) {
      return;
    }
    if (!user) {
      router.push("/login");
      Notify.failure("로그인을 먼저 진행해주세요.");
      return;
    }

    if (editorRef.current) {
      const editorContent = editorRef.current.getInstance().getMarkdown();

      const newMustPost: TNewMustPost = {
        id: uuidv4(),
        user_id: user.id,
        title,
        category_id: selectedCategoryId,
        content: editorContent,
        img_url: imgUrl,
        item: itemName,
        location: company,
        price,
      };
      addMustPost(newMustPost);
    }
  };

  return (
    <InnerLayout>
      <div className="pb-[76px] md:pb-0">
        <form className="flex flex-col gap-3 md:gap-5 mt-[43px] md:mt-0">
          <InputField
            labelName="제목"
            name="title"
            type="text"
            value={title}
            placeHolder="제목을 입력해주세요"
            minLength={2}
            onchangeValue={onChangeInput}
            error={error.titleError}
          />
          {/* <p className={`text-red-3 text-[12px] mt-2`}>d에러메세지</p> */}

          <div className="flex flex-row justify-between gap-2">
            <SelectCategory
              selectCategory={selectCategory}
              initialCategoryName={selectedCategoryName}
              error={error.categoryError}
            />
            <div className="md:pl-[72px] flex-grow">
              <InputField
                labelName="작성일자"
                name="date"
                type="text"
                value={startDate}
                onchangeValue={onChangeInput}
              />
            </div>
          </div>

          <InputField
            labelName="상품이름"
            name="itemName"
            type="text"
            value={itemName}
            placeHolder="상품 이름을 입력해주세요."
            minLength={2}
            onchangeValue={onChangeInput}
            error={error.itemNameError}
          />

          <InputField
            labelName="제작업체"
            name="company"
            type="text"
            value={company}
            placeHolder="구매처를 입력해주세요."
            minLength={1}
            onchangeValue={onChangeInput}
            error={error.companyError}
          />

          <InputField
            labelName="판매가격"
            name="price"
            type="number"
            value={price || ""}
            placeHolder="0"
            minLength={2}
            maxLength={8}
            onchangeValue={onChangeInput}
            error={error.priceError}
          />
          <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-start">
            <input
              className="hidden"
              id="image-file"
              type="file"
              onChange={addImageHandler}
            />
            <label
              className="flex justify-center items-center ml-[72px] md:ml-[78px] px-7 py-[7px] border border-gray-4 bg-gray-1 font-bold text-[12px] text-gray-4 rounded-full cursor-pointer"
              htmlFor="image-file"
            >
              {imgUrl ? "이미지 수정" : "이미지 업로드"}
            </label>
            {error.imageUrlError && (
              <p className={`text-red-3 text-[12px] mt-2`}>
                {error.imageUrlError}
              </p>
            )}
            <div className="w-[44px] md:w-auto aspect-square ml-[72px] md:ml-0">
              {imgUrl && (
                <Image
                  src={imgUrl}
                  alt="포스팅한 이미지"
                  width={200}
                  height={200}
                />
              )}
            </div>
          </div>
          <div className="mb-[22px] md:mb-[58px]">
            <EditorModule editorRef={editorRef} />
          </div>
        </form>
        <div className="flex justify-center pb-[123px] md:pb-0 mt-[18px] md:mt-[6px]">
          <button
            onClick={addMustPostBtn}
            className="px-[106px] py-[8px] text-xl text-white font-bold focus:outline-none bg-main-8 rounded-full"
          >
            등록하기
          </button>
        </div>
      </div>
    </InnerLayout>
  );
}

export default MustWriteForm;
