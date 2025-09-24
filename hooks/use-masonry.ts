import { useEffect, useState, useCallback } from "react";

interface MasonryItem {
  id: string;
  height: number;
  element: HTMLElement;
}

interface UseMasonryOptions {
  columnWidth: number;
  gap: number;
  breakpoints?: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
}

export const useMasonry = (
  containerRef: React.RefObject<HTMLElement>,
  items: any[],
  options: UseMasonryOptions
) => {
  const [columns, setColumns] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);

  const breakpoints = options.breakpoints || {
    mobile: 1,
    tablet: 2,
    desktop: 3,
  };

  const calculateColumns = useCallback(() => {
    if (!containerRef.current) return;

    const containerWidth = containerRef.current.offsetWidth;

    if (containerWidth < 768) {
      setColumns(breakpoints.mobile);
    } else if (containerWidth < 1024) {
      setColumns(breakpoints.tablet);
    } else {
      setColumns(breakpoints.desktop);
    }
  }, [breakpoints]);

  const layoutMasonry = useCallback(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const children = Array.from(container.children) as HTMLElement[];

    if (children.length === 0) return;

    // Initialize column heights array
    const columnHeights = new Array(columns).fill(0);

    children.forEach((child, index) => {
      // Find the shortest column
      const shortestColumnIndex = columnHeights.indexOf(
        Math.min(...columnHeights)
      );

      // Calculate position
      const x = shortestColumnIndex * (options.columnWidth + options.gap);
      const y = columnHeights[shortestColumnIndex];

      // Position the element
      child.style.position = "absolute";
      child.style.left = `${x}px`;
      child.style.top = `${y}px`;
      child.style.width = `${options.columnWidth}px`;
      child.style.transition = "all 0.3s ease";

      // Update column height
      columnHeights[shortestColumnIndex] += child.offsetHeight + options.gap;
    });

    // Set container height
    const maxHeight = Math.max(...columnHeights);
    container.style.height = `${maxHeight}px`;
    container.style.position = "relative";

    setIsLoaded(true);
  }, [columns, options.columnWidth, options.gap]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      calculateColumns();
    };

    window.addEventListener("resize", handleResize);
    calculateColumns();

    return () => window.removeEventListener("resize", handleResize);
  }, [calculateColumns]);

  // Layout when columns or items change
  useEffect(() => {
    const timer = setTimeout(() => {
      layoutMasonry();
    }, 100); // Small delay to ensure images are loaded

    return () => clearTimeout(timer);
  }, [columns, items, layoutMasonry]);

  return {
    columns,
    isLoaded,
    relayout: layoutMasonry,
  };
};

