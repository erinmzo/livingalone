import { deleteLike, getLikes, getMyLike, insertLike } from "@/apis/grouppost";
import { GroupLike, TGroupLikeData } from "@/types/types";
import { useAuthStore } from "@/zustand/authStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { Report } from "notiflix";
import { useEffect, useState } from "react";

interface LikeProps {
  postId: string;
}
function Like({ postId }: LikeProps) {
  const queryClient = useQueryClient();
  const [isLike, setIsLike] = useState<boolean>(false);
  const user = useAuthStore((state) => state.user);
  const userId = user?.id as string;
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

  const { mutate: addLike } = useMutation({
    mutationFn: (likeData: TGroupLikeData) => insertLike(likeData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["like", postId] });
    },
  });

  const { mutate: removeLike } = useMutation({
    mutationFn: (likeData: TGroupLikeData) => deleteLike(likeData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["like", postId] });
    },
  });

  const handleToggleLike = () => {
    if (user) {
      const likeData: TGroupLikeData = {
        post_id: postId,
        user_id: user.id,
      };
      setIsLike((prev) => !prev);
      isLike ? removeLike(likeData) : addLike(likeData);
    } else {
      Report.failure("로그인 후 진행할 수 있습니다", "", "확인");
    }
  };

  if (!user)
    return (
      <div className="flex justify-center items-center">
        <Image src="/img/icon-like.png" alt="좋아요 버튼" width={20} height={20} />
        <span>{likesCount}</span>
      </div>
    );

  if (isPending) return <span>불러오는 중...</span>;
  if (isError) return <span>에러</span>;

  return (
    <button onClick={handleToggleLike} className="flex justify-center items-center">
      {isLike ? (
        <Image src="/img/icon-like-on.png" alt="좋아요 버튼" width={18} height={18} />
      ) : (
        <Image src="/img/icon-like.png" alt="좋아요 버튼" width={18} height={18} />
      )}
      <span className="ml-1">{likesCount}</span>
    </button>
  );
}

export default Like;
