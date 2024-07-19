import Image from "next/image";

function Wish() {
  return (
    <button className="absolute right-[20px] top-[20px]">
      <Image src="/img/icon-wish.png" alt="찜하기 버튼" width={32} height={32} />
    </button>
  );
}

export default Wish;
