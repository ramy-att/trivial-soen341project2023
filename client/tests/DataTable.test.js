import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import DataTable from "../src/components/DataTable/DataTable";

const sampleData = [
  { id: 0, organization: "Triviality", Position: "CEO", Status: "Accepted" },
  {
    id: 1,
    organization: "Kholio",
    Position: "BackEnd Devleoper",
    Status: "Pending",
  },
  {
    id: 2,
    organization: "Trivial Inc.",
    Position: "EMP2INTERN",
    Status: "Rejected",
  },
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
    expect(screen.getByText("#")).toBeInTheDocument();
    expect(screen.getByText("Position")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();

    // Check if data is rendered correctly
    expect(screen.getByText("Triviality")).toBeInTheDocument();
    expect(screen.getByText("CEO")).toBeInTheDocument();
    expect(screen.getByText("Accepted")).toBeInTheDocument();

    expect(screen.getByText("Kholio")).toBeInTheDocument();
    expect(screen.getByText("BackEnd Devleoper")).toBeInTheDocument();
    expect(screen.getByText("Pending")).toBeInTheDocument();

    expect(screen.getByText("Trivial Inc.")).toBeInTheDocument();
    expect(screen.getByText("EMP2INTERN")).toBeInTheDocument();
    expect(screen.getByText("Rejected")).toBeInTheDocument();
  });
});

// run tests: npm test in client directory
