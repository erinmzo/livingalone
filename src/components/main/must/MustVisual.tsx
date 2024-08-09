import Image from "next/image";

function MustVisual() {
  return (
    <div className="bg-green-1 flex items-center justify-center">
      <div className="container mx-auto lg:max-w-[1024px] flex justify-center">
        <div className="hidden md:block relative py-[60px] px-0">
          <Image
            src="/img/main-visual-must.png"
            alt="쉿 너만 알고 있어, 이건 말이야"
            width={500}
            height={476}
            priority
          />
          <Image
            src="/img/main-visual-must-icon.svg"
            width={79}
            height={76}
            alt="별표"
            className="absolute right-[2%] lg:right-0 top-[43%] animate-spin"
          />
        </div>
        <div className="block md:hidden py-[60px]">
          <Image
            src="/img/mo-main-visual-must.png"
            alt="쉿 너만 알고 있어, 이건 말이야"
            width={294}
            height={0}
            priority
          />
        </div>
      </div>
    </div>
  );
}

export default MustVisual;
