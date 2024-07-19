import GroupPostCard from "@/components/grouppost/list/GroupPostCard";
import MainSectionTitle from "../common/MainSectionTitle";

function GroupSection() {
  return (
    <div className="container mx-auto max-w-[1024px] pt-[58px]">
      <MainSectionTitle
        title="같이 사 공구템"
        content="공동구매를 통해 자취에 필요한 물품을 저렴한 금액에 구매해보세요"
        link="/grouppost"
      />
      <ul>
        <GroupPostCard />
      </ul>
    </div>
  );
}

export default GroupSection;
