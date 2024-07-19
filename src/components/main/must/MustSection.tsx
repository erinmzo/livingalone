import MustPostCard from "@/components/mustpost/list/MustPostCard";
import MainSectionTitle from "../common/MainSectionTitle";

function MustSection() {
  // const { data, isPending, isError } = useQuery({
  //   queryKey: ["mustpost"],
  //   queryFn: getMustPostOnMain,
  // });

  return (
    <div className="container mx-auto max-w-[1024px] pt-[58px]">
      <MainSectionTitle
        title="구해줘 자취템"
        content="자취에 필요한 다양한 아이템을 자랑하고 추천해보세요"
        link="/mustpost"
      />
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <MustPostCard />
      </ul>
    </div>
  );
}

export default MustSection;
