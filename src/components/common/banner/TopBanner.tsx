import Image from "next/image";
import Link from "next/link";

function TopBanner() {
  return (
    <div className="bg-main-7 py-[10px]">
      <Link href="/payment" className="w-full flex justify-center">
        <Image
          src="/img/top-banner-randombox.webp"
          alt="천원의 행복! 혼자살때 럭키박스(선착순 100명)"
          width={355}
          height={27}
        />
      </Link>
    </div>
  );
}

export default TopBanner;
