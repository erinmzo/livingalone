import Page from "@/components/common/Page/Page";
import Read from "@/components/mustpost/read/Read";
import MustTopBtn from "@/components/mustpost/TopButton/MustTopBtn";
type Props = {
  params: { id: string };
};
function MustReadPage({ params }: Props) {
  return (
    <Page>
      <Read params={params} />
      <MustTopBtn />
    </Page>
  );
}

export default MustReadPage;
