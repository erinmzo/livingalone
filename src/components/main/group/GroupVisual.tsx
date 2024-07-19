import Image from "next/image";

function GroupVisual() {
  return (
    <div className="bg-[#d9d9d9] flex items-center justify-center">
      <div className="container mx-auto max-w-[1024px]">
        <div className="relative h-[480px]">
          <Image src="/img/main-visual-group.png" alt="쉿 어쩌구 메인 비주얼이야" fill className="object-cover" />
        </div>
      </div>
    </div>
  );
}

export default GroupVisual;
