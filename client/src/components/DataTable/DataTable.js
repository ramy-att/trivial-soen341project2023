import React from "react";
import Table from "react-bootstrap/Table";

const DataTable = (props) => {
  /* data: [{},{},{}];
    number of rows = length of array
    nuumber of columns = length of element object - we should make all elems
    the same size
    
    header: ["Title0","Title1",...]
    length of header gives the number of columns
   */
  const { data, header } = props;
  const noRows = data && data.length;
  const noCols = header && Object.keys(header[0]).length;

  return (
    <Table striped bordered>
      <thead>
        {/* Header */}
        <tr>{header && header.map((itm) => <th>{itm}</th>)}</tr>
      </thead>
      <tbody>
        {/* Body filled with data */}
        {data &&
          data.map((row) => (
            <tr>
              {Object.keys(row).map((keyName) => (
                <td>{row[keyName]}</td>
              ))}
            </tr>
          ))}
      </tbody>
    </Table>
  );
};
export default DataTable;
