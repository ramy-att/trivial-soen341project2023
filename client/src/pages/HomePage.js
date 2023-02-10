import React from "react";
import DataTable from "../components/DataTable/DataTable";
const HomePage = () => {
  return (
    <DataTable
      header={["ID", "Name", "Other", "Other2"]}
      data={[{ ID: "1", Name: "Ramy", Other: "OtherTxt", Other2: "Other2Txt" }]}
    />
  );
};

export default HomePage;
