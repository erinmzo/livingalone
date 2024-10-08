import Image from "next/image";
import Link from "next/link";

type MainSectionTitleProps = {
  title: string;
  content: string;
  link: string;
};
function MainSectionTitle({ title, content, link }: MainSectionTitleProps) {
  return (
    <div className="flex justify-center md:justify-between items-end pb-[24px] md:px-[16px] lg:px-0">
      <div className="md:ml-[4px] w-[200px] md:w-full text-center md:text-left">
        <h3 className="text-[26px] font-bold">{title}</h3>
        <p className="text-[14px] text-gray-4 mt-1">{content}</p>
      </div>
      <div className="hidden md:block border border-main-8 rounded-full md:min-w-[108px]">
        <Link
          className="block text-[16px] font-bold text-main-8 flex items-center py-[8px] px-[18px]"
          href={link}
        >
          전체보기
          <Image
            src="/img/icon-right.svg"
            alt="&gt;"
            width={7}
            height={11}
            className="w-[7px] h-[11px] ml-2"
          />
        </Link>
      </div>
    </div>
  );
}

export default MainSectionTitle;
