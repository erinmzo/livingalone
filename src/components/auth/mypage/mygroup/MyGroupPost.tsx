"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import MyGroupApply from "./MyGroupApply";
import { TNewGroupPost } from "@/types/types";
import { Confirm } from "notiflix";
import { updateGroupPost } from "@/apis/grouppost";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postRevalidate } from "@/utils/revalidate";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/zustand/authStore";

function MyGroupPost({
  groupPost,
  refetch,
}: {
  groupPost: any;
  refetch: () => void;
}) {
  const user = useAuthStore((state) => state.user);
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [isFinished, setIsFinished] = useState(groupPost.is_finished);
  const router = useRouter();

  useEffect(() => {
    setIsFinished(groupPost.is_finished);
  }, [groupPost.is_finished]);

  const updateMutation = useMutation({
    mutationFn: async (finishGroupPost: TNewGroupPost) => {
      await updateGroupPost(finishGroupPost);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["myGroupPosts", user?.id],
      });
      await postRevalidate(`/mypage/1/mygroup`);
      await refetch();
      router.refresh();
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
    (a: any, b: any) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return (
    <>
      <div className="flex justify-between items-center py-3 border-b border-t border-black">
        <span
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center mr-1 cursor-pointer"
        >
          {isOpen ? (
            <Image
              src="/img/icon-toggle-up.png"
              alt="위"
              width={20}
              height={20}
            />
          ) : (
            <Image
              src="/img/icon-toggle-down.png"
              alt=""
              width={20}
              height={20}
            />
          )}
        </span>
        <div className="font-bold w-[250px] truncate">{groupPost.title}</div>
        <span>
          {groupPost.start_date} - {groupPost.end_date}
        </span>
        <span>
          {groupPost.group_applications.length}명/{groupPost.people_num}명
        </span>
        <div className="flex">
          <button onClick={finishGroupPostHandler}>
            {isFinished ? "종료" : "진행중"}
          </button>
        </div>
      </div>
      {isOpen && (
        <>
          {groupPost.group_applications.length ? (
            <div className="mt-2">
              <table className="w-full text-left">
                <colgroup>
                  <col width="10%" />
                  <col width="10%" />
                  <col width="30%" />
                  <col width="40%" />
                  <col width="10%" />
                </colgroup>
                <thead>
                  <tr className="text-sm text-gray-400">
                    <th className="p-2">순서</th>
                    <th className="p-2">이름</th>
                    <th className="p-2">전화번호</th>
                    <th className="p-2">주소</th>
                    <th className="p-2 text-center">입금여부</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedApply.map((groupApply: any, idx: number) => {
                    return (
                      <tr className="text-sm" key={groupApply.id}>
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
            <div className="flex justify-center my-2">
              아직 신청자가 없습니다.
            </div>
          )}
        </>
      )}
    </>
  );
}

export default MyGroupPost;
