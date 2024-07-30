"use client";
import { getMustPost, insertMustImage, updateMustPost } from "@/apis/mustpost";
import InnerLayout from "@/components/common/Page/InnerLayout";
import { useInputChange } from "@/hooks/useInput";
import { MustCategory, MustPost, TNewMustPost } from "@/types/types";
import { postRevalidate } from "@/utils/revalidate";
import { useAuthStore } from "@/zustand/authStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Notify } from "notiflix";
import React, { useCallback, useEffect, useRef, useState } from "react";
import InputField from "../write/InputField";
import SelectCategory from "../write/SelectCategory";

import {
  colorSyntaxOptions,
  toolbarItems,
} from "@/components/common/editor/EditorModule";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import "tui-color-picker/dist/tui-color-picker.css";

type TMustPost = MustPost & {
  must_categories: { id: string; name: string };
};

function MustEditForm({ params }: { params: { id: string } }) {
  const { id } = params;
  const user = useAuthStore((state) => state.user);
  const userId = user?.id;
  const router = useRouter();

  const editorRef = useRef<Editor | null>(null);

  const [imgUrl, setImgUrl] = useState<string>("");
  console.log(imgUrl);
  const [selectedCategoryName, setSelectedCategoryName] =
    useState<string>("카테고리 선택");
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
    onError: (error) => {
      console.error("Image error:", error); // 에러 발생 시 로그
    },
    onSuccess: () => {
      console.log("Image successful, imgUrl:", imgUrl); // 성공 시 상태 확인용 로그
    },
  });

  const addImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      const newMustPostImage = e.target.files[0];
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
    return <div className="flex justify-center items-center">로딩중...</div>;

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
          <div className="pr-[72px] flex-grow">
            <InputField
              labelName="작성일자"
              name="date"
              type="text"
              value={startDate}
              onchangeValue={onChangeInput}
            />
          </div>
          <SelectCategory
            selectCategory={selectCategory}
            initialCategoryName={selectedCategoryName}
          />
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
        <div className="flex gap-5 items-start">
          <input
            className="hidden"
            id="image-file"
            type="file"
            onChange={addImageHandler}
          />
          <label
            className="py-4 cursor-pointer font-bold rounded-full w-[160px] flex justify-center items-center bg-[#C2C2C2]"
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
        {/* <InputField labelName="이미지" type="file" onchangeValue={addImageHandler} />
        {imgUrl && <Image src={imgUrl} alt="포스팅한 이미지" width={200} height={200} />} */}
        <div>
          <Editor
            initialValue={mustPost.content}
            placeholder="여기에 글을 작성해주세요."
            previewStyle="tab"
            height="400px"
            initialEditType="wysiwyg"
            useCommandShortcut={true}
            ref={editorRef}
            plugins={[[colorSyntax, colorSyntaxOptions]]}
            toolbarItems={toolbarItems}
            usageStatistics={false} // 통계 수집 거부
          />
        </div>
      </form>
      <div className="flex justify-center">
        <button
          onClick={addMustPostBtn}
          className="w-[400px] py-5 text-[26px] text-white font-bold px-4 focus:outline-none bg-black hover:bg-slate-800 rounded-full"
        >
          수정 완료
        </button>
      </div>
    </InnerLayout>
  );
}

export default MustEditForm;
