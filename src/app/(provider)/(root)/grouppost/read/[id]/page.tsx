import InnerLayout from "@/components/common/Page/InnerLayout";
import Page from "@/components/common/Page/Page";
import TopButton from "@/components/common/button/TopButton";
import GroupDetail from "@/components/grouppost/read/GroupDetail";

type Props = {
  params: { id: string };
};
function GroupReadPage({ params }: Props) {
  return (
    <Page>
      <GroupDetail params={params} />
      <TopButton />
    </Page>
  );
}

export default GroupReadPage;
