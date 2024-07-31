"use client";
import { getMustPost, insertMustImage, updateMustPost } from "@/apis/mustpost";
import InnerLayout from "@/components/common/Page/InnerLayout";
import { useInputChange } from "@/hooks/useInput";
import { MustCategory, MustPost, TNewMustPost } from "@/types/types";
import { postRevalidate } from "@/utils/revalidate";
import { useAuthStore } from "@/zustand/authStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { EditorProps } from "@toast-ui/react-editor";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Notify } from "notiflix";
import React, { useCallback, useEffect, useRef, useState } from "react";
import InputField from "../write/InputField";
import SelectCategory from "../write/SelectCategory";

const EditorModule = dynamic(
  () => import("@/components/common/editor/EditorModule"),
  {
    ssr: false,
  }
);

type TMustPost = MustPost & {
  must_categories: { id: string; name: string };
};

function MustEditForm({ params }: { params: { id: string } }) {
  const { id } = params;
  const user = useAuthStore((state) => state.user);
  const userId = user?.id;
  const router = useRouter();
  const maxImageSize = 1 * 1024 * 1024;

  const editorRef = useRef<EditorProps>(null);

  const [imgUrl, setImgUrl] = useState<string>("");
  console.log(imgUrl);
  const [selectedCategoryName, setSelectedCategoryName] =
    useState<string>("선택");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");

  const {
    values: input,
    handler: onChangeInput,
    setValueInit,
  } = useInputChange({
    title: "",
    itemName: "",
    company: "",
    price: 0,
  });
  const { title, itemName, company, price } = input;

  const {
    data: mustPost,
    isPending,
    isError,
  } = useQuery<TMustPost>({
    queryKey: ["editMustPost", id],
    queryFn: () => getMustPost(id),
  });

  useEffect(() => {
    if (mustPost) {
      setValueInit({
        title: mustPost.title,
        itemName: mustPost.item,
        company: mustPost.location,
        price: mustPost.price,
      });
      setSelectedCategoryName(mustPost.must_categories.name);
      setSelectedCategoryId(mustPost.must_categories.id);
      setImgUrl(mustPost.img_url);
    }
  }, [mustPost]);

  const selectCategory = useCallback((category: MustCategory) => {
    setSelectedCategoryName(category.name);
    setSelectedCategoryId(category.id);
  }, []);

  const { mutate: addImage } = useMutation({
    mutationFn: async (newMustPostImage: any) => {
      const formData = new FormData();
      formData.append("file", newMustPostImage);
      const response = await insertMustImage(formData);
      console.log("response:", response);
      setImgUrl(
        `https://nqqsefrllkqytkwxfshk.supabase.co/storage/v1/object/public/mustposts/${response.path}`
      );
    },
  });

  const addImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      const newMustPostImage = e.target.files[0];

      if (newMustPostImage.size > maxImageSize) {
        Notify.failure("1MB 이하의 이미지로 업로드해주세요");
        return;
      }
      addImage(newMustPostImage);
    }
  };

  const { mutate: updateMutation } = useMutation({
    mutationFn: (newMustPost: TNewMustPost) => updateMustPost(newMustPost),
    onSuccess: () => {
      postRevalidate(`/mustpost/read/${id}`);
      router.push(`/mustpost/read/${id}`);
      router.refresh();
    },
  });

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const startDate = `${year}-${month}-${day}` as string;

  const addMustPostBtn = () => {
    if (
      !title.trim() ||
      !selectedCategoryId ||
      !itemName.trim() ||
      !company.trim()
    ) {
      Notify.failure("모든 항목을 입력해주세요");
      return;
    }
    if (!userId) {
      return;
    }

    if (!editorRef.current) return Notify.failure("모든 항목을 입력해주세요");

    if (editorRef.current) {
      const editorContent = editorRef.current.getInstance().getMarkdown();
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
      };
      updateMutation(newMustPost);
    }
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
      <form className="flex flex-col gap-5">
        <InputField
          labelName="제목"
          name="title"
          type="text"
          value={title}
          placeHolder="제목을 입력해주세요"
          minLength={2}
          onchangeValue={onChangeInput}
        />

        <div className="flex flex-row justify-between gap-2">
          <SelectCategory
            selectCategory={selectCategory}
            initialCategoryName={selectedCategoryName}
          />
          <div className="pl-[72px] flex-grow">
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
        />

        <InputField
          labelName="제작업체"
          name="company"
          type="text"
          value={company}
          placeHolder="구매처룰 입력해주세요."
          minLength={1}
          onchangeValue={onChangeInput}
        />

        <InputField
          labelName="판매가격"
          name="price"
          type="number"
          value={price}
          placeHolder="숫자만 입력해주세요"
          minLength={2}
          onchangeValue={onChangeInput}
        />
        <div className="flex gap-4 items-start">
          <input
            className="hidden"
            id="image-file"
            type="file"
            onChange={addImageHandler}
          />
          <label
            className="flex justify-center items-center ml-[78px] px-7 py-2 border border-gray-4 bg-gray-1 font-bold text-[12px] text-gray-4 rounded-full cursor-pointer"
            htmlFor="image-file"
          >
            {imgUrl ? "이미지 수정" : "이미지 업로드"}
          </label>
          {imgUrl && (
            <Image
              src={imgUrl}
              alt="포스팅한 이미지"
              width={200}
              height={200}
            />
          )}
        </div>
        <div>
          <EditorModule editorRef={editorRef} initialValue={mustPost.content} />
        </div>
      </form>
      <div className="flex justify-center mt-[64px]">
        <button
          onClick={addMustPostBtn}
          className="px-[96px] py-4 text-[24px] text-white font-bold focus:outline-none bg-main-8 rounded-full"
        >
          수정 완료
        </button>
      </div>
    </InnerLayout>
  );
}

export default MustEditForm;
