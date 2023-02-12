import React from "react";
import DataTable from "../components/DataTable/DataTable";
import Button from "../components/Buttons/Button";
const HomePage = () => {
  return (
    <DataTable
      header={[
        "Apply",
        "Term",
        "Title",
        "Organization",
        "Location",
        "Other",
        "Other",
      ]}
      data={[
        {
          Apply: <Button type="apply">Apply</Button>,
          Term: "Summer 2023",
          Title: "Frontend Intern",
          Organization: "Triviality",
          Location: "Remote",
          Other1: "Other",
          Other2: "Other2",
        },
        {
          Apply: <button>Apply</button>,
          Term: "Summer 2023",
          Title: "Frontend Intern",
          Organization: "Triviality",
          Location: "Remote",
          Other1: "Other",
          Other2: "Other2",
        },
        {
          Apply: <button>Apply</button>,
          Term: "Summer 2023",
          Title: "Frontend Intern",
          Organization: "Triviality",
          Location: "Remote",
          Other1: "Other",
          Other2: "Other2",
        },
        {
          Apply: <button>Apply</button>,
          Term: "Summer 2023",
          Title: "Frontend Intern",
          Organization: "Triviality",
          Location: "Remote",
          Other1: "Other",
          Other2: "Other2",
        },
        {
          Apply: <button>Apply</button>,
          Term: "Summer 2023",
          Title: "Frontend Intern",
          Organization: "Triviality",
          Location: "Remote",
          Other1: "Other",
          Other2: "Other2",
        },
        {
          Apply: <button>Apply</button>,
          Term: "Summer 2023",
          Title: "Frontend Intern",
          Organization: "Triviality",
          Location: "Remote",
          Other1: "Other",
          Other2: "Other2",
        },
        {
          Apply: <button>Apply</button>,
          Term: "Summer 2023",
          Title: "Frontend Intern",
          Organization: "T",
          Location: "Remote",
          Other1: "Other",
          Other2: "Other2",
        },
      ]}
      footer={[
        "Apply",
        "Term",
        "Title",
        "Organization",
        "Location",
        "Other",
        "Other",
      ]}
    />
  );
};

export default HomePage;
