"use client";
import { Viewer } from "@toast-ui/react-editor";

function GroupContent({ content }: { content: string }) {
  return <Viewer initialValue={content} />;
}

export default GroupContent;
