import Page from "@/components/common/Page/Page";
import dynamic from "next/dynamic";

function EditorPage() {
  const NoSsrWysiwyg = dynamic(() => import("@/components/test/EditorModule"), { ssr: false });

  return (
    <Page>
      <NoSsrWysiwyg />
    </Page>
  );
}

export default EditorPage;
