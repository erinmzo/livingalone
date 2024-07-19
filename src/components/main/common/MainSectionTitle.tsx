import Link from "next/link";

type MainSectionTitleProps = {
  title: string;
  content: string;
  link: string;
};
function MainSectionTitle({ title, content, link }: MainSectionTitleProps) {
  return (
    <div className="flex justify-between items-end pb-[20px]">
      <div className="ml-[5px]">
        <h3 className="text-[26px] font-bold">{title}</h3>
        <p className="text-[14px] text-[#818181]">{content}</p>
      </div>
      <div className="border border-black rounded-full py-[11px] px-[32px]">
        <Link className="block text-[14px]" href={link}>
          전체보기&gt;
        </Link>
      </div>
    </div>
  );
}

export default MainSectionTitle;
