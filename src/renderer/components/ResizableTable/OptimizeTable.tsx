import { ReactElement, useCallback, useState } from 'react';

interface OptimizeTableProps {
  items: unknown[];
  rowHeight: number;
  headers: { name: string; icon?: ReactElement; initialSize?: number }[];
  renderCells: (rowNumber: number, cellNumber: number) => ReactElement;
}

export default function OptimizeTable({
  items,
  rowHeight,
  renderCells,
  headers,
}: OptimizeTableProps) {
  const [visibleState, setVisibleState] = useState<{
    rowStart: number;
    rowEnd: number;
  }>({
    rowStart: 0,
    rowEnd: 0,
  });

  const onScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
      const rowStart = Math.floor(e.currentTarget.scrollTop / rowHeight);
      const rowEnd =
        rowStart + Math.ceil(e.currentTarget.clientHeight / rowHeight);

      setVisibleState({
        rowStart,
        rowEnd,
      });
    },
    [setVisibleState, rowHeight]
  );

  return (
    <div
      className="scroll"
      onScroll={onScroll}
      style={{
        position: 'relative',
        overflow: 'scroll',
        width: '100%',
        height: '100%',
      }}
    >
      <div style={{ height: rowHeight * (1 + items.length) + 'px' }} />
      <div
        style={{ position: 'absolute', top: visibleState.rowStart * rowHeight }}
      ></div>
    </div>
  );
}
