import Wish from "@/components/common/Wish";

interface TitleProps {
  postId: string;
  title: string;
}
function Title({ title, postId }: TitleProps) {
  return (
    <div className="flex flex-row items-center mb-6">
      {/* 제목부분 */}
      <Wish postId={postId} />
      <h2 className="ml-2 font-bold text-2xl">{title}</h2>
    </div>
  );
}

export default Title;
