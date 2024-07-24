"use client";

import React, { useState } from "react";
import InputField from "./InputField";
import InnerLayout from "@/components/common/Page/InnerLayout";

function MustWriteForm() {
  const [title, setTitle] = useState<string>("");
  return (
    <InnerLayout>
      <form className="flex flex-col gap-5">
        <InputField
          labelName="제목"
          type={"text"}
          value={title}
          placeHolder={"제목을 입력해주세요"}
          minLength={2}
          onchangeValue={(e) => setTitle(e.target.value)}
        />

        <div className="flex flex-row justify-between gap-2">
          <div className="flex-grow pr-[86px]">
            <InputField
              labelName="상품이름"
              type={"text"}
              value={title}
              placeHolder={"상품 이름을 입력해주세요."}
              minLength={2}
              onchangeValue={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="flex-grow-0">
            <InputField
              labelName="상품이름"
              type={"text"}
              value={title}
              placeHolder={"상품 이름을 입력해주세요."}
              minLength={2}
              onchangeValue={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>

        <InputField
          labelName="상품이름"
          type={"text"}
          value={title}
          placeHolder={"상품 이름을 입력해주세요."}
          minLength={2}
          onchangeValue={(e) => setTitle(e.target.value)}
        />

        <InputField
          labelName="제작업체"
          type={"text"}
          value={title}
          placeHolder={"회사명을 적어주세요."}
          minLength={1}
          onchangeValue={(e) => setTitle(e.target.value)}
        />

        <InputField
          labelName="판매가격"
          type={"number"}
          value={title}
          placeHolder={"숫자만 입력해주세요"}
          minLength={2}
          onchangeValue={(e) => setTitle(e.target.value)}
        />

        <InputField
          labelName="이미지"
          type={"file"}
          value={title}
          placeHolder={""}
          minLength={2}
          onchangeValue={(e) => setTitle(e.target.value)}
        />

        <div className="mt-[22px] p-6 border-b border-black">
          <textarea
            placeholder="※ 여기에 글을 작성해주세요."
            name=""
            id=""
            className="w-full"
          ></textarea>
        </div>
      </form>
    </InnerLayout>
  );
}

export default MustWriteForm;
