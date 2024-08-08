"use client";
import { getComments } from "@/apis/mustpost";
import { MustComments } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";

function CommentsList({ postId }: { postId: string }) {
  const {
    data: comments = [],
    isPending,
    isError,
  } = useQuery<MustComments[]>({
    queryKey: ["comments", postId],
    queryFn: () => getComments(postId),
  });
  // console.log(comments);

  if (isPending) {
    return (
      <div className="flex justify-center items-center">
        <Image
          src="/img/loading-spinner.svg"
          alt="로딩중"
          width={200}
          height={200}
        />
      </div>
    );
  }

  // if (!comments || comments.length === 0) {
  //   <div className="flex flex-col py-[100px] justify-center items-center">
  //     <Image
  //       src="/img/icon-empty.png"
  //       alt="empty"
  //       width={100}
  //       height={0}
  //       className="mb-5"
  //     />
  //     <div className="flex justify-center items-center text-gray-4">
  //       아직 작성된 댓글이 없습니다. 첫 댓글을 작성해보세요!
  //     </div>
  //   </div>;
  // }

  // if (isError) {
  //   return (
  //     <div className="flex justify-center items-center">
  //       데이터를 불러오는데 실패했습니다!
  //     </div>
  //   );
  // }

  return (
    <div>
      {comments &&
        comments.map((comment) => (
          <div key={comment.id}>
            <Image
              src={comment.profiles.profile_image_url}
              alt="유저 프로필 사진"
              width={50}
              height={50}
            />
            <div>
              <div>
                <span>{comment.profiles.nickname}</span>
                <span>
                  {comment.created_at.split("T").join(" ").substring(0, 16)}
                </span>
              </div>
              <div>
                <span>{comment.content}</span>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default CommentsList;
