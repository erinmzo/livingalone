import Page from "@/components/common/Page/Page";
import TopButton from "@/components/common/button/TopButton";
import MustList from "@/components/mustpost/list/MustList";

function MustListPage() {
  return (
    <Page>
      <MustList />
      <TopButton />
    </Page>
  );
}

export default MustListPage;
