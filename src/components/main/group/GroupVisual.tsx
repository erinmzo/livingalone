import Image from "next/image";

function GroupVisual() {
  return (
    <div className="bg-main-2 flex items-center justify-center">
      <div className="container mx-auto max-w-[1024px] flex justify-center">
        <div className="hidden md:block relative lg:py-[60px] px-[16px] lg:px-0">
          <Image
            src="/img/main-visual-group.png"
            alt="혼자 살 때 라는 건 우리가 필요한 법"
            width={500}
            height={476}
            priority
          />
          <Image
            src="/img/main-visual-group-icon-white.svg"
            width={79}
            height={76}
            alt="별표"
            className="absolute left-[3%] lg:left-0 top-[10%]"
          />
          <Image
            src="/img/main-visual-group-icon.svg"
            width={79}
            height={76}
            alt="반짝이"
            className="absolute left-[3%] lg:left-0 top-[10%] animate-pulse"
          />
        </div>
        <div className="block md:hidden py-[60px]">
          <Image
            src="/img/mo-main-visual-group.png"
            alt="혼자 살 때 라는 건 우리가 필요한 법"
            width={294}
            height={0}
            priority
          />
        </div>
      </div>
    </div>
  );
}

export default GroupVisual;
