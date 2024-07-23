import React from "react";

interface ContentsProps {
  content: string;
}

function Contents({ content }: ContentsProps) {
  return (
    <div>
      <p>{content}</p>
    </div>
  );
}

export default Contents;
