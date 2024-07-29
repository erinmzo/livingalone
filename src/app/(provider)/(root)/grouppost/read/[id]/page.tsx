import InnerLayout from "@/components/common/Page/InnerLayout";
import Page from "@/components/common/Page/Page";
import GroupDetail from "@/components/grouppost/read/GroupDetail";

type Props = {
  params: { id: string };
};
function GroupReadPage({ params }: Props) {
  return (
    <Page>
      <GroupDetail params={params} />
    </Page>
  );
}

export default GroupReadPage;
