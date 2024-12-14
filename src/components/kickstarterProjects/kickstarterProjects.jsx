import React, { useState, useEffect, useMemo } from "react";
import { fetchProjectsData } from "../../utils/kickstarterPropject";
import Pagination from "./pagination";
import "./styles.css";
import PageSizeDropdown from "./pagesize";
import { COLUMNS } from "./constants";
import Loading from "../partials/loading";
import Error from "../partials/error";

const KickstarterProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [currentPageData, setCurrentPageData] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const data = await fetchProjectsData();
        setProjects(data);
        setCurrentPageData(data.slice(0, 5));
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    /**
     * fetch all projct data and handle pagination
     */
    fetchProjects();
  }, []);

  /**
   * return data of particular page based on page number and page size
   */
  const getPageData = (pageNumber, page_size, data) => {
    const startIndex = (pageNumber - 1) * page_size;
    const endIndex = startIndex + page_size;
    const pageData = data.slice(startIndex, endIndex);

    return pageData;
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setCurrentPageData(getPageData(page, pageSize, projects));
  };

  const handlePageSizeChange = (event) => {
    let size = Number(event.target.value);
    setPageSize(size);
    setCurrentPage(1);
    setCurrentPageData(getPageData(1, size, projects));
  };
  /**
   * Calculate maximum length of values of "percentage.funded" and "amt.pledged" for startPad of whitespace
   */
  const maxLength = useMemo(() => {
    let maxPercentageLength = 0;
    let maxAmountLength = 0;

    currentPageData.forEach((d) => {
      maxPercentageLength = Math.max(
        maxPercentageLength,
        d["percentage.funded"].toString().length
      );
      maxAmountLength = Math.max(
        maxAmountLength,
        d["amt.pledged"].toString().length
      );
    });

    return {
      "percentage.funded": maxPercentageLength,
      "amt.pledged": maxAmountLength,
    };
  }, [currentPageData]);

  if (loading) return <Loading message="Loading projects data..." />;
  if (error) return <Error error={error} />;

  return (
    <div className="kickstarter-projects">
      <p className="kickstarter-projects-heading">
        <a href="https://www.saaslabs.co/" target="_blank" rel="noreferrer">
        <img
          src="https://cdn.prod.website-files.com/60c6002b3fee00bd705d0f75/6101cde41f263fe014585994_Frame%205194.png"
          alt="company-logo"
        />
        </a>
        Kickstarter Projects
      </p>
      <div className="table-contaner">
        <table
          className="project-table"
          aria-label="Kickstarter Projects Table"
          role="grid"
          data-testid="kickstarter-projects-table"
        >
          <thead>
            <tr>
              {COLUMNS.map((col, index) => (
                <th key={col.key + index} scope="col" role={"columnheader"}>
                  {col.display_name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentPageData.map((project) => (
              <tr key={project["s.no"]}>
                {COLUMNS.map((col) => (
                  <td
                    data-testid={`${col.key}-${project[col.key]}`}
                    role="cell"
                    aria-label={col.display_name}
                  >
                    {col.formatter
                      ? col.formatter(project[col.key], maxLength[col.key])
                      : project[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="footer">
        <Pagination
          totalCount={projects.length}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          pageSize={pageSize}
        />
        <PageSizeDropdown
          pageSize={pageSize}
          onPageSizeChange={handlePageSizeChange}
        />
      </div>
    </div>
  );
};

export default KickstarterProjects;
