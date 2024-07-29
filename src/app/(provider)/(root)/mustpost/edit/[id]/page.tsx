import Page from "@/components/common/Page/Page";
import MustEditForm from "@/components/mustpost/edit/MustEditForm";

function MustEditPage({ params }: { params: { id: string } }) {
  return (
    <Page>
      <MustEditForm params={params} />
    </Page>
  );
}

export default MustEditPage;
