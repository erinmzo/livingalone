import { getMustPostDetail } from "@/apis/mustpost";
import Page from "@/components/common/Page/Page";
import TopButton from "@/components/common/button/TopButton";
import CommentsList from "@/components/mustpost/comments/CommentsList";

import Read from "@/components/mustpost/read/Read";
import { Metadata } from "next";
type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params;
  const data = await getMustPostDetail(id);
  return {
    title: `${data?.title}`,
  };
}

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
