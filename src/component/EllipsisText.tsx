import React from 'react';

interface Props {
  text: string;
  width?: string;
}
export default function EllipsisText({ text, width }: Props) {
  return (
    <div
      style={{
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        width: `${width ? width : '120'}px`,
      }}
      title={text}
    >
      {text}
    </div>
  );
}
