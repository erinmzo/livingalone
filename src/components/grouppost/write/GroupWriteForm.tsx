"use client";

import { insertGroupPost } from "@/apis/grouppost";
import { createClient } from "@/supabase/client";
import { GroupPost } from "@/types/types";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

type TNewGroupPost = Pick<
  GroupPost,
  | "id"
  | "user_id"
  | "title"
  | "price"
  | "people_num"
  | "is_finished"
  | "img_url"
  | "start_date"
  | "end_date"
  | "content"
  | "item"
  | "link"
>;

function GroupWriteForm() {
  const [title, setTitle] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [peopleNum, setPeopleNum] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [imgUrl, setImgUrl] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [item, setItem] = useState<string>("");
  const [link, setLink] = useState<string>("");

  const addGroupPostHandler = async () => {
    console.log(
      // user_id,
      title,
      startDate,
      endDate,
      peopleNum,
      price,
      content,
      item,
      link
    );
    const newGroupPost: TNewGroupPost = {
      id: uuidv4(),
      user_id: "38341ad9-3080-4072-997e-2f53feca7bf0", // 임시로
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
    await insertGroupPost(newGroupPost);
    // const supabase = createClient();
    // const { data, error } = await supabase
    //   .from("group_posts")
    //   .insert(newGroupPost);
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
        <input type="file" />
      </div>
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