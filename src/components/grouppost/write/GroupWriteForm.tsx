"use client";

import { insertGroupImage, insertGroupPost } from "@/apis/grouppost";
import InnerLayout from "@/components/common/Page/InnerLayout";
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

const EditorModule = dynamic(() => import("@/components/common/editor/EditorModule"), {
  ssr: false,
});

function GroupWriteForm() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

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
      setImgUrl(`https://nqqsefrllkqytkwxfshk.supabase.co/storage/v1/object/public/groupposts/${response.path}`);
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
        <div className="flex items-center gap-[2px]">
          <label className="flex-0 w-[78px] text-[18px] text-gray-3">제목</label>
          <input
            name="title"
            placeholder="제목을 입력하세요."
            value={title}
            onChange={onChangeInput}
            className="flex-1 pl-[2px] px-[2px] py-[5px] border-b-[1px] border-gray-3 font-bold text-[18px] text-black leading-normal  placeholder:text-gray-2 outline-none"
          />
        </div>
        <div className="flex gap-[41px]">
          <div className="flex items-center gap-[2px]">
            <label className="flex-0 w-[78px] text-[18px] text-gray-3">공구기간</label>
            <div className="flex gap-2 items-center">
              <label className="text-[14px] text-black">마감일</label>
              <input
                name="endDate"
                type="date"
                value={endDate}
                onChange={onChangeInput}
                className="border-b-[1px] border-gray-3 py-2 px-[2px] text-[18px] font-bold text-black outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label className="flex-0 w-[78px] text-[18px] text-gray-3">공구인원</label>
            <input
              name="peopleNum"
              type="number"
              placeholder="숫자만 입력해주세요."
              value={peopleNum}
              onChange={onChangeInput}
              className="w-[100px] pl-[2px] px-[2px] py-2 border-b border-gray-3 text-[18px] font-bold text-black outline-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-[2px]">
          <label className="flex-0 w-[78px] text-[18px] text-gray-3">상품이름</label>
          <input
            name="item"
            placeholder="제품명을 입력하세요."
            value={item}
            onChange={onChangeInput}
            className="flex-1 pl-[2px] px-[2px] py-[5px] border-b-[1px] border-gray-3 font-bold text-[18px] text-black leading-normal placeholder:text-gray-2 outline-none"
          />
        </div>

        <div className="flex items-center gap-[2px]">
          <label className="flex-0 w-[78px] text-[18px] text-gray-3">공구가격</label>
          <input
            name="price"
            type="number"
            placeholder="숫자만 입력해주세요."
            value={price}
            onChange={onChangeInput}
            className="flex-1 pl-[2px] px-[2px] py-[5px] border-b-[1px] border-gray-3 font-bold text-[18px] text-black leading-normal placeholder:text-gray-2 outline-none"
          />
        </div>
        <div className="flex items-center gap-[2px]">
          <label className="flex-0 w-[78px] text-[18px] text-gray-3">상품링크</label>
          <input
            name="link"
            placeholder="(선택사항) 상품소개 페이지 링크를 넣어주세요."
            value={link}
            onChange={onChangeInput}
            className="flex-1 pl-[2px] px-[2px] py-[5px] border-b-[1px] border-gray-3 font-bold text-[18px] text-black leading-normal placeholder:text-gray-2 outline-none"
          />
        </div>
        <div className="flex gap-4 items-start mb-[6px]">
          <input className="hidden" id="image-file" type="file" onChange={addImageHandler} />
          <label
            className="flex justify-center items-center ml-[78px] px-7 py-[7px] border border-gray-4 bg-gray-1 font-bold text-[12px] text-gray-4 rounded-full cursor-pointer"
            htmlFor="image-file"
          >
            {imgUrl ? "이미지 수정" : "이미지 업로드"}
          </label>
          {imgUrl && <Image src={imgUrl} alt="선택한 이미지" width={200} height={200} />}
        </div>
      </div>
      <div className="mt-[14px]">
        <EditorModule editorRef={editorRef} />
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
