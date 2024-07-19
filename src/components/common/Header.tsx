import Link from "next/link";

function Header() {
  return (
    <header>
      <div>
        <ul className="container mx-auto max-w-[1024px]">
          <li>
            <Link href="">로그인</Link>
          </li>
          <li>
            <Link href="">회원가입</Link>
          </li>
        </ul>
      </div>
      <div className="container mx-auto max-w-[1024px]">
        <h1>
          <Link href="/">하루살때</Link>
        </h1>
      </div>
    </header>
  );
}

export default Header;
