import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import "./DataTable.css";
import { ArrowRight, ArrowLeft } from "react-bootstrap-icons";

const DataTable = (props) => {
  const {
    data,
    displayedData,
    header,
    footer,
    maxRows = 15,
    pageWidth,
    ...rest
  } = props;
  const [currentPage, setCurrentPage] = useState(0);
  const [currentData, setCurrentData] = useState([...data]);
  const [numberPages, setNumberPages] = useState(
    data.length / maxRows > 1 ? Math.ceil(data.length / maxRows) : 1
  );
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const start = currentPage * maxRows;
    const end = currentPage * maxRows + maxRows;
    const filteredData =
      searchTerm === ""
        ? displayedData
        : displayedData.filter((row) =>
            Object.values(row).some((val) =>
              String(val).toLowerCase().includes(searchTerm.toLowerCase())
            )
          );
    setNumberPages(
      filteredData.length / maxRows > 1
        ? Math.ceil(filteredData.length / maxRows)
        : 1
    );
    setCurrentData(filteredData.slice(start, end) || filteredData);
  }, [maxRows, currentPage, displayedData, searchTerm]);

  return (
    <div className="DataTable" style={{ width: pageWidth || "90%" }}>
      <div className="searchBar">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <Table bordered hover responsive {...rest}>
        <thead>
          {/* Header */}
          <tr>
            {header &&
              header.map((itm, idx) => (
                <th key={`DataTable-header-${idx}`}>{itm}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {/* Body filled with data */}
          {currentData &&
            currentData.map((row, i) => (
              <tr key={`DataTable-row-${i}`}>
                {Object.keys(row).map((keyName, j) => (
                  <td key={`DataTable-row-${i}-col-${j}`}>{row[keyName]}</td>
                ))}
              </tr>
            ))}
        </tbody>
        <tfoot>
          <tr>
            {footer &&
              footer.map((itm, idx) => (
                <th key={`DataTable-footer-${idx}`}>{itm}</th>
              ))}
          </tr>
        </tfoot>
      </Table>
      <div className="navigator">
        <div>
          {currentPage > 0 && (
            <ArrowLeft
              size={30}
              onClick={() => {
                setCurrentPage(currentPage - 1);
              }}
            />
          )}
        </div>
        <div>
          <span className="pageIden">
            Page: {currentPage + 1}/{numberPages}
          </span>
          <div className="arrowCont">
            {currentPage < numberPages - 1 && (
              <ArrowRight
                size={30}
                onClick={() => {
                  setCurrentPage(currentPage + 1);
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default DataTable;
