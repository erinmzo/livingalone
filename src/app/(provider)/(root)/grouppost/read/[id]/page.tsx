import { getGroupDetail } from "@/apis/grouppost";
import InnerLayout from "@/components/common/Page/InnerLayout";
import Page from "@/components/common/Page/Page";
import TopButton from "@/components/common/button/TopButton";
import GroupDetail from "@/components/grouppost/read/GroupDetail";
import type { Metadata } from "next";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params;
  const data = await getGroupDetail(id);
  return {
    title: `${data?.title}`,
  };
}

function GroupReadPage({ params }: Props) {
  return (
    <Page>
      <GroupDetail params={params} />
      <TopButton />
    </Page>
  );
}

export default GroupReadPage;
