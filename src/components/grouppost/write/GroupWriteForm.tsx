"use client";

import { insertGroupImage, insertGroupPost } from "@/apis/grouppost";
import InnerLayout from "@/components/common/Page/InnerLayout";
import { useInputChange } from "@/hooks/useInput";
import { TNewGroupPost } from "@/types/types";
import { useAuthStore } from "@/zustand/authStore";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Notify } from "notiflix";
import React, { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import {
  colorSyntaxOptions,
  toolbarItems,
} from "@/components/common/editor/EditorModule";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import "tui-color-picker/dist/tui-color-picker.css";

function GroupWriteForm() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  const [imgUrl, setImgUrl] = useState<string>("");
  const editorRef = useRef<Editor | null>(null);

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
    if (e.target.files) {
      const newGroupImage = e.target.files[0];
      addImageMutation.mutate(newGroupImage);
    }
  };

  const addMutation = useMutation({
    mutationFn: async (newGroupPost: TNewGroupPost) => {
      await insertGroupPost(newGroupPost);
    },
    onSuccess: () => {
      router.push("/grouppost");
    },
  });

  const addGroupPostHandler = async () => {
    if (!title.trim() || !endDate.trim() || !imgUrl.trim() || !item.trim()) {
      Notify.failure("관련 링크를 제외한 모든 값을 입력해주세요.");
      return;
    }
    if (peopleNum > 30) {
      Notify.failure("최대 공구 인원은 30명까지입니다.");
      return;
    }
    if (peopleNum <= 0) {
      Notify.failure("최소 공구 인원은 1명입니다.");
      return;
    }
    if (!user) {
      return;
    }

    if (!editorRef.current) return Notify.failure("모든 항목을 입력해주세요");

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
      <div className="flex flex-col gap-5">
        <div className="flex gap-2">
          <label className="w-[86px] text-[18px] text-gray-4 flex-none">
            제목
          </label>
          <input
            name="title"
            placeholder="제목을 입력하세요."
            value={title}
            onChange={onChangeInput}
            className="border-b-[1px] w-full border-gray-3 py-2 px-[2px]"
          />
        </div>
        <div className="flex gap-[41px]">
          <div className="flex gap-2 items-center">
            <label className="w-[86px] text-[18px] text-gray-4 flex-none">
              공구기간
            </label>
            <div className=" flex gap-1 items-center">
              <label className="text-[12px]">마감일</label>
              <input
                name="endDate"
                type="date"
                value={endDate}
                onChange={onChangeInput}
                className="border-b-[1px] border-gray-3 py-2 px-[2px]"
              />
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <label className="w-[78px] text-[18px] text-gray-4 flex-none">
              공구인원
            </label>
            <input
              name="peopleNum"
              type="number"
              placeholder="숫자만 입력해주세요."
              value={peopleNum}
              onChange={onChangeInput}
              className="w-[64px] border-b border-gray-3 text-center py-2 px-[2px]"
            />
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <label className="w-[86px] text-[18px] text-gray-4 flex-none">
            상품이름
          </label>
          <input
            name="item"
            placeholder="제품명을 입력하세요."
            value={item}
            onChange={onChangeInput}
            className="border-b-[1px] w-full border-gray-3 py-2 px-[2px]"
          />
        </div>

        <div className="flex gap-2 items-center">
          <label className="w-[86px] text-[18px] text-gray-4 flex-none">
            공구가격
          </label>
          <input
            name="price"
            type="number"
            placeholder="숫자만 입력해주세요."
            value={price}
            onChange={onChangeInput}
            className="border-b-[1px] w-full border-gray-3 py-2 px-[2px]"
          />
        </div>
        <div className="flex gap-2 items-center">
          <label className="w-[80px] text-[18px] text-gray-4 flex-none">
            상품링크
          </label>
          <input
            name="link"
            placeholder="(선택사항) 상품소개 페이지 링크를 넣어주세요."
            value={link}
            onChange={onChangeInput}
            className="border-b-[1px] w-full border-gray-3 py-2 px-[2px]"
          />
        </div>
        <div className="flex gap-5 items-start">
          <input
            className="hidden"
            id="image-file"
            type="file"
            onChange={addImageHandler}
          />
          <label
            className="ml-[82px] py-2 cursor-pointer text-[12px] text-gray-4 font-bold rounded-full w-[120px] flex justify-center items-center bg-[#C2C2C2]"
            htmlFor="image-file"
          >
            {imgUrl ? "이미지 수정" : "이미지 업로드"}
          </label>
          {imgUrl && (
            <Image src={imgUrl} alt="선택한 이미지" width={200} height={200} />
          )}
        </div>
      </div>
      <div className="mt-[14px]">
        <Editor
          initialValue=" "
          placeholder="※여기에 글을 작성해주세요."
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
      <div className="flex justify-center">
        <button
          className="bg-main-8 w-[300px] py-[10px] text-white rounded-full font-bold text-[20px] mt-[64px]"
          onClick={addGroupPostHandler}
        >
          포스팅 하기
        </button>
      </div>
    </InnerLayout>
  );
}

export default GroupWriteForm;
