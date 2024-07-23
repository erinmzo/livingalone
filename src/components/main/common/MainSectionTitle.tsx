import Image from "next/image";
import Link from "next/link";

type MainSectionTitleProps = {
  title: string;
  content: string;
  link: string;
};
function MainSectionTitle({ title, content, link }: MainSectionTitleProps) {
  return (
    <div className="flex justify-center md:justify-between items-end pb-[20px] sm:px-[16px] lg:px-0">
      <div className="md:ml-[5px] w-[200px] md:w-full text-center md:text-left">
        <h3 className="text-[26px] font-bold">{title}</h3>
        <p className="text-[14px] text-[#818181]">{content}</p>
      </div>
      <div className="hidden md:block border border-black rounded-full py-[10px] px-[30px] md:min-w-[131px]">
        <Link className="text-[14px] flex items-center" href={link}>
          전체보기
          <Image src="/img/icon-right.png" alt="" width={20} height={20} />
        </Link>
      </div>
    </div>
  );
}

export default MainSectionTitle;
