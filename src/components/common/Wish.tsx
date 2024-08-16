"use client";
import { deleteWish, getMyWish, insertWish } from "@/apis/mustpost";
import { MustWish, TMustWishData } from "@/types/types";
import { useAuthStore } from "@/zustand/authStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Confirm } from "notiflix";
import { useEffect, useState } from "react";

interface WishProps {
  postId: string;
}

function Wish({ postId }: WishProps) {
  const queryClient = useQueryClient();
  const [isWish, setIsWish] = useState<boolean>(false);
  const user = useAuthStore((state) => state.user);
  const userId = user?.id as string;
  const router = useRouter();

  const {
    data: myWish,
    isPending,
    isError,
  } = useQuery<MustWish>({
    queryKey: ["wish", postId, userId],
    queryFn: () => getMyWish(userId, postId),
    enabled: !!user,
  });

  useEffect(() => {
    if (myWish && myWish.post_id === postId) {
      setIsWish(true);
    } else {
      setIsWish(false);
    }
  }, [myWish, postId]);

  const { mutate: addWish } = useMutation({
    mutationFn: (wishData: TMustWishData) => insertWish(wishData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wish"] });
    },
  });

  const { mutate: removeWish } = useMutation({
    mutationFn: (wishData: TMustWishData) => deleteWish(wishData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wish"] });
    },
  });

  const handleToggleWish = () => {
    if (user) {
      const wishData: TMustWishData = {
        post_id: postId,
        user_id: user.id,
      };
      setIsWish((prev) => !prev);
      isWish ? removeWish(wishData) : addWish(wishData);
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
      <button
        onClick={handleToggleWish}
        className="shrink-0 flex justify-center items-center border border-gray-2 bg-white rounded-full p-[6px]"
      >
        <Image
          src="/img/icon-wish.svg"
          alt="찜하기 버튼"
          width={20}
          height={20}
        />
      </button>
    );

  if (isPending)
    return (
      <div className="border border-gray-2 bg-gray-2 rounded-full w-[34px] h-[34px] animate-pulse"></div>
    );

  if (isError) return <div>에러가 발생했습니다.</div>;

  return (
    <button
      onClick={handleToggleWish}
      className="shrink-0 flex justify-center items-center border border-gray-2 bg-white rounded-full p-[6px]"
    >
      {isWish ? (
        <Image
          src="/img/icon-wish-on.svg"
          alt="찜하기 버튼"
          width={20}
          height={20}
        />
      ) : (
        <Image
          src="/img/icon-wish.svg"
          alt="찜하기 버튼"
          width={20}
          height={20}
        />
      )}
    </button>
  );
}

export default Wish;
