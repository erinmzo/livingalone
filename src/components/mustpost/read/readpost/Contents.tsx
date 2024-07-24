import React from "react";

interface ContentsProps {
  content: string;
}

function Contents({ content }: ContentsProps) {
  return (
    <div className="py-6 pl-2">
      <p>{content}</p>
    </div>
  );
}

export default Contents;
