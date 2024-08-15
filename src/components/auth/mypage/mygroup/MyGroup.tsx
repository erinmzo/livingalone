"use client";

import { getMyGroupPosts } from "@/apis/mypage";
import { TMyGroupPost } from "@/types/types";
import { useAuthStore } from "@/zustand/authStore";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import MyGroupPost from "./MyGroupPost";
import SkeletonMyGroup from "./SkeletonMyGroup";
import NoticeDot from "@/components/common/NoticeDot";

function MyGroup() {
  const user = useAuthStore((state) => state.user);

  const {
    data: groupPosts,
    isPending,
    isError,
    refetch,
  } = useQuery<TMyGroupPost[]>({
    queryKey: ["myGroupPosts", user?.id],
    queryFn: () => {
      if (!user || !user.id) throw new Error("User not found");
      return getMyGroupPosts(user.id);
    },
    enabled: !!user?.id,
  });

  if (isPending) return <SkeletonMyGroup />;

  if (isError)
    return <div className="flex justify-center items-center">에러...</div>;
  return (
    <div className="flex-col">
      <h5 className="hidden md:block font-bold text-[24px] mb-[22px] w-full">
        내가 쓴 공구
      </h5>
      <div className="md:hidden flex justify-center mb-[30px]">
        <div className="flex justify-center items-center font-bold text-xs text-main-8 border border-main-8 bg-gray-1 w-[73px] h-[30px] rounded-full mt-8 md:mt-0">
          내가 쓴 공구
        </div>
      </div>
      <div className="border border-gray-2 rounded-lg py-4 md:py-6 text-[10px] md:text-xs px-3 md:px-[68px] text-gray-4 mb-2 md:mb-6">
        <p className="hidden md:block leading-normal ">
          안녕하세요, 혼자살때 공구 게시판을 이용해주셔서 감사합니다. 공구 진행
          시 꼭 참고해 주세요
        </p>
        <p className="md:hidden leading-normal ">
          안녕하세요, 혼자살때 공구 게시판을 이용해주셔서 감사합니다. <br />{" "}
          공구 진행 시 꼭 참고해 주세요
        </p>
        <ul>
          <li className="flex">
            <NoticeDot />
            <p className="leading-normal ">
              혼자살때에서는 공동 구매(공구) 결제가 이루어지지 않습니다. 저희는
              공구를 할 수 있는 게시판만 제공해 드립니다. <br /> 공구자는 공구를
              열고 신청자를 받아 이후 과정을 직접 진행해 주셔야 합니다.
            </p>
          </li>
          <li className="flex">
            <NoticeDot />
            <p className="leading-normal ">
              혼자살때에서는 공구 진행과 관련된 책임을 지지 않습니다.
            </p>
          </li>
          <li className="flex">
            <NoticeDot />
            <p className="leading-normal ">
              공구자는 신청자의 개인정보를 물건 발송 이후 즉시 모두 삭제해
              주시기 바랍니다.
            </p>
          </li>
        </ul>
        <p className="leading-normal ">
          위 내용을 잘 숙지하시어 원활한 공구 진행을 부탁드립니다. 감사합니다.
        </p>
      </div>
      {groupPosts.length > 0 ? (
        <div className="md:border-t border-gray-2">
          {groupPosts.map((groupPost: TMyGroupPost) => {
            return (
              <div key={groupPost.id}>
                <MyGroupPost groupPost={groupPost} refetch={refetch} />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col py-[100px] justify-center items-center">
          <Image
            src="/img/icon-empty.png"
            alt="empty"
            width={100}
            height={0}
            className="mb-5"
          />
          <div className="flex justify-center items-center text-gray-4">
            등록한 공구템이 없습니다
          </div>
        </div>
      )}
    </div>
  );
}

export default MyGroup;
