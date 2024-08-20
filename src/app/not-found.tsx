import Page from "@/components/common/Page/Page";
import Image from "next/image";
import Link from "next/link";

function NotFound() {
  return (
    <Page>
      <div className="flex justify-center items-center py-[100px]">
        <div className="flex flex-col items-center">
          <Image src="/img/icon-404error.png" alt="404에러" width={105} height={105} />
          <p className="text-gray-3 text-[24px] mt-[20px]">페이지를 찾을 수 없어요!</p>
          <Link
            href="/"
            className="py-[10px] px-[18px] border border-main-8 bg-white text-main-8 text-[20px] mt-[64px] rounded-full"
          >
            홈 화면으로 돌아가기
          </Link>
        </div>
      </div>
    </Page>
  );
}

export default NotFound;
