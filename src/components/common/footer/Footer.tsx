import Link from "next/link";
import FooterNav from "./FooterNav";

function Footer() {
  return (
    <footer className="bg-[#CCCCCC] pt-[40px] pb-[80px]">
      <div className="container mx-auto max-w-[1024px]">
        <h1 className="text-[20px] font-bold">
          <Link href="/">혼자살때</Link>
        </h1>
        <div className="flex justify-between items-end">
          <FooterNav />
          <div className="flex flex-col justify-end">
            <ul className="flex items-center justify-end text-[16px]">
              <li>
                <a href="https://github.com/erinmzo/livingalone" target="_blank">
                  깃헙
                </a>
              </li>
              <li>
                <a href="https://teamsparta.notion.site/A06-6-6-bdcf4b23863d4d1e871ba7fc936e60d8" target="_blank">
                  노션
                </a>
              </li>
            </ul>
            <p>Copyright©혼자살때</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
