import Link from "next/link";

function Header() {
  return (
    <header>
      <div>
        <ul className="container mx-auto max-w-[1024px]">
          <li>
            <Link href="/login">로그인</Link>
          </li>
          <li>
            <Link href="/join">회원가입</Link>
          </li>
        </ul>
      </div>
      <div className="container mx-auto max-w-[1024px]">
        <h1>
          <Link href="/">하루살때</Link>
        </h1>
        <div>
          <ul>
            <li></li>
          </ul>
          <div>
            <button>글쓰기</button>
            <ul>
              <li>
                <Link href="">자취템 자랑하기</Link>
              </li>
              <li>
                <Link href="">공동구매 만들기</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
