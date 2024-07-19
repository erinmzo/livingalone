import Link from "next/link";

function FooterNav() {
  return (
    <nav>
      <ul className="flex items-center gap-3 text-[16px]">
        <li>
          <Link href="/mustpost">구해줘 자취템</Link>
        </li>
        <li>|</li>
        <li>
          <Link href="/grouppost">같이 사 공구템</Link>
        </li>
      </ul>
    </nav>
  );
}

export default FooterNav;
