import Image from "next/image";

function GroupVisual() {
  return (
    <div className="bg-main-2 flex items-center justify-center">
      <div className="container mx-auto max-w-[1024px] flex justify-center">
        <div className="hidden md:block relative py-[60px] px-0">
          <Image
            src="/img/main-visual-group.webp"
            alt="혼자 살 때 라는 건 우리가 필요한 법"
            width={0}
            height={0}
            className="w-[500px] h-auto"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO8Wg8AAi8BVvC05AcAAAAASUVORK5CYII="
          />
          <Image
            src="/img/main-visual-group-icon-white.svg"
            width={79}
            height={79}
            alt="반짝이"
            className="w-[79px] h-[79px] absolute left-[3%] lg:left-0 top-[10%]"
          />
          <Image
            src="/img/main-visual-group-icon.svg"
            width={79}
            height={79}
            alt="반짝이"
            className="w-[79px] h-[79px] absolute left-[3%] lg:left-0 top-[10%] animate-pulse"
          />
        </div>
        <div className="block md:hidden py-[60px]">
          <Image
            src="/img/mo-main-visual-group.webp"
            alt="혼자 살 때 라는 건 우리가 필요한 법"
            width={0}
            height={0}
            className="w-[294px] h-auto"
          />
        </div>
      </div>
    </div>
  );
}

export default GroupVisual;
