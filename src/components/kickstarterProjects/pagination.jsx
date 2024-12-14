import React from "react";
import "./styles.css";
import usePaginationRange, { DOTS } from "./usePaginationRange";
const Pagination = ({ totalCount, currentPage, onPageChange, pageSize }) => {
  // Get the current page date based on currentPage, totalCount, pageSize, and siblingCount
  const currentPageData = usePaginationRange({
    currentPage,
    totalCount,
    siblingCount: 1, // Number of sibling pages shown around the current page (exception is start and end page)
    pageSize,
  });
  const onPrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const onNext = () => {
    if (currentPage < Math.ceil(totalCount / pageSize)) {
      onPageChange(currentPage + 1);
    }
  };

  let lastPage = currentPageData[currentPageData.length - 1];
  return (
    <ul
      className={"pagination-container"}
      role="navigation"
      aria-label="Pagination"
    >
      {/* Previous button  */}
      <li
        className={
          currentPage === 1
            ? "pagination-item pagination-item-disabled"
            : "pagination-item"
        }
        onClick={onPrevious}
        aria-disabled={currentPage === 1}
        tabIndex={0}
        role="button"
        data-testid={"pagination-prev"}
        aria-label="Previous Page"
        onKeyDown={(e) =>
          e.key === "Enter" || e.key === " " ? onPrevious() : null
        }
      >
        <div>&lt;</div>
      </li>
      {currentPageData.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <li
              key={pageNumber + index}
              className="pagination-item dots"
              aria-hidden="true"
            >
              &#8230;
            </li>
          );
        }

        return (
          <li
            key={pageNumber + index}
            className={
              pageNumber === currentPage
                ? "pagination-item pagination-item-active"
                : "pagination-item"
            }
            data-testid={`pagination-${pageNumber}`}
            onClick={() => onPageChange(pageNumber)}
            onKeyDown={(e) =>
              e.key === "Enter" || e.key === " "
                ? onPageChange(pageNumber)
                : null
            }
            tabIndex={0}
            role="button"
            aria-current={pageNumber === currentPage ? "page" : undefined}
            aria-label={`Page ${pageNumber}`}
          >
            {pageNumber}
          </li>
        );
      })}
      {/* Next button  */}
      <li
        tabIndex={0}
        className={
          currentPage === lastPage
            ? "pagination-item pagination-item-disabled"
            : "pagination-item"
        }
        data-testid={"pagination-next"}
        onClick={onNext}
        onKeyDown={(e) =>
          e.key === "Enter" || e.key === " " ? onNext() : null
        }
        aria-disabled={currentPage === lastPage}
        role="button"
        aria-label="Next Page"
      >
        <div>&gt;</div>
      </li>
    </ul>
  );
};

export default Pagination;
