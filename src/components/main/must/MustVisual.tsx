import Image from "next/image";

function MustVisual() {
  return (
    <div className="bg-green-1 flex items-center justify-center">
      <div className="container mx-auto lg:max-w-[1024px] flex justify-center">
        <div className="hidden md:block relative py-[60px] px-0">
          <Image
            src="/img/main-visual-must.png"
            alt="쉿 너만 알고 있어, 이건 말이야"
            width={0}
            height={0}
            priority
            className="w-[500px] h-auto"
          />
          <Image
            src="/img/main-visual-must-icon.svg"
            width={79}
            height={76}
            alt="별표"
            className="w-[79px] h-[76px] absolute right-[2%] lg:right-0 top-[43%] animate-spin"
          />
        </div>
        <div className="block md:hidden py-[60px]">
          <Image
            src="/img/mo-main-visual-must.png"
            alt="쉿 너만 알고 있어, 이건 말이야"
            width={294}
            height={0}
            priority
            className="w-[294px] h-auto"
          />
        </div>
      </div>
    </div>
  );
}

export default MustVisual;
