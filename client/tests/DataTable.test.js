import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import DataTable from "../src/components/DataTable/DataTable";

const sampleData = [
  { id: 0, organization: "Triviality", Position: "CEO", Status: "Accepted" },
];
const headers = ["#", "Organization", "Position", "Status"];

describe("DataTable", () => {
  it("renders the component with the expected text", () => {
    render(
      <DataTable
        header={headers}
        data={sampleData}
        displayedData={sampleData}
      />
    );
    expect(screen.getByText("Organization")).toBeInTheDocument();
  });
});

// run tests: npm test in client directory
