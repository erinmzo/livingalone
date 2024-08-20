"use client";
import { getMustPost, insertMustImage, updateMustPost } from "@/apis/mustpost";
import InnerLayout from "@/components/common/Page/InnerLayout";
import EditorModule from "@/components/common/editor/EditorModule";
import { useInputChange } from "@/hooks/useInput";
import { MustCategory, MustPost, TNewMustPost } from "@/types/types";
import { postRevalidate } from "@/utils/revalidate";
import { useAuthStore } from "@/zustand/authStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { EditorProps } from "@toast-ui/react-editor";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Notify } from "notiflix";
import React, { useCallback, useEffect, useRef, useState } from "react";
import InputField from "../../common/input/InputField";
import { mustValidation } from "../common/MustValidation";
import SelectCategory from "../write/SelectCategory";

import imageCompression from "browser-image-compression";

type TMustPost = MustPost & {
  must_categories: { id: string; name: string };
};

function MustEditForm({ params }: { params: { id: string } }) {
  const { id } = params;
  const user = useAuthStore((state) => state.user);
  const userId = user?.id;
  const router = useRouter();

  const editorRef = useRef<EditorProps>(null);
  const throttleRef = useRef(false);

  const [imgUrl, setImgUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

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

  const {
    values: input,
    handler: onChangeInput,
    setValueInit,
  } = useInputChange({
    title: "",
    itemName: "",
    company: "",
    price: 0,
    link: "",
  });
  const { title, itemName, company, price, link } = input;

  const {
    data: mustPost,
    isPending,
    isError,
  } = useQuery<TMustPost>({
    queryKey: ["editMustPost", id],
    queryFn: () => getMustPost(id),
  });

  useEffect(() => {
    if (mustPost && editorRef.current) {
      setValueInit({
        title: mustPost.title,
        itemName: mustPost.item,
        company: mustPost.location,
        price: mustPost.price,
        link: mustPost.link || "",
      });
      setSelectedCategoryName(mustPost.must_categories.name);
      setSelectedCategoryId(mustPost.must_categories.id);
      setImgUrl(mustPost.img_url);

      editorRef.current.getInstance().setMarkdown(mustPost.content);
    }
  }, [mustPost, editorRef.current]);

  const selectCategory = useCallback((category: MustCategory) => {
    setSelectedCategoryName(category.name);
    setSelectedCategoryId(category.id);
  }, []);

  const { mutate: addImage } = useMutation({
    mutationFn: async (newMustPostImage: File) => {
      const formData = new FormData();
      formData.append("file", newMustPostImage);

      setLoading(true);
      const response = await insertMustImage(formData);
      setImgUrl(
        `https://nqqsefrllkqytkwxfshk.supabase.co/storage/v1/object/public/mustposts/${response.path}`
      );
      setLoading(false);
    },
  });

  const addImageHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      const newMustPostImage = e.target.files[0];
      const fileType = newMustPostImage.type;

      if (!fileType.includes("image")) {
        Notify.failure("이미지 파일만 업로드 해주세요");
        return;
      }

      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1000,
        useWebWorker: true,
      };

      const compressedFile = await imageCompression(newMustPostImage, options);

      addImage(compressedFile);
    }
  };

  const { mutate: updateMutation } = useMutation({
    mutationFn: (newMustPost: TNewMustPost) => updateMustPost(newMustPost),
    onSuccess: () => {
      postRevalidate(`/mustpost/read/${id}`);
      router.push(`/mustpost/read/${id}`);
      router.refresh();
      Notify.success("게시물 수정이 완료되었습니다.");
    },
  });

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const startDate = `${year}-${month}-${day}` as string;

  const addMustPostBtn = () => {
    if (throttleRef.current) return;
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

    if (!userId) {
      router.push("/login");
      Notify.failure("로그인을 먼저 진행해주세요.");
      return;
    }

    if (editorRef.current) {
      const editorContent = editorRef.current.getInstance().getMarkdown();

      if (!editorContent) return Notify.failure("모든 항목을 입력해주세요");
      throttleRef.current = true;
      const newMustPost: TNewMustPost = {
        id,
        user_id: userId,
        title,
        category_id: selectedCategoryId,
        content: editorContent,
        img_url: imgUrl,
        item: itemName,
        location: company,
        price,
        link,
      };
      updateMutation(newMustPost);
    }
    setTimeout(() => {
      throttleRef.current = false;
    }, 5000);
  };

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
    return (
      <div className="flex justify-center items-center">
        오류가 발생하였습니다!...
      </div>
    );

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
            onchangeValue={onChangeInput}
            error={error.titleError}
          />

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
            onchangeValue={onChangeInput}
            error={error.itemNameError}
          />

          <InputField
            labelName="제작업체"
            name="company"
            type="text"
            value={company}
            placeHolder="구매처를 입력해주세요."
            onchangeValue={onChangeInput}
            error={error.companyError}
          />

          <InputField
            labelName="판매가격"
            name="price"
            type="number"
            value={price}
            placeHolder="숫자만 입력해주세요"
            onchangeValue={onChangeInput}
            error={error.priceError}
          />

          <InputField
            labelName="상품링크"
            name="link"
            type="text"
            value={link || ""}
            placeHolder="(선택사항) 상품소개 페이지 링크를 넣어주세요."
            onchangeValue={onChangeInput}
          />

          <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-start">
            <input
              className="hidden"
              id="image-file"
              type="file"
              accept="image/*"
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
            <div className="w-[44px] md:w-auto aspect-square ml-[72px] md:ml-0 rounded-[4px]">
              <div className="relative">
                {loading && (
                  <div className="absolute inset-0 m-auto top flex justify-center items-center">
                    <Image
                      src="/img/loading-spinner-transparent.svg"
                      alt="로딩중"
                      width={150}
                      height={150}
                    />
                  </div>
                )}
                {imgUrl && (
                  <Image
                    src={imgUrl}
                    alt="포스팅한 이미지"
                    width={200}
                    height={200}
                    className="border border-gray-3 rounded-[4px]"
                  />
                )}
              </div>
            </div>
          </div>
          <div>
            <EditorModule editorRef={editorRef} />
          </div>
        </form>
        <div className="flex justify-center pb-[123px] md:pb-0 mt-[40px] md:mt-[64px]">
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

export default MustEditForm;
