import React, { useState, useEffect, useMemo } from 'react';
import { Alert, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";


const ApplicationList = () => {

    const navigate = useNavigate();
    const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
    const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
    const [rowData, setRowData] = useState([]);
    const [application, setApplication] = useState([]);

    const columnDefs = [
        { headerName: "Id", headerClass: "table-header", field: "id", sortable: true, filter: true, width: 25 },
        { headerName: "Application Name", headerClass: "table-header", field: "applicationName", sortable: true, filter: true, width: 100 },
        { headerName: "Progress Status", headerClass: "table-header", field: "progressStatusName", sortable: true, filter: true, width: 50 }
    ]

    useEffect(() => {
        fetch("/api/application")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setApplication(data);
                setRowData(data.map(formatData));
            })
            .catch((error) => console.error("Error fetching data:", error.message));
    }, []);

    const formatData = (d) => ({
        id: d.id,
        applicationName: d.applicationName,
        progressStatusName: d.progressStatusName
    });

    const handleRowClick = (applicationsData) => {
        console.log("Row clicked:", applicationsData);
        if (applicationsData.id) {
            navigate(`/editApplication/${applicationsData.id}`);
        } else {
            navigate('/addApplication')
        }
    };


    return (
        <div style={{ width: "80%", textAlign: "center", margin: "auto" }}>
            <Alert color="secondary">
                <h3>Applications</h3>
                <p>Click on a Application to make updates or view applications.</p>
                <Button onClick={() => handleRowClick({ id: 0 })}>Create New Application</Button>
            </Alert>
            <br />
            <div style={containerStyle}>
                <div
                    className="ag-theme-alpine"
                    style={{
                        height: "600px",
                        width: "100%",
                        margin: "auto"
                    }}
                >
                    <div style={gridStyle}>
                        <AgGridReact
                            rowData={rowData}
                            columnDefs={columnDefs}
                            defaultColDef={{
                                sortable: true,
                                filter: true,
                                flex: 1,
                                resizable: true
                            }}
                            animateRows={true}
                            pagination={true}
                            paginationPageSize={20}
                            onRowClicked={(e) => handleRowClick(e.data)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};



export default ApplicationList;