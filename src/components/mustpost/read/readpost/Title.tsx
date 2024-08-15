import Wish from "@/components/common/Wish";

interface TitleProps {
  postId: string;
  title: string;
}
function Title({ title, postId }: TitleProps) {
  return (
    <div className="flex flex-row items-center ml-1 md:ml-0 mb-1 md:mb-6">
      {/* 제목부분 */}
      <div className="shrink-0 hidden md:block">
        <Wish postId={postId} />
      </div>
      <h2 className="md:ml-2 mb-1 md:mb-0 font-bold text-black text-[22px] md:text-2xl">
        {title}
      </h2>
    </div>
  );
}

export default Title;
