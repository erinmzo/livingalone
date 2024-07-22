import Page from "@/components/common/Page/Page";
import GroupDetail from "@/components/grouppost/read/GroupDetail";

type Props = {
  params: { id: string };
};
// TODO 좋은 방법
// export const revalidate = 0;
function GroupReadPage({ params }: Props) {
  return (
    <Page>
      <GroupDetail params={params} />
    </Page>
  );
}

export default GroupReadPage;
