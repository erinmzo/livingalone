import Page from "@/components/common/Page/Page";
import TopButton from "@/components/common/button/TopButton";
import PostList from "@/components/grouppost/list/PostList";

function GroupListPage() {
  return (
    <Page>
      <PostList />
      <TopButton />
    </Page>
  );
}

export default GroupListPage;
