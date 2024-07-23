import Link from "next/link";

function AuthHeader() {
  return (
    <div className="hidden sm:block">
      <ul className="container mx-auto max-w-[1024px] flex items-center justify-end gap-5 py-[18px] text-[12px]">
        <li>
          <Link href="/login">로그인</Link>
        </li>
        <li>
          <Link href="/join">회원가입</Link>
        </li>
      </ul>
    </div>
  );
}

export default AuthHeader;
