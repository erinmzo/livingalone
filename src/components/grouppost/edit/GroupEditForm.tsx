"use client";

import {
  getGroupPost,
  insertGroupImage,
  updateGroupPost,
} from "@/apis/grouppost";
import InnerLayout from "@/components/common/Page/InnerLayout";
import { useInputChange } from "@/hooks/useInput";
import { GroupPost, TNewGroupPost } from "@/types/types";
import { postRevalidate } from "@/utils/revalidate";
import { useMutation, useQuery } from "@tanstack/react-query";
import { EditorProps } from "@toast-ui/react-editor";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Notify } from "notiflix";
import React, { useEffect, useRef, useState } from "react";

const EditorModule = dynamic(
  () => import("@/components/common/editor/EditorModule"),
  {
    ssr: false,
  }
);

function GroupEditForm({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter();
  const editorRef = useRef<EditorProps>(null);

  const {
    data: groupPost,
    isPending,
    isError,
  } = useQuery<GroupPost>({
    queryKey: ["editGroupPost", id],
    queryFn: () => getGroupPost(id),
  });
  const [imgUrl, setImgUrl] = useState<string>("");

  const {
    values: input,
    handler: onChangeInput,
    setValueInit,
  } = useInputChange({
    title: "",
    startDate: "",
    endDate: "",
    content: "",
    item: "",
    link: "",
    peopleNum: 0,
    price: 0,
    userId: "",
    isFinished: false,
  });
  const {
    title,
    startDate,
    endDate,
    content,
    item,
    link,
    peopleNum,
    price,
    userId,
    isFinished,
  } = input;
  useEffect(() => {
    if (groupPost) {
      setValueInit({
        title: groupPost.title,
        startDate: groupPost.start_date,
        endDate: groupPost.end_date,
        content: groupPost.content,
        item: groupPost.item,
        link: groupPost.link ? groupPost.link : "",
        peopleNum: groupPost.people_num,
        price: groupPost.price,
        userId: groupPost.user_id,
        isFinished: groupPost.is_finished,
      });
      setImgUrl(groupPost.img_url);
    }
  }, [groupPost]);

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

  const updateMutation = useMutation({
    mutationFn: async (newGroupPost: TNewGroupPost) => {
      await updateGroupPost(newGroupPost);
    },
    onSuccess: async () => {
      postRevalidate(`/grouppost/read/${id}`);
      router.push(`/grouppost/read/${id}`);
      router.refresh();
    },
  });

  const addGroupPostHandler = async () => {
    if (
      !title.trim() ||
      !startDate.trim() ||
      !endDate.trim() ||
      !imgUrl.trim() ||
      !content.trim() ||
      !item.trim()
    ) {
      Notify.failure("관련 링크를 제외한 모든 값을 입력해주세요.");
      return;
    }
    if (peopleNum > 30) {
      Notify.failure("최대 공구 인원은 30명까지입니다.");
      return;
    }

    if (!editorRef.current) return Notify.failure("모든 항목을 입력해주세요");

    if (editorRef.current) {
      const editorContent = editorRef.current.getInstance().getMarkdown();
      const newGroupPost: TNewGroupPost = {
        id,
        user_id: userId,
        title,
        start_date: startDate,
        end_date: endDate,
        people_num: +peopleNum,
        price,
        content: editorContent,
        item,
        link,
        img_url: imgUrl,
        is_finished: isFinished,
      };
      updateMutation.mutate(newGroupPost);
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
    return <div className="flex justify-center items-center">에러...</div>;

  return (
    <InnerLayout>
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-[2px]">
          <label className="flex-0 w-[78px] text-[18px] text-gray-3">
            제목
          </label>
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
            <label className="flex-0 w-[78px] text-[18px] text-gray-3">
              공구기간
            </label>
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
            <label className="flex-0 w-[78px] text-[18px] text-gray-3">
              공구인원
            </label>
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
          <label className="flex-0 w-[78px] text-[18px] text-gray-3">
            상품이름
          </label>
          <input
            name="item"
            placeholder="제품명을 입력하세요."
            value={item}
            onChange={onChangeInput}
            className="flex-1 pl-[2px] px-[2px] py-[5px] border-b-[1px] border-gray-3 font-bold text-[18px] text-black leading-normal placeholder:text-gray-2 outline-none"
          />
        </div>

        <div className="flex items-center gap-[2px]">
          <label className="flex-0 w-[78px] text-[18px] text-gray-3">
            공구가격
          </label>
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
          <label className="flex-0 w-[78px] text-[18px] text-gray-3">
            상품링크
          </label>
          <input
            name="link"
            placeholder="(선택사항) 상품소개 페이지 링크를 넣어주세요."
            value={link}
            onChange={onChangeInput}
            className="flex-1 pl-[2px] px-[2px] py-[5px] border-b-[1px] border-gray-3 font-bold text-[18px] text-black leading-normal placeholder:text-gray-2 outline-none"
          />
        </div>
        <div className="flex gap-4 items-start mb-[6px]">
          <input
            className="hidden"
            id="image-file"
            type="file"
            onChange={addImageHandler}
          />
          <label
            className="flex justify-center items-center ml-[78px] px-7 py-[7px] border border-gray-4 bg-gray-1 font-bold text-[12px] text-gray-4 rounded-full cursor-pointer"
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
        <EditorModule editorRef={editorRef} initialValue={groupPost.content} />
      </div>
      <div className="flex justify-center">
        <button
          className="bg-main-8 w-[300px] py-[10px] text-white rounded-full font-bold text-[20px] mt-[64px]"
          onClick={addGroupPostHandler}
        >
          수정 완료
        </button>
      </div>
    </InnerLayout>
  );
}

export default GroupEditForm;
