import Image from "next/image";
import Link from "next/link";

function Banner() {
  return (
    <div className="pb-[80px] md:pt-[120px] md:pb-[190px] px-[16px] lg:px-0">
      <div className="relative w-full lg:max-w-[1024px] mx-auto">
        <Link href="/payment">
          <Image
            src="/img/banner-randombox.webp"
            alt="랜덤박스 구매하러가기"
            width={0}
            height={0}
            className="h-auto w-full"
            loading="lazy"
          />
        </Link>
      </div>
    </div>
  );
}

export default Banner;
