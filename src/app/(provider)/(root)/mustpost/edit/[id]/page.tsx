import Page from "@/components/common/Page/Page";
import TopButton from "@/components/common/button/TopButton";
import MustEditForm from "@/components/mustpost/edit/MustEditForm";

function MustEditPage({ params }: { params: { id: string } }) {
  return (
    <Page>
      <MustEditForm params={params} />
      <TopButton />
    </Page>
  );
}

export default MustEditPage;
