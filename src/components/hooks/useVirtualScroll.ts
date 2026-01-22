import { useCallback, useRef, useState } from "react";
import { List } from "react-virtualized";

export const useVirtualScroll = () => {
  const [isAtBottom, setIsAtBottom] = useState(true);
  const listRef = useRef<List>(null);

  const handleScroll = useCallback(
    ({
      scrollTop,
      scrollHeight,
    }: {
      scrollTop: number;
      scrollHeight: number;
    }) => {
      if (!listRef.current) return;
      const grid = listRef.current.Grid;
      if (!grid) return;
      const threshold = 530;
      setIsAtBottom(scrollHeight - scrollTop <= threshold);
    },
    [],
  );

  const scrollToBottom = useCallback(() => {
    if (!listRef.current || !(listRef.current as any).scrollToRow) return;
    return new Promise((resolve) => {
      listRef?.current?.scrollToRow(Infinity);

      setTimeout(resolve, 300);
    });
  }, []);

  const scrollToRow = useCallback((rowIndex: number) => {
    if (listRef.current && listRef.current.scrollToRow) {
      listRef.current.scrollToRow(rowIndex);
    }
  }, []);

  return {
    listRef,
    isAtBottom,
    handleScroll,
    scrollToBottom,
    scrollToRow,
    setIsAtBottom,
  };
};
