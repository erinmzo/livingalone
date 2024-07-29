"use client";
import { useAuthStore } from "@/zustand/authStore";
import Link from "next/link";
import { useRouter } from "next/navigation";

function AuthHeader() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const saveUser = useAuthStore((state) => state.saveUser);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "DELETE" });
    saveUser(null);
    router.push("/");
  };
  return (
    <div className="hidden sm:block">
      <ul className="container mx-auto max-w-[1024px] flex items-center justify-end gap-5 py-[18px] text-[12px] text-gray-4 text-black">
        {!user ? (
          <>
            <li>
              <Link href="/login">로그인</Link>
            </li>
            <li>
              <Link href="/join">회원가입</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <button onClick={handleLogout}>로그아웃</button>
            </li>
            <li>
              <Link href={`/mypage/${user.id}`}>마이페이지</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default AuthHeader;
