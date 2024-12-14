import { useMemo } from 'react';

export const DOTS = '...';

const range = (start, end) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, index) => index + start);
};

 const usePaginationRange = ({
  totalCount,
  pageSize,
  siblingCount=1,
  currentPage
}) => {
  // Memoizing the pagination range to avoid recalculating on every render
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize); // total number of page
    const totalPageNumbers = siblingCount + 5;
    // If the total number of pages to show is greater than or equal to total pages, show all pages
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }
    // Calculate the left and right sibling page numbers
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );
    // Check whether to show dots for left and right
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;
// If no left dots, but right dots are needed
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }
// If left dots are needed, but no right dots
    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }
 // If both left and right dots are needed
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [totalCount, pageSize, siblingCount, currentPage]);

  return paginationRange;
};


export default usePaginationRange