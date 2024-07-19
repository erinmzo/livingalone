"use client";

import { createClient } from "@/supabase/client";
import React, { useState } from "react";

function GroupWriteForm() {
  const [title, setTitle] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [peopleNum, setPeopleNum] = useState<number>();
  const [price, setPrice] = useState<number>();
  const [imgUrl, setImgUrl] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [item, setItem] = useState<string>("");
  const [link, setLink] = useState<string>("");

  const addGroupPostHandler = async () => {
    console.log(
      // id,
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
    const newGroupPost = {
      title,
      start_date: startDate,
      end_date: endDate,
      people_num: peopleNum,
      price,
      content,
      item,
      link,
      img_url: imgUrl,
      is_finished: false,
    };
    const supabase = createClient();
    const { data, error } = await supabase
      .from("group_posts")
      .insert(newGroupPost);
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
