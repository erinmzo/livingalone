import Image from "next/image";

function Wish() {
  return (
    <button>
      <Image src="/img/icon-wish.png" alt="찜하기 버튼" width={32} height={32} />
    </button>
  );
}

export default Wish;
