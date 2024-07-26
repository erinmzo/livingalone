"use client";

import React, { useState } from "react";
import InputField from "./InputField";
import InnerLayout from "@/components/common/Page/InnerLayout";
import Button from "@/components/auth/common/button/Button";
import SelectCategory from "./SelectCategory";
import { useMutation } from '@tanstack/react-query';

type TMustInputs = {
  title: string;
  date: string;
  category: string;
  itemName: string;
  company: string;
  price: number;
  content: string
};
function MustWriteForm() {
  const [imgUrl, setImgUrl] = useState<string>("")
  const [inputs, setInputs] = useState<TMustInputs>({
    title: "",
    date: "",
    category: "",
    itemName: "",
    company: "",
    price: 0,
    content: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const { mutate: addImage} = useMutation({
    mutationFn: async(newMustPostImage: File) => 
  })

  const addImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if(e.target.files) {
      const newMustPostImage = e.target.files[0]
      addImage(newMustPostImage)
    }
  }

  return (
    <InnerLayout>
      <form className="flex flex-col gap-5">
        <InputField
          labelName="제목"
          name="title"
          type="text"
          value={inputs.title}
          placeHolder="제목을 입력해주세요"
          minLength={2}
          onchangeValue={onChange}
        />

        <div className="flex flex-row justify-between gap-2">
          <div className="pr-[72px] flex-grow">
            <InputField
              labelName="작성일자"
              name="date"
              type="date"
              max={"9999-12-31"}
              value={inputs.date}
              placeHolder="상품 이름을 입력해주세요."
              onchangeValue={onChange}
            />
          </div>
          <SelectCategory />
          {/* <div className="flex-grow-0">
            <InputField
              labelName="카테고리"
              type={"text"}
              value={title}
              placeHolder={"카테고리를 선택해주세요"}
              minLength={2}
              onchangeValue={(e) => setTitle(e.target.value)}
            />
          </div> */}
        </div>

        <InputField
          labelName="상품이름"
          name="itemName"
          type="text"
          value={inputs.itemName}
          placeHolder="상품 이름을 입력해주세요."
          minLength={2}
          onchangeValue={onChange}
        />

        <InputField
          labelName="제작업체"
          name="company"
          type={"text"}
          value={inputs.company}
          placeHolder="회사명을 적어주세요."
          minLength={1}
          onchangeValue={onChange}
        />

        <InputField
          labelName="판매가격"
          name="price"
          type="number"
          value={inputs.price}
          placeHolder="숫자만 입력해주세요"
          minLength={2}
          onchangeValue={onChange}
        />

        <InputField
          labelName="이미지"
          type="file"
          onchangeValue={addImageHandler}
        />

        <div className="mt-[22px] mb-[64px] p-6 border-b border-black">
          <textarea
            name="content"
            value={inputs.content}
            placeholder="※ 여기에 글을 작성해주세요."
            onChange={onChange}
            className="w-full h-[456px] outline-none"
          ></textarea>
        </div>
      </form>
      <div className="flex justify-center">
        <Button 
        // onClick={addMustPostBtn}
        className="w-[400px] py-3 text-[26px]"
        >포스팅 하기
        </Button>
      </div>
    </InnerLayout>
  );
}

export default MustWriteForm;



