"use client";

import { Viewer } from "@toast-ui/react-editor";

interface ContentsProps {
  content: string;
}

function Contents({ content }: ContentsProps) {
  return (
    <div className="pt-[45px] pl-2">
      <Viewer initialValue={content} />
    </div>
  );
}

export default Contents;
