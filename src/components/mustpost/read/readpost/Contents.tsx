"use client";

import { Viewer } from "@toast-ui/react-editor";

interface ContentsProps {
  content: string;
}

function Contents({ content }: ContentsProps) {
  return (
    <div className="py-6 pl-2">
      {/* <p>{content}</p> */}
      <Viewer initialValue={content} />
    </div>
  );
}

export default Contents;
