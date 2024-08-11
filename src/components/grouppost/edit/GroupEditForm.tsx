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
  const [checkBox, setCheckBox] = useState(false);
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
      <div className="hidden md:block border border-gray-2 rounded-lg p-6 text-xs text-gray-4 mb-6">
        <div className="px-[44px] mb-2">
          <p>
            안녕하세요, 혼자살때 공구 게시판을 이용해주셔서 감사합니다. 공구
            진행 시 꼭 참고해 주세요:
          </p>
          <ul>
            <li className="flex">
              <div className="w-[18px] flex justify-center shrink-0">
                <div className="w-[3px] h-[3px] rounded-full mt-[5px] bg-gray-4"></div>
              </div>
              <p>
                혼자살때에서는 공동 구매(공구) 결제가 이루어지지 않습니다.
                저희는 공구를 할 수 있는 게시판만 제공해 드립니다. 공구자는
                공구를 열고 신청자를 받아 이후 과정을 직접 진행해 주셔야 합니다.
              </p>
            </li>
            <li className="flex">
              <div className="w-[18px] flex justify-center shrink-0">
                <div className="w-[3px] h-[3px] rounded-full mt-[5px] bg-gray-4"></div>
              </div>
              <p>공구 참여 인원은 최대 30명 이하로 제한됩니다.</p>
            </li>
            <li className="flex">
              <div className="w-[18px] flex justify-center shrink-0">
                <div className="w-[3px] h-[3px] rounded-full mt-[5px] bg-gray-4"></div>
              </div>
              <p>
                상품 링크는 선택 사항입니다. 아이템의 상세 페이지를 보여주고
                싶다면 링크를 추가해 주세요.
              </p>
            </li>
            <li className="flex">
              <div className="w-[18px] flex justify-center shrink-0">
                <div className="w-[3px] h-[3px] rounded-full mt-[5px] bg-gray-4"></div>
              </div>
              <p>상품 이미지는 반드시 올려주셔야 합니다.</p>
            </li>
            <li className="flex">
              <div className="w-[18px] flex justify-center shrink-0">
                <div className="w-[3px] h-[3px] rounded-full mt-[5px] bg-gray-4"></div>
              </div>
              <p>혼자살때에서는 공구 진행과 관련된 책임을 지지 않습니다.</p>
            </li>
            <li className="flex">
              <div className="w-[18px] flex justify-center shrink-0">
                <div className="w-[3px] h-[3px] rounded-full mt-[5px] bg-gray-4"></div>
              </div>
              <p>
                공구자는 신청자의 개인정보를 물건 발송 이후 즉시 모두 삭제해
                주시기 바랍니다.
              </p>
            </li>
          </ul>
          <p>
            위 내용을 잘 숙지하시어 원활한 공구 진행을 부탁드립니다. 감사합니다.
          </p>
        </div>
        <div className="flex items-center gap-1">
          <input
            id="checkBox"
            type="checkbox"
            onChange={() => {
              setCheckBox(!checkBox);
            }}
          />
          <label
            htmlFor="checkBox"
            className={`text-[14px] ${checkBox ? "text-main-8" : "text-red-3"}`}
          >
            위의 내용을 확인하셨나요?
          </label>
        </div>
      </div>
      <div className="flex flex-col gap-3 md:gap-5">
        <div className="flex gap-[2px]">
          <label
            htmlFor="title"
            className="flex-0 w-[70px] md:w-[78px] h-[38px] flex items-center md:text-[18px] text-gray-3"
          >
            제목
          </label>
          <div className="flex-1 w-full">
            <input
              id="title"
              name="title"
              placeholder="제목을 입력하세요."
              value={title}
              onChange={onChangeInput}
              className="text-[16px] w-full pl-[2px] px-[2px] py-[5px] border-b-[1px] border-gray-3 font-bold md:text-[18px] text-black leading-normal  placeholder:text-gray-2 outline-none"
            />
            {error.titleError && (
              <p className={`text-red-3 text-[12px] mt-2`}>
                {error.titleError}
              </p>
            )}
          </div>
        </div>
        <div className="flex gap-2 md:gap-[41px]">
          <div className="flex gap-[2px]">
            <label
              htmlFor="endDate"
              className="hidden md:flex flex-0 w-[70px] md:w-[78px] h-[38px] items-center md:text-[18px] text-gray-3"
            >
              공구기간
            </label>
            <label className="flex md:hidden flex-0 w-[70px] md:w-[78px] h-[38px] items-center md:text-[18px] text-gray-3">
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
                  className="border-b-[1px] border-gray-3 py-2 px-[2px] md:text-[18px] font-bold text-black outline-none"
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
              className="flex-0 shrink-0 w-[70px] md:w-[78px] h-[38px] flex items-center md:text-[18px] text-gray-3"
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
                className="w-auto max-w-[83px] md:w-[100px] pl-[2px] px-[2px] py-2 border-b border-gray-3 md:text-[18px] font-bold text-black outline-none"
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
          <label
            htmlFor="item"
            className="flex-0 w-[70px] md:w-[78px] h-[38px] flex items-center md:text-[18px] text-gray-3"
          >
            상품이름
          </label>
          <div className="flex-1 w-full">
            <input
              id="item"
              name="item"
              placeholder="제품명을 입력하세요."
              value={item}
              onChange={onChangeInput}
              className="w-full pl-[2px] px-[2px] py-[5px] border-b-[1px] border-gray-3 font-bold md:text-[18px] text-black leading-normal placeholder:text-gray-2 outline-none"
            />
            {error.itemError && (
              <p className={`text-red-3 text-[12px] mt-2`}>{error.itemError}</p>
            )}
          </div>
        </div>

        <div className="flex gap-[2px]">
          <label
            htmlFor="price"
            className="flex-0 w-[70px] md:w-[78px] h-[38px] flex items-center md:text-[18px] text-gray-3"
          >
            공구가격
          </label>
          <input
            id="price"
            name="price"
            type="number"
            placeholder="숫자만 입력해주세요."
            value={price}
            onChange={onChangeInput}
            className="flex-1 pl-[2px] px-[2px] py-[5px] border-b-[1px] border-gray-3 font-bold md:text-[18px] text-black leading-normal placeholder:text-gray-2 outline-none"
          />
        </div>
        <div className="flex gap-[2px]">
          <label
            htmlFor="link"
            className="flex-0 w-[70px] md:w-[78px] h-[38px] flex items-center md:text-[18px] text-gray-3"
          >
            상품링크
          </label>
          <input
            id="link"
            name="link"
            placeholder="(선택사항) 상품소개 페이지 링크를 넣어주세요."
            value={link}
            onChange={onChangeInput}
            className="flex-1 pl-[2px] px-[2px] py-[5px] border-b-[1px] border-gray-3 font-bold md:text-[18px] text-black leading-normal placeholder:text-gray-2 outline-none"
          />
        </div>
        <div className="ml-[70px] md:ml-[78px] flex flex-col md:flex-row gap-2 md:gap-4 items-start mb-[6px]">
          {/* <label className=" flex-0 w-[70px] md:w-[78px] h-[38px] flex md:hidden items-center md:text-[18px] text-gray-3">
            이미지
          </label> */}
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
          {/* <label
            className="md:hidden w-11 h-11 flex justify-center items-center border border-gray-3 bg-gray-1 rounded-[4px] cursor-pointer"
            htmlFor="image-file"
          >
            <Image
              src="/img/icon-add-photo.png"
              alt="이미지 업로드 버튼"
              width={22}
              height={20}
            />
          </label> */}
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
      <div className="flex justify-center">
        <button
          className="bg-main-8 w-full md:w-[300px] py-[10px] text-white rounded-full font-bold text-[20px] mt-6 md:mt-[64px]"
          onClick={editGroupPostHandler}
        >
          등록하기
        </button>
      </div>
    </InnerLayout>
  );
}

export default GroupEditForm;
