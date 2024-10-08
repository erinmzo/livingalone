"use client";
import { updateGroupPost } from "@/apis/grouppost";
import { GroupApplication, TMyGroupPost, TNewGroupPost } from "@/types/types";
import { useAuthStore } from "@/zustand/authStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { Confirm } from "notiflix";
import { useEffect, useState } from "react";
import MyGroupApply from "./MyGroupApply";

function MyGroupPost({
  groupPost,
  refetch,
}: {
  groupPost: TMyGroupPost;
  refetch: () => void;
}) {
  const user = useAuthStore((state) => state.user);
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [isFinished, setIsFinished] = useState(groupPost.is_finished);

  useEffect(() => {
    setIsFinished(groupPost.is_finished);
  }, [groupPost.is_finished]);

  const updateMutation = useMutation({
    mutationFn: async (finishGroupPost: TNewGroupPost) => {
      await updateGroupPost(finishGroupPost);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["myGroupPosts", user?.id],
      });
      refetch();
    },
  });

  const finishGroupPostHandler = async () => {
    const finishGroupPost: TNewGroupPost = {
      id: groupPost.id,
      user_id: groupPost.user_id,
      title: groupPost.title,
      start_date: groupPost.start_date,
      end_date: groupPost.end_date,
      people_num: groupPost.people_num,
      price: groupPost.price,
      content: groupPost.content,
      item: groupPost.item,
      link: groupPost.link,
      img_url: groupPost.img_url,
      is_finished: !isFinished,
    };
    if (groupPost) {
      Confirm.show(
        "혼자살때",
        `${
          isFinished
            ? "종료된 상태를 진행 중으로 바꾸시겠습니까?"
            : "정말로 종료하시겠습니까?"
        }`,
        "네",
        "아니오",
        () => {
          setIsFinished(!isFinished);
          updateMutation.mutate(finishGroupPost);
        },
        () => {
          return;
        }
      );
    }
  };

  // 순서대로 sort
  const sortedApply = groupPost.group_applications.sort(
    (a: GroupApplication, b: GroupApplication) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return (
    <>
      <div
        className={`flex flex-col-reverse md:flex-row justify-between md:items-center py-4 md:py-[10px] border-b border-gray-2 gap-1 md:gap-0 ${
          isFinished ? "text-gray-2" : "text-black"
        }`}
      >
        <span className="text-[12px] md:hidden">
          <span className="font-bold">
            {groupPost.group_applications.length}명
          </span>{" "}
          / {groupPost.people_num}명
        </span>
        <div className="flex flex-row-reverse md:flex-row justify-between">
          <span
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center px-1 cursor-pointer"
          >
            {isOpen ? (
              <Image
                src="/img/icon-toggle-up.svg"
                alt="위"
                width={20}
                height={20}
              />
            ) : (
              <Image
                src="/img/icon-toggle-down.svg"
                alt="아래"
                width={20}
                height={20}
              />
            )}
          </span>
          <div
            className="font-bold w-[200px] truncate cursor-pointer text-black"
            onClick={() => setIsOpen(!isOpen)}
          >
            {groupPost.title}
          </div>
        </div>
        <Link
          href={`/grouppost/read/${groupPost.id}`}
          className="hidden md:block"
        >
          <Image
            src="/img/icon-Arrow up-black.png"
            alt="공구템 가기"
            width={20}
            height={20}
          />
        </Link>
        <span className="text-[12px] text-gray-3 md:text-black h-5 flex items-center">
          {groupPost.start_date} ~ {groupPost.end_date}
        </span>
        <span className="text-[12px] hidden md:block">
          <span className="font-bold">
            {groupPost.group_applications.length}명
          </span>{" "}
          / {groupPost.people_num}명
        </span>
        <div className="flex">
          {isFinished ? (
            <button
              className="font-bold w-[70px] h-[25px] text-[14px] flex items-center justify-between p-[7.5px] gap-1 bg-gray-2 text-gray-3 rounded-full"
              onClick={finishGroupPostHandler}
            >
              <div className="w-[10px] h-[10px] rounded-full bg-gray-3"></div>
              <p>종료</p>
            </button>
          ) : (
            <button
              className="font-bold w-[70px] h-[25px] text-[14px] flex items-center justify-between p-[7.5px] gap-1 border border-main-8 text-main-8 rounded-full"
              onClick={finishGroupPostHandler}
            >
              <p>진행중</p>
              <div className="w-[10px] h-[10px] rounded-full bg-main-8"></div>
            </button>
          )}
        </div>
      </div>
      {isOpen && (
        <>
          {groupPost.group_applications.length ? (
            <div className="md:mt-2">
              <table className="w-full text-left">
                <colgroup className="hidden md:contents">
                  <col width="10%" />
                  <col width="10%" />
                  <col width="20%" />
                  <col width="50%" />
                  <col width="10%" />
                </colgroup>
                <thead className="hidden md:contents">
                  <tr className="text-sm text-gray-3">
                    <th className="p-2 font-normal">순서</th>
                    <th className="p-2 font-normal">이름</th>
                    <th className="p-2 font-normal">전화번호</th>
                    <th className="p-2 font-normal">주소</th>
                    <th className="p-2 font-normal text-center">입금여부</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedApply.map((groupApply, idx: number) => {
                    return (
                      <tr
                        className="text-xs md:text-sm border-b border-gray-2 h-[44px] font-bold md:font-normal"
                        key={groupApply.id}
                      >
                        <MyGroupApply
                          groupApply={groupApply}
                          idx={idx}
                          refetch={refetch}
                        />
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex justify-center py-3 text-gray-3 border-b border-gray-2 text-[14px]">
              아직 신청자가 없습니다.
            </div>
          )}
        </>
      )}
    </>
  );
}

export default MyGroupPost;
