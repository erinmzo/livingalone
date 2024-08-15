import Page from "@/components/common/Page/Page";
import TopButton from "@/components/common/button/TopButton";
import GroupPostList from "@/components/grouppost/list/GroupPostList";

function GroupListPage() {
  return (
    <Page>
      <GroupPostList />
      <TopButton />
    </Page>
  );
}

export default GroupListPage;
