"use client";
import { deleteLike, getLikes, getMyLike, insertLike } from "@/apis/grouppost";
import { GroupLike, TGroupLikeData } from "@/types/types";
import { useAuthStore } from "@/zustand/authStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Confirm } from "notiflix";
import { useEffect, useState } from "react";

interface LikeProps {
  postId: string;
}

function Like({ postId }: LikeProps) {
  const queryClient = useQueryClient();
  const [isLike, setIsLike] = useState<boolean>(false);
  const user = useAuthStore((state) => state.user);
  const userId = user?.id as string;
  const router = useRouter();

  const { data: myLike } = useQuery<GroupLike>({
    queryKey: ["like", userId, postId],
    queryFn: () => getMyLike(postId, userId),
    enabled: !!user,
  });

  useEffect(() => {
    if (myLike && myLike.post_id === postId) {
      setIsLike(true);
    } else {
      setIsLike(false);
    }
  }, [myLike, postId]);

  const {
    data: likes = [],
    isPending,
    isError,
  } = useQuery<GroupLike[]>({
    queryKey: ["like", postId],
    queryFn: () => getLikes(postId),
    enabled: !!postId,
  });

  const likesCount = likes.length;

  const { mutate: addLike } = useMutation({
    mutationFn: (likeData: TGroupLikeData) => insertLike(likeData),
    onMutate: async (likeData: TGroupLikeData) => {
      await queryClient.cancelQueries({ queryKey: ["like", postId] });

      const previousLikes = queryClient.getQueryData<GroupLike[]>(["like", postId]);

      queryClient.setQueryData<GroupLike[]>(["like", postId], (old) => [...(old || []), likeData as GroupLike]);

      setIsLike(true);
      return { previousLikes };
    },
    onError: (err, likeData, context) => {
      queryClient.setQueryData(["like", postId], context?.previousLikes);
      setIsLike(false);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["like"] });
    },
  });

  const { mutate: removeLike } = useMutation({
    mutationFn: (likeData: TGroupLikeData) => deleteLike(likeData),
    onMutate: async (likeData: TGroupLikeData) => {
      await queryClient.cancelQueries({ queryKey: ["like", postId] });

      const previousLikes = queryClient.getQueryData<GroupLike[]>(["like", postId]);

      queryClient.setQueryData<GroupLike[]>(["like", postId], (old) =>
        old?.filter((like) => !(like.post_id === likeData.post_id && like.user_id === likeData.user_id))
      );
      setIsLike(false);

      return { previousLikes };
    },
    onError: (err, likeData, context) => {
      queryClient.setQueryData(["like", postId], context?.previousLikes);
      setIsLike(true);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["like"] });
    },
  });

  const handleToggleLike = () => {
    if (user) {
      const likeData: TGroupLikeData = {
        post_id: postId,
        user_id: user.id,
      };
      isLike ? removeLike(likeData) : addLike(likeData);
    } else {
      Confirm.show(
        "로그인 후 이용 가능",
        "로그인하러 가시겠습니까?",
        "로그인 하기",
        "취소",
        () => {
          router.push("/login");
        },
        () => {
          return;
        }
      );
    }
  };

  if (!user)
    return (
      <button onClick={handleToggleLike}>
        <div className="flex justify-center items-center border border-gray-2 bg-white rounded-full py-1 px-3">
          <Image src="/img/icon-like.svg" alt="좋아요 버튼" width={20} height={20} />
          <span>{likesCount}</span>
        </div>
      </button>
    );

  if (isPending) return <div className="rounded-full w-[55px] h-[30px] animate-pulse"></div>;

  if (isError) return <span>에러</span>;

  return (
    <div>
      <button onClick={handleToggleLike}>
        {isLike ? (
          <div className="flex justify-center items-center border border-gray-2 bg-white rounded-full py-1 px-3">
            <Image src="/img/icon-like-on.svg" alt="좋아요 버튼" width={18} height={18} />
            <span className="ml-1 text-main-8 font-bold">{likesCount}</span>
          </div>
        ) : (
          <div className="flex justify-center items-center border border-gray-2 bg-white rounded-full py-1 px-3">
            <Image src="/img/icon-like.svg" alt="좋아요 버튼" width={18} height={18} />
            <span className="ml-1 text-gray-4 font-bold">{likesCount}</span>
          </div>
        )}
      </button>
    </div>
  );
}

export default Like;
