import React from "react";
import "./styles.css";

const PageSizeDropdown = ({ pageSize, onPageSizeChange }) => {
  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.target.click();
    }
  };
  return (
    <div className="page-size-container">
      <label htmlFor="dropdown">Item per page:</label>
      <select
        data-testid="page-size"
        aria-label="Select the number of items per page"
        id="dropdown"
        tabIndex="0"
        autoFocus
        className="page-size-select"
        value={pageSize}
        onChange={onPageSizeChange}
        onKeyDown={handleKeyDown}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
      </select>
    </div>
  );
};

export default PageSizeDropdown;
