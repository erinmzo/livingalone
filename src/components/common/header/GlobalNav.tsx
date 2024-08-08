import Link from "next/link";

function GlobalNav() {
  return (
    <nav className="hidden md:block">
      <h2 className="hidden">주메뉴</h2>
      <ul className="flex gap-[34px] items-center text-[20px] font-bold">
        <li>
          <Link href="/mustpost" className="hover:text-main-7">
            자랑해 자취템
          </Link>
        </li>
        <li>
          <Link href="/grouppost" className="hover:text-main-7">
            같이 사 공구템
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default GlobalNav;
