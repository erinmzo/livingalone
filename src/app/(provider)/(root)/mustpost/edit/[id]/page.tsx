import Page from "@/components/common/Page/Page";
import MustEditForm from "@/components/mustpost/edit/MustEditForm";
import MustTopBtn from "@/components/mustpost/TopButton/MustTopBtn";

function MustEditPage({ params }: { params: { id: string } }) {
  return (
    <Page>
      <MustEditForm params={params} />
      <MustTopBtn />
    </Page>
  );
}

export default MustEditPage;
