"use client";

import {
  getGroupPost,
  insertGroupImage,
  updateGroupPost,
} from "@/apis/grouppost";
import { GroupPost, TNewGroupPost } from "@/types/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { postRevalidate } from "@/utils/revalidate";
import InnerLayout from "@/components/common/Page/InnerLayout";
import { Notify } from "notiflix";

type TGroupWriteInputs = {
  title: string;
  startDate: string;
  endDate: string;
  content: string;
  item: string;
  link: string;
  peopleNum: number;
  price: number;
  isFinished: boolean;
  userId: string;
};

function GroupEditForm({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter();

  const {
    data: groupPost,
    isPending,
    isError,
  } = useQuery<GroupPost>({
    queryKey: ["editGroupPost", id],
    queryFn: () => getGroupPost(id),
  });
  const [imgUrl, setImgUrl] = useState<string>("");
  const [inputs, setInputs] = useState<TGroupWriteInputs>({
    title: "",
    startDate: "",
    endDate: "",
    content: "",
    item: "",
    link: "",
    peopleNum: 0,
    price: 0,
    isFinished: false,
    userId: "",
  });
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  useEffect(() => {
    if (groupPost) {
      setInputs({
        title: groupPost.title,
        startDate: groupPost.start_date,
        endDate: groupPost.end_date,
        content: groupPost.content,
        item: groupPost.item,
        link: groupPost.link ? groupPost.link : "",
        peopleNum: groupPost.people_num,
        price: groupPost.price,
        isFinished: groupPost.is_finished,
        userId: groupPost.user_id,
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
    } = inputs;
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
    const newGroupPost: TNewGroupPost = {
      id,
      user_id: userId,
      title,
      start_date: startDate,
      end_date: endDate,
      people_num: +peopleNum,
      price,
      content,
      item,
      link,
      img_url: imgUrl,
      is_finished: isFinished,
    };
    updateMutation.mutate(newGroupPost);
  };

  if (isPending)
    return <div className="flex justify-center items-center">로딩중...</div>;

  if (isError)
    return <div className="flex justify-center items-center">에러...</div>;

  return (
    <InnerLayout>
      <div className="flex flex-col gap-5">
        <div className="flex gap-2">
          <label className="w-[86px] font-bold text-[20px] flex-none">
            제목
          </label>
          <input
            name="title"
            placeholder="제목을 입력하세요."
            value={inputs.title}
            onChange={onChange}
            className="border-b-[1px] w-full border-black"
          />
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <label className="w-[86px] font-bold text-[20px] flex-none">
              공구기간
            </label>
            <div className="w-[380px] border-b-[1px] border-black flex gap-1 items-center">
              <label className="text-[12px]">마감일</label>
              <input
                name="endDate"
                type="date"
                value={inputs.endDate}
                onChange={onChange}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <label className="w-[78px] font-bold text-[20px] flex-none">
              공구인원
            </label>
            <input
              name="peopleNum"
              type="number"
              placeholder="숫자만 입력해주세요."
              value={inputs.peopleNum}
              onChange={onChange}
              className="w-[64px] border-b border-black text-center"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <label className="w-[86px] font-bold text-[20px] flex-none">
            상품이름
          </label>
          <input
            name="item"
            placeholder="제품명을 입력하세요."
            value={inputs.item}
            onChange={onChange}
            className="border-b-[1px] w-full border-black"
          />
        </div>

        <div className="flex gap-2 items-center">
          <label className="w-[86px] font-bold text-[20px] flex-none">
            공구가격
          </label>
          <input
            name="price"
            type="number"
            placeholder="숫자만 입력해주세요."
            value={inputs.price}
            onChange={onChange}
            className="border-b-[1px] w-full border-black"
          />
        </div>
        <div className="flex gap-2 items-center">
          <label className="w-[86px] font-bold text-[20px] flex-none">
            링크
          </label>
          <input
            name="link"
            placeholder="(선택사항) 상품소개 페이지 링크를 넣어주세요."
            value={inputs.link}
            onChange={onChange}
            className="border-b-[1px] w-full border-black"
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
            className="py-4 cursor-pointer font-bold rounded-full w-[160px] flex justify-center items-center bg-[#C2C2C2]"
            htmlFor="image-file"
          >
            {imgUrl ? "이미지 수정" : "이미지 업로드"}
          </label>
          {imgUrl && (
            <Image src={imgUrl} alt="선택한 이미지" width={200} height={200} />
          )}
        </div>
      </div>
      <textarea
        name="content"
        placeholder="* 여기에 글을 작성해주세요."
        value={inputs.content}
        onChange={onChange}
        className="w-full h-[330px] border-b border-black resize-none mt-[42px] p-6"
      ></textarea>
      <div className="flex justify-center">
        <button
          className="bg-black w-[400px] py-4 text-white rounded-full font-bold text-[26px] mt-[64px]"
          onClick={addGroupPostHandler}
        >
          수정 완료
        </button>
      </div>
    </InnerLayout>
  );
}

export default GroupEditForm;
