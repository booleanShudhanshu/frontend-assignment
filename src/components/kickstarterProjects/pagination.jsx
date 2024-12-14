import React from "react";
import "./styles.css";
import usePaginationRange, { DOTS } from "./usePaginationRange";
const Pagination = ({ totalCount, currentPage, onPageChange, pageSize }) => {
  const paginationRange = usePaginationRange({
    currentPage,
    totalCount,
    siblingCount: 1,
    pageSize,
  });
  const onPrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const onNext = () => {
    if(currentPage < Math.ceil(totalCount/pageSize))
    onPageChange(currentPage + 1);
  };
 

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul
      className={"pagination-container"}
      role="navigation"
      aria-label="Pagination"
    >
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
        <div className="arrow left" />
      </li>
      {paginationRange.map((pageNumber, index) => {
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
        <div className="arrow right" />
      </li>
    </ul>
  );
};

export default Pagination;
