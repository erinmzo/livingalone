import Image from "next/image";
import Link from "next/link";
import FooterNav from "./FooterNav";

function Footer() {
  return (
    <footer className="hidden md:block bg-[url('/img/bg-footer.svg')] bg-no-repeat bg-center bg-cover pt-[110px] pb-[90px] absolute bottom-0 left-0 right-0">
      <div className="container mx-auto w-full max-w-[1024px] px-[16px] lg:px-0">
        <h1 className="text-[20px] font-bold">
          <Link href="/">
            <Image
              src="/img/logo-footer.svg"
              alt="혼자살때"
              width={0}
              height={0}
              className="w-[80px] h-auto"
            />
          </Link>
        </h1>
        <div className="flex justify-between items-end">
          <FooterNav />
          <div className="flex flex-col justify-end">
            <ul className="flex items-center justify-end text-[16px] gap-1">
              <li>
                <a
                  href="https://github.com/erinmzo/livingalone"
                  target="_blank"
                  title="깃헙으로 이동"
                >
                  <Image
                    src="/img/icon-github.svg"
                    alt="깃헙 아이콘"
                    width={24}
                    height={24}
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://teamsparta.notion.site/A06-6-6-bdcf4b23863d4d1e871ba7fc936e60d8"
                  target="_blank"
                  title="노션으로 이동"
                >
                  <Image
                    src="/img/icon-notion.svg"
                    alt="노션 아이콘"
                    width={24}
                    height={24}
                  />
                </a>
              </li>
            </ul>
            <p className="mt-[10px] text-gray-3 text-[14px]">
              Copyright©혼자살때
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
