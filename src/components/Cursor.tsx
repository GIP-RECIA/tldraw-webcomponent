import type { TLUser } from '@tldraw/core';
import { memo } from 'react';

export type CursorComponent<T = any> = (props: Pick<TLUser<T>, 'id' | 'color' | 'metadata'>) => any;

export const Cursor: CursorComponent = memo(({ color }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 35" fill="none" fillRule="evenodd">
      <g fill="rgba(0,0,0,.2)" transform="translate(1,1)">
        <path d="m12 24.4219v-16.015l11.591 11.619h-6.781l-.411.124z" />
        <path d="m21.0845 25.0962-3.605 1.535-4.682-11.089 3.686-1.553z" />
      </g>
      <g fill="white">
        <path d="m12 24.4219v-16.015l11.591 11.619h-6.781l-.411.124z" />
        <path d="m21.0845 25.0962-3.605 1.535-4.682-11.089 3.686-1.553z" />
      </g>
      <g fill={color}>
        <path d="m19.751 24.4155-1.844.774-3.1-7.374 1.841-.775z" />
        <path d="m13 10.814v11.188l2.969-2.866.428-.139h4.768z" />
      </g>
    </svg>
  );
});

export const CustomCursor: CursorComponent = ({ color, metadata }) => {
  return (
    <div
      style={{
        display: 'flex',
        width: 'fit-content',
        alignItems: 'center',
        gap: 8,
      }}
    >
      <div
        style={{
          width: 12,
          height: 12,
          aspectRatio: 1,
          background: color,
          borderRadius: '100%',
        }}
      />
      {metadata?.name != undefined && (
        <div
          style={{
            // whiteSpace: "nowrap",
            background: 'white',
            padding: '4px 8px',
            borderRadius: 4,
          }}
        >
          {metadata.name}
        </div>
      )}
    </div>
  );
};
