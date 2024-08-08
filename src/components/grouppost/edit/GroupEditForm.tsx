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
import { groupValidation } from "../common/GroupValidation";

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

  const [error, setError] = useState({
    titleError: "",
    endDateError: "",
    peopleNumError: "",
    itemError: "",
    imageUrlError: "",
  });

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

  const editGroupPostHandler = async () => {
    const isValid = groupValidation(
      setError,
      title,
      endDate,
      peopleNum,
      item,
      imgUrl
    );
    if (!isValid) {
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
        <div className="flex gap-[2px]">
          <label className="flex-0 w-[78px] h-[38px] flex items-center text-[18px] text-gray-3">
            제목
          </label>
          <div className="flex-1 w-full">
            <input
              name="title"
              placeholder="제목을 입력하세요."
              value={title}
              onChange={onChangeInput}
              className="w-full pl-[2px] px-[2px] py-[5px] border-b-[1px] border-gray-3 font-bold text-[18px] text-black leading-normal  placeholder:text-gray-2 outline-none"
            />
            {error.titleError && (
              <p className={`text-red-3 text-[12px] mt-2`}>
                {error.titleError}
              </p>
            )}
          </div>
        </div>
        <div className="flex gap-[41px]">
          <div className="flex gap-[2px]">
            <label className="flex-0 w-[78px]  h-[38px] flex items-center text-[18px] text-gray-3">
              공구기간
            </label>
            <div className="flex gap-2">
              <label className="h-[38px] flex items-center text-[14px] text-black">
                마감일
              </label>
              <div>
                <input
                  name="endDate"
                  type="date"
                  value={endDate}
                  onChange={onChangeInput}
                  className="border-b-[1px] border-gray-3 py-2 px-[2px] text-[18px] font-bold text-black outline-none"
                />
                {error.endDateError && (
                  <p className={`text-red-3 text-[12px] mt-2`}>
                    {error.endDateError}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <label className="flex-0 w-[78px]  h-[38px] flex items-center text-[18px] text-gray-3">
              공구인원
            </label>
            <div>
              <input
                name="peopleNum"
                type="number"
                placeholder="숫자만 입력해주세요."
                value={peopleNum}
                onChange={onChangeInput}
                className="w-[100px] pl-[2px] px-[2px] py-2 border-b border-gray-3 text-[18px] font-bold text-black outline-none"
              />
              {error.peopleNumError && (
                <p className={`text-red-3 text-[12px] mt-2`}>
                  {error.peopleNumError}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-[2px]">
          <label className="flex-0 w-[78px] h-[38px] flex items-center text-[18px] text-gray-3">
            상품이름
          </label>
          <div className="flex-1 w-full">
            <input
              name="item"
              placeholder="제품명을 입력하세요."
              value={item}
              onChange={onChangeInput}
              className="w-full pl-[2px] px-[2px] py-[5px] border-b-[1px] border-gray-3 font-bold text-[18px] text-black leading-normal placeholder:text-gray-2 outline-none"
            />
            {error.itemError && (
              <p className={`text-red-3 text-[12px] mt-2`}>{error.itemError}</p>
            )}
          </div>
        </div>

        <div className="flex gap-[2px]">
          <label className="flex-0 w-[78px] h-[38px] flex items-center text-[18px] text-gray-3">
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
        <div className="flex gap-[2px]">
          <label className="flex-0 w-[78px] h-[38px] flex items-center text-[18px] text-gray-3">
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
          {error.imageUrlError && (
            <p className={`text-red-3 text-[12px] mt-2`}>
              {error.imageUrlError}
            </p>
          )}
          {imgUrl && (
            <Image src={imgUrl} alt="선택한 이미지" width={200} height={200} />
          )}
        </div>
      </div>
      <div className="mt-[14px]">
        <EditorModule editorRef={editorRef} />
      </div>
      <div className="flex justify-center">
        <button
          className="bg-main-8 w-[300px] py-[10px] text-white rounded-full font-bold text-[20px] mt-[64px]"
          onClick={editGroupPostHandler}
        >
          포스팅 하기
        </button>
      </div>
    </InnerLayout>
  );
}

export default GroupEditForm;
