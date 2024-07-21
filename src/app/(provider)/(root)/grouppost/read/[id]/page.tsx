import Page from "@/components/common/Page/Page";
import GroupDetail from "@/components/grouppost/read/GroupDetail";

type Props = {
  params: { id: string };
};

function GroupReadPage({ params }: Props) {
  console.log(params);
  return (
    <Page>
      <GroupDetail params={params} />
    </Page>
  );
}

export default GroupReadPage;
