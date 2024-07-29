"use client";
import { getMustPost, insertMustImage, updateMustPost } from "@/apis/mustpost";
import InnerLayout from "@/components/common/Page/InnerLayout";
import { MustCategory, MustPost, TNewMustPost } from "@/types/types";
import { postRevalidate } from "@/utils/revalidate";
import { useAuthStore } from "@/zustand/authStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Notify } from "notiflix";
import React, { useEffect, useState } from "react";
import InputField from "../write/InputField";
import SelectCategory from "../write/SelectCategory";

type TMustInputs = {
  title: string;
  category: MustCategory | null;
  itemName: string;
  company: string;
  price: number;
  content: string;
};

function MustEditForm({ params }: { params: { id: string } }) {
  const { id } = params;
  const user = useAuthStore((state) => state.user);
  const userId = user?.id;
  const router = useRouter();

  const {
    data: mustPost,
    isPending,
    isError,
  } = useQuery<MustPost>({
    queryKey: ["editMustPost", id],
    queryFn: () => getMustPost(id),
  });

  const [imgUrl, setImgUrl] = useState<string>("");
  const [inputs, setInputs] = useState<TMustInputs>({
    title: "",
    category: null,
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

  const selectCategoryName = (category: MustCategory) => {
    setInputs({
      ...inputs,
      category,
    });
  };

  useEffect(() => {
    if (mustPost) {
      setInputs({
        title: mustPost.title,
        category: null,
        // 낸중에 한번 확인
        itemName: mustPost.item,
        company: mustPost.location,
        price: mustPost.price,
        content: mustPost.content,
      });
      setImgUrl(mustPost.img_url);
    }
  }, [mustPost]);

  const { mutate: addImage } = useMutation({
    mutationFn: async (newMustPostImage: any) => {
      const formData = new FormData();
      formData.append("file", newMustPostImage);
      const response = await insertMustImage(formData);
      setImgUrl(`https://nqqsefrllkqytkwxfshk.supabase.co/storage/v1/object/public/mustposts/${response.path}`);
    },
  });

  const addImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      const newMustPostImage = e.target.files[0];
      addImage(newMustPostImage);
    }
  };

  const { mutate: updateMutation } = useMutation({
    mutationFn: (newMustPost: TNewMustPost) => updateMustPost(newMustPost),
    onSuccess: () => {
      postRevalidate(`/mustpost/read/${id}`);
      router.push(`/mustpost/read/${id}`);
      router.refresh();
    },
  });

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const startDate = `${year}-${month}-${day}` as string;

  const addMustPostBtn = () => {
    const { title, category, itemName, company, price, content } = inputs;
    if (!title.trim() || !category || !itemName.trim() || !company.trim() || !content.trim()) {
      Notify.failure("모든 항목을 입력해주세요");
      return;
    }
    if (userId) {
      const newMustPost: TNewMustPost = {
        id,
        user_id: userId,
        title,
        category_id: category.id,
        content,
        img_url: imgUrl,
        item: itemName,
        location: company,
        price,
      };
      updateMutation(newMustPost);
    }
  };

  if (isPending) return <div className="flex justify-center items-center">로딩중...</div>;

  if (isError) return <div className="flex justify-center items-center">오류가 발생하였습니다!...</div>;

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
            <InputField labelName="작성일자" name="date" type="text" value={startDate} onchangeValue={onChange} />
          </div>
          <SelectCategory selectCategoryName={selectCategoryName} />
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
          type="text"
          value={inputs.company}
          placeHolder="구매처룰 입력해주세요."
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

        <InputField labelName="이미지" type="file" onchangeValue={addImageHandler} />
        {imgUrl && <Image src={imgUrl} alt="포스팅한 이미지" width={200} height={200} />}
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
        <button
          onClick={addMustPostBtn}
          className="w-[400px] py-5 text-[26px] text-white font-bold px-4 focus:outline-none bg-black hover:bg-slate-800 rounded-full"
        >
          수정 완료
        </button>
      </div>
    </InnerLayout>
  );
}

export default MustEditForm;
