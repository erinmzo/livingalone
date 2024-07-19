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
      <div className="container mx-auto max-w-[1024px] flex justify-between items-center">
        <h1>
          <Link href="/">하루살때</Link>
        </h1>
        <div className="flex items-center">
          <ul>
            <li>
              <Link href="/mustpost">구해줘 자취템</Link>
            </li>
            <li>
              <Link href="/grouppost">같이 사 공구템</Link>
            </li>
          </ul>
          <div>
            <button>글쓰기</button>
            <ul className="">
              <li>
                <Link href="/mustpost/write">자취템 자랑하기</Link>
              </li>
              <li>
                <Link href="/grouppost/write">공동구매 만들기</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
