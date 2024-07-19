import Wish from "@/components/common/Wish";
import Image from "next/image";
import Link from "next/link";

function MustPostCard() {
  return (
    <li>
      <Link href="/">
        <div>
          <Image src="/img/test.png" alt="test" width={100} height={100} />
        </div>
        <div>
          <span>아이템명</span>
          <h4>글제목</h4>
        </div>
      </Link>
      <Wish />
    </li>
  );
}

export default MustPostCard;
