import Page from "@/components/common/Page/Page";
import Read from "@/components/mustpost/read/Read";
type Props = {
  params: { id: string };
};
function MustReadPage({ params }: Props) {
  return (
    <Page>
      <Read params={params} />
    </Page>
  );
}

export default MustReadPage;
