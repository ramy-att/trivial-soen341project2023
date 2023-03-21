import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import "./DataTable.css";
import { ArrowRight, ArrowLeft } from "react-bootstrap-icons";

const DataTable = (props) => {
  /* data: [{},{},{}];
    - number of rows = length of array
    - number of columns = length of element object - we should make all elems
    the same size
    - can take custom components or HTML 

    header: ["Title0","Title1",...]
    length of header gives the number of columns

    footer: ["Item0","Item1",...]

    maxRows: number of rows to display @default is 15
   */
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
  useEffect(() => {
    const start = currentPage * maxRows;
    const end = currentPage * maxRows + maxRows;
    setCurrentData(displayedData.slice(start, end) || displayedData);
  }, [maxRows, currentPage, displayedData]);

  // console.log(displayedData);
  // console.log(data);
  return (
    <div className="DataTable" style={{ width: pageWidth || "90%" }}>
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

{
  /* Sample Usage */
}
{
  /* <DataTable
header={["Header0", "Header1", "Header2", "Header3", "Header4"]}
footer={["Footer0", "Footer1", "Footer2", "Footer3", "Footer4"]}
data={[
  {
    Item0: "Item0",
    Item1: "Item1",
    Item2: "Item2",
    Item3: "Item3",
    Item4: "Item4",
  },
  {
    Item0: "Item0",
    Item1: "Item1",
    Item2: "Item2",
    Item3: "Item3",
    Item4: "Item4",
  },
  {
    Item0: "Item0",
    Item1: "Item1",
    Item2: "Item2",
    Item3: "Item3",
    Item4: "Item4",
  },
  {
    Item0: "Item0",
    Item1: "Item1",
    Item2: "Item2",
    Item3: "Item3",
    Item4: "Item4",
  },
]}
maxRows={2}
/> */
}
