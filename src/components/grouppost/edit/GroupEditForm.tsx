"use client";

import { getGroupPost, insertGroupImage, updateGroupPost } from "@/apis/grouppost";
import InnerLayout from "@/components/common/Page/InnerLayout";
import EditorModule from "@/components/common/editor/EditorModule";
import InputField from "@/components/common/input/InputField";
import { useInputChange } from "@/hooks/useInput";
import { GroupPost, TNewGroupPost } from "@/types/types";
import { postRevalidate } from "@/utils/revalidate";
import { useMutation, useQuery } from "@tanstack/react-query";
import { EditorProps } from "@toast-ui/react-editor";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Notify } from "notiflix";
import React, { useEffect, useRef, useState } from "react";
import GroupPostNotice from "../common/GroupPostNotice";
import { groupValidation } from "../common/GroupValidation";

import imageCompression from "browser-image-compression";

function GroupEditForm({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter();
  const [checkBox, setCheckBox] = useState(false);
  const editorRef = useRef<EditorProps>(null);
  const [error, setError] = useState({
    titleError: "",
    endDateError: "",
    peopleNumError: "",
    itemError: "",
    priceError: "",
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
  const { title, startDate, endDate, content, item, link, peopleNum, price, userId, isFinished } = input;
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

      if (editorRef.current) {
        editorRef.current.getInstance().setMarkdown(groupPost.content);
      }
    }
  }, [groupPost, editorRef.current]);

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

  const updateMutation = useMutation({
    mutationFn: async (newGroupPost: TNewGroupPost) => {
      await updateGroupPost(newGroupPost);
    },
    onSuccess: async () => {
      Notify.success("공구템 수정이 완료되었습니다!");
      postRevalidate(`/grouppost/read/${id}`);
      router.push(`/grouppost/read/${id}`);
      router.refresh();
    },
  });

  const editGroupPostHandler = async () => {
    const isValid = groupValidation(setError, title, endDate, peopleNum, item, price, imgUrl);
    if (!isValid) {
      return;
    }

    if (!editorRef.current || editorRef.current.trim() === "") return Notify.failure("모든 항목을 입력해주세요");

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
        <Image src="/img/loading-spinner.svg" alt="로딩중" width={200} height={200} />
      </div>
    );

  if (isError) return <div className="flex justify-center items-center">에러...</div>;

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
              <label className="hidden h-[38px] md:flex items-center text-[14px] text-black">마감일</label>
              <div>
                <input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={endDate}
                  onChange={onChangeInput}
                  className="rounded-none border-b-[1px] border-gray-3 py-2 px-[2px] md:text-[18px] font-bold text-black outline-none"
                />
                {error.endDateError && <p className={`text-red-3 text-[12px] mt-2`}>{error.endDateError}</p>}
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
              {error.peopleNumError && <p className={`text-red-3 text-[12px] mt-2`}>{error.peopleNumError}</p>}
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
          <input className="hidden" id="image-file" type="file" onChange={addImageHandler} />
          <label
            className="flex justify-center items-center px-7 py-[7px] border border-gray-4 bg-gray-1 font-bold text-[12px] text-gray-4 rounded-full cursor-pointer"
            htmlFor="image-file"
          >
            {imgUrl ? "이미지 수정" : "이미지 업로드"}
          </label>
          {error.imageUrlError && <p className={`text-red-3 text-[12px] mt-2`}>{error.imageUrlError}</p>}
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
          onClick={editGroupPostHandler}
        >
          수정 완료
        </button>
      </div>
    </InnerLayout>
  );
}

export default GroupEditForm;
