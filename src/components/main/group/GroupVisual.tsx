import Image from "next/image";

function GroupVisual() {
  return (
    <div className="bg-main-2 flex items-center justify-center">
      <div className="container mx-auto max-w-[1024px] flex justify-center">
        <div className="relative py-[60px] px-[16px] lg:px-0">
          <Image
            src="/img/main-visual-group.png"
            alt="쉿 너만 알고 있어, 이건 말이야"
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
            alt="별표"
            className="absolute left-[3%] lg:left-0 top-[10%] animate-pulse"
          />
        </div>
      </div>
    </div>
  );
}

export default GroupVisual;
