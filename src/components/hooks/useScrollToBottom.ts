import { useCallback, useRef, useState } from "react";

export const useScrollToBottom = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isAtBottom, setIsAtBottom] = useState(false);

  const checkScrollPosition = useCallback(() => {
    if (!containerRef.current) {
      setIsAtBottom(false);
      return;
    }

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const isBottom = Math.abs(scrollHeight - scrollTop - clientHeight) < 100;
    setIsAtBottom(isBottom);
  }, [containerRef]);

  //get scrolling aware of all others procedures

  const scrollToBottom = useCallback(() => {
    if (!containerRef.current) return;
    return new Promise((resolve) => {
      containerRef.current?.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });

      setTimeout(resolve, 300);
    });
  }, []);

  return {
    containerRef,
    isAtBottom,
    checkScrollPosition,
    scrollToBottom,
    setIsAtBottom,
  };
};
