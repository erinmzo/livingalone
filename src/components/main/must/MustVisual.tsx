import Image from "next/image";

function MustVisual() {
  return (
    <div className="bg-green-1 flex items-center justify-center">
      <div className="container mx-auto max-w-[1024px] flex justify-center">
        <div className="relative py-[60px] px-[16px] lg:px-0">
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
      </div>
    </div>
  );
}

export default MustVisual;
