import Image from "next/image";
import Link from "next/link";

function Banner() {
  return (
    <div className="w-[1024px] mx-auto pt-[120px] pb-[190px]">
      <div className="relative h-[220px]">
        <Link href="/payment">
          <Image src="/img/banner-randombox.png" alt="랜덤박스 구매하러가기" fill loading="lazy" />
        </Link>
      </div>
    </div>
  );
}

export default Banner;
