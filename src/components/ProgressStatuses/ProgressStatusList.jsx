import React, { useState, useEffect, useRef } from 'react';
import { Alert, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import '../../../src/custom.css';

const ProgressStatusList = () => {

    const navigate = useNavigate();
    const gridRef = useRef();

    const [rowData, setRowData] = useState([]);
    const [progressStaus, setProgressStatus] = useState([]);
    const [isActiveFlag, setIsActiveFlag] = useState(false);


    const columnDefs = [
        { headerName: "Id", headerClass: "table-header", field: "id", sortable: true, filter: true, width: 75 },
        { headerName: "Progress Status Name", field: "progressStatusName", sortable: true, filter: true, width: 100 },
        {
            headerName: "Is Active", field: "isActive", sortable: true, filter: true, width: 100,
            cellRenderer: (params) => {
                return (
                    <div
                        style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
                        onClick={() => handleRowClick(params.data)}
                    >
                        {params.value}
                    </div>
                );
            }
        }
    ]

    useEffect(() => {
        fetch("/api/progressStatus")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setProgressStatus(data);
                setRowData(data.filter((item) => item.isActive).map(formatData));
            })
            .catch((error) => console.error("Error fetching data:", error.message));
    }, []);

    const formatData = (d) => ({
        id: d.id,
        progressStatusName: d.progressStatusName,
        isActive: d.isActive ? 'True' : 'False',
    });

    const handleRowClick = (progressStatusData) => {
        console.log("Row clicked:", progressStatusData);
        if (progressStatusData.id) {
            navigate(`/editProgressStatus/${progressStatusData.id}`);
        } else {
            navigate('/addProgressStatus')
        }
    };

    const toggleActive = () => {
      
        setIsActiveFlag((prevFlag) => {
            const filteredData = !prevFlag ? progressStaus.filter(item => item.isActive) : progressStaus;
            setRowData(filteredData.map(formatData));
            return !prevFlag;
        });
    };

    return (

        <div style={{ width: "80%", textAlign: "center", margin: "auto" }}>
            <Alert color="secondary">
                <h3>Progress Statuses</h3>
                <p>Click on a Progress Status to make updates or view statuses.</p>
                <Button onClick={() => handleRowClick({ id: 0 })}>Create New Progress Status</Button>
                <Button
                    style={{ marginLeft: 10 }}
                    onClick={toggleActive}>
                    {!isActiveFlag ?  "Show Active Progress Statuses":  "Show All Progress Statuses"}
                </Button>
            </Alert>
            <br />
            <div
                className="ag-theme-alpine"
                style={{
                    height: "600px",
                    width: "100%",
                    margin: "auto"
                }}
            >
                <AgGridReact
                    ref={gridRef}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={{
                        sortable: true,
                        filter: true,
                        flex: 1,
                        resizable: true,
                    }}
                    animateRows={true}
                    pagination={true}
                    paginationPageSize={20}
                    onRowClicked={(e) => handleRowClick(e.data)}
                />
            </div>
        </div>
    );
};



export default ProgressStatusList;