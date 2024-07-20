"use client";

import { insertGroupPost } from "@/apis/grouppost";
import { createClient } from "@/supabase/client";
import { TNewGroupPost } from "@/types/types";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function GroupWriteForm() {
  const router = useRouter();

  const [title, setTitle] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [peopleNum, setPeopleNum] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [imgUrl, setImgUrl] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [item, setItem] = useState<string>("");
  const [link, setLink] = useState<string>("");

  const addImageHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    // 당장은 여기서 직접 포스트 해주지만 나중에는 꼭 route handler 사용하기
    if (e.target.files) {
      const fileObj = e.target.files[0];
      console.log(e.target.files);
      const supabase = createClient();
      const { data } = await supabase.storage
        .from("groupposts")
        .upload(`grouppost_${Date.now()}.png`, fileObj);
      if (data) {
        setImgUrl(
          `https://nqqsefrllkqytkwxfshk.supabase.co/storage/v1/object/public/groupposts/${data.path}`
        );
      }
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
      id: uuidv4(),
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
      is_finished: false,
    };
    addMutation.mutate(newGroupPost);
  };

  return (
    <div>
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
    </div>
  );
}

export default GroupWriteForm;
