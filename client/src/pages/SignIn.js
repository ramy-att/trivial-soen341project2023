import React from "react";
import DataTable from "../components/DataTable/DataTable.js"
const SignIn = () => {
  return  <DataTable
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
      Item4: "Item400",
    },
  ]}
  maxRows={2}
  /> ;
};
export default SignIn;
