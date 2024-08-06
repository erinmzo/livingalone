import Page from "@/components/common/Page/Page";
import TopButton from "@/components/common/button/TopButton";
import CommentsList from "@/components/mustpost/comments/CommentsList";

import Read from "@/components/mustpost/read/Read";
type Props = {
  params: { id: string };
};
export const revalidate = 0;
function MustReadPage({ params }: Props) {
  return (
    <Page>
      <Read params={params} />
      <TopButton />
    </Page>
  );
}

export default MustReadPage;
