import Page from "@/components/common/Page/Page";
import MustList from "@/components/mustpost/list/MustList";
import MustTopBtn from "@/components/mustpost/TopButton/MustTopBtn";

function MustListPage() {
  return (
    <Page>
      <MustList />
      <MustTopBtn />
    </Page>
  );
}

export default MustListPage;
