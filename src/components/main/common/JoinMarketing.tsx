import { useAuthStore } from "@/zustand/authStore";
import Link from "next/link";

function JoinMarketing() {
  const user = useAuthStore((state) => state.user);
  return (
    <div className="flex flex-col justify-center items-center pb-[150px]">
      <span className="text-[60px]">👑</span>
      <p className="text-[32px] text-center font-bold mt-[10px]">
        혼자 살 때 <span className="text-main-8">멋진</span> 우리!
        <br />
        <span className="text-main-8">멋진 우리만의 커뮤니티!</span>
      </p>
      {!user ? (
        <Link
          href="/join"
          className="mt-[30px] px-[85px] py-[16px] bg-main-8 text-white rounded-full text-[26px] font-bold"
        >
          혼자살때 가입하기
        </Link>
      ) : (
        ""
      )}
    </div>
  );
}

export default JoinMarketing;
