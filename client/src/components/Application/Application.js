import React, { useState, useContext, useEffect } from "react";
import { Container } from "react-bootstrap";
import { UserContext } from "../../App";
import DataTable from "../DataTable/DataTable";

const Application = () => {
  const [application, setApplication] = useState({});
  const [displayedData, setDisplayedData] = useState([]);
  const userInfo = useContext(UserContext);

  const getStuApplications = async () => {
    const url = `http://localhost:3001/applications/student/${userInfo.id}`;

    const req = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(url, req);
      const result = await response.json();
      if (!result.err) {
        console.log(result);
        setApplication(result.applications);
        getDisplayedData(result.applications);
        console.log(result.applications);
      }
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  };

  const getDisplayedData = (applications) => {
    if (applications.length > 0) {
      const data = applications.map((application, idx) => {
        const app = {
          id: idx,
          organizationName: application.organizationName,
          title: application.title,
          applicationStatus: application.applicationStatus,
        };
        return app;
      });
      setDisplayedData(data);
    } else {
      setDisplayedData([]);
    }
  };

  useEffect(() => {
    getStuApplications();
    console.log("HELLOOOOOOOO");
  }, [userInfo]);

  return (
    <Container fluid className="postingsPage">
      <h1>Browse Applications</h1>
      <div className="table-cont">
        {displayedData.length > 0 ? (
          <DataTable
            header={["#", "Organization", "Position", "Status"]}
            data={application}
            displayedData={displayedData}
          />
        ) : (
          <h2>There are no applications yet!</h2>
        )}
      </div>
    </Container>
  );
};
export default Application;
