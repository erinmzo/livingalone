"use client";

import {
  getGroupPost,
  insertGroupImage,
  insertGroupPost,
  updateGroupPost,
} from "@/apis/grouppost";
import { GroupPost, TNewGroupPost } from "@/types/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { test } from "./test";
import { groupPostRevalidate } from "@/utils/revalidate";

function GroupEditForm({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter();

  const {
    data: groupPost,
    isPending,
    isError,
  } = useQuery<GroupPost>({
    queryKey: ["groupPost"],
    queryFn: () => getGroupPost(id),
  });
  const [title, setTitle] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [peopleNum, setPeopleNum] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [imgUrl, setImgUrl] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [item, setItem] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [isFinished, setIsFinished] = useState<boolean>(false);

  useEffect(() => {
    if (groupPost) {
      setTitle(groupPost.title);
      setStartDate(groupPost.start_date);
      setEndDate(groupPost.end_date);
      setPeopleNum(groupPost.people_num);
      setPrice(groupPost.price);
      setImgUrl(groupPost.img_url);
      setContent(groupPost.content);
      setItem(groupPost.item);
      setLink(groupPost.link ? groupPost.link : "");
      setIsFinished(groupPost.is_finished);
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
      // revalidatePath(`/grouppost/read/${id}`);
      groupPostRevalidate(id);
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
      alert("관련 링크를 제외한 모든 값을 입력해주세요.");
      return;
    }
    if (peopleNum > 30) {
      alert("최대 공구 인원은 30명까지입니다.");
      return;
    }
    const newGroupPost: TNewGroupPost = {
      id,
      // TODO 임시로 넣은 아이디, 나중에 로그인 기능 생기면 유저 정보 가져와서 넣어줘야 한다.
      user_id: "38341ad9-3080-4072-997e-2f53feca7bf0",
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
    <form action={addGroupPostHandler}>
      <div>
        <label>제목</label>
        <input
          placeholder="제목을 입력하세요."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>제품명</label>
        <input
          placeholder="제품명을 입력하세요."
          value={item}
          onChange={(e) => setItem(e.target.value)}
        />
      </div>
      <div>
        <label>관련 링크</label>
        <input
          placeholder="링크를 입력하세요. (선택사항)"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
      </div>
      <div>
        <label>시작일자</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div>
        <label>마감일자</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <div>
        <label>공구인원</label>
        <input
          type="number"
          placeholder="숫자만 입력해주세요."
          value={peopleNum}
          onChange={(e) => setPeopleNum(+e.target.value)}
        />
      </div>
      <div>
        <label>공구가격</label>
        <input
          type="number"
          placeholder="숫자만 입력해주세요."
          value={price}
          onChange={(e) => setPrice(+e.target.value)}
        />
      </div>
      <div>
        <label>이미지</label>
        <input type="file" onChange={addImageHandler} />
      </div>
      {/* <Image/> */}
      {imgUrl && (
        <Image src={imgUrl} alt="선택한 이미지" width={500} height={500} />
      )}

      <textarea
        placeholder="* 여기에 글을 작성해주세요."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <button onClick={addGroupPostHandler}>포스팅 하기</button>
    </form>
  );
}

export default GroupEditForm;
