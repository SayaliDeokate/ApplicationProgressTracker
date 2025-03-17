import React, { useState, useEffect } from 'react';
import { Form, Container, Row, Col, Label, Input, Button, Alert, FormGroup } from 'reactstrap';
import { useNavigate, useParams } from 'react-router-dom';
import ProgressStatusList from '../ProgressStatuses/ProgressStatusList';
import ApplicationList from './ApplicationList';
import GoBack from '../SharedComponents/GoBack'
//import '../../../src/custom.css';

const AddEditApplication = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [application, setApplication] = useState({
        id: id,
        applicationName: '',
        progressStatusId: null,
        description: ''
    });

    const [editMode, setEditMode] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [progressStatusList, setProgressStatusList] = useState([]);

    useEffect(() => {
        if (id) {
            getApplication(id);
        }

        fetch("/api/progressStatus")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setProgressStatusList(data);
            })
            .catch((error) => console.error("Error fetching data:", error.message));
    },[id]);

    const getApplication = async (id) => {
        try {
            const response = await fetch(`/api/application/${id}`);
            if (response.ok) {
                const data = await response.json();
                setEditMode(true);
                setApplication(data);
            }
        }
        catch (error) {
            console.error("Error fetching application:", error);
        }
    };

    async function handleSubmit(e) {
        e.preventDefault();
        setIsSubmitted(true);
        try {
            const method = editMode ? 'PUT' : 'POST';
            const url = editMode ? `/api/application/${id}` : `/api/application`;
            console.log("Sending request to:", url);
            console.log("Request body:", JSON.stringify(gatherFormData()));
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(gatherFormData())
            });

            if (response.ok) {
                setShowSuccess(true);
                setSuccessMessage(`Application has been successfully ${editMode ? 'updated' : 'created'}!`);
                if (!editMode) navigate('/api/application');
            } else {
                throw new Error("An error occurred while saving.");
            }
        } catch (error) {
            setShowError(true);
            console.log(error);
            setErrorMessage("An error has occurred. Nothing has been saved to the database.");
        } finally {
            setIsSubmitted(false);
        }
    }

    const gatherFormData = () => {
        return {
            id: application.id,
            applicationName: application.applicationName,
            progressStatusId: parseInt(application.progressStatusId),
            description: application.description
        };
    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setApplication(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    return (
        <div style={{ padding: '20px', width: '80%', marginLeft: '10%' }}>
 
                <GoBack />
                <Alert color="secondary">
                <h4>
                    {editMode ? `Update ${application.applicationName} (Application Id # ${application.id})` : "Add a New Application"}
                </h4>
                </Alert>

                {showSuccess && <Alert color="success">{successMessage}</Alert>}
                {showError && <Alert color="danger">{errorMessage}</Alert>}

                <Form
                    id='section1'
                    style={{
                        border: '2px solid #ccc',
                        borderRadius: '10px',
                        padding: '20px',
                        backgroundColor: '#f9f9f9'
                    }}
                    onSubmit={handleSubmit}
                >
                    <Container>
                        <Alert color="secondary">
                            <h3>Application Information</h3>
                        </Alert>

                        <div style={{textAlign: 'left'}}>
                        <Row className="mb-3">
                            <Col sm={12} md={4}>
                                <FormGroup>
                                    <Label
                                        for='applicationName'
                                        className="mb-2"
                                        style={{ marginBottom: '5px', display: 'block' }}
                                    >
                                        <strong>
                                            Application Name
                                        </strong>
                                    </Label>
                                    <Input
                                        name='applicationName'
                                        maxLength={50}
                                        id='applicationName'
                                        required
                                        disabled={isSubmitted}
                                        onChange={handleChange}
                                        value={application.applicationName || ''}
                                        style={{ height: '25px', fontSize: '15px', width: '30%' }}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <br />
                        <Row className="mb-3">
                            <Col sm={12} md={4}>
                                <FormGroup>
                                    <Label
                                        for='progressStatusId'
                                        className="mb-2"
                                        style={{ marginBottom: '5px', display: 'block' }}
                                    >
                                        <strong>
                                            Progress Status
                                        </strong>
                                    </Label>
                                    <Input
                                        type='select'
                                        name='progressStatusId'
                                        id='progressStatusId'
                                        required
                                        disabled={isSubmitted}
                                        onChange={handleChange}
                                        value={application.progressStatusId || ''}
                                        style={{ height: '30px', fontSize: '15px', width: '30%' }}
                                    >
                                        <option value=''>Select Progress Status</option>
                                        {
                                            progressStatusList.length > 0 && progressStatusList.map((item) => (
                                                <option key={item.id} value={item.id}>
                                                    {item.progressStatusName}
                                                </option>
                                            ))
                                        }
                                    </Input>
                                </FormGroup>
                            </Col>
                        </Row>

                        <br />

                        <Row className="mb-3">
                            <Col sm={12} md={4}>
                                <FormGroup>
                                    <Label
                                        for='description'
                                        className="mb-2"
                                        style={{ marginBottom: '5px', display: 'block' }}>
                                        <strong>
                                            Description
                                        </strong>
                                    </Label>
                                    <Input
                                        type="textarea"
                                        maxLength={1000}
                                        name='description'
                                        id='description'
                                        disabled={isSubmitted}
                                        onChange={handleChange}
                                        value={application.description || ''}
                                        style={{
                                            height: '150px',
                                            fontSize: '15px',
                                            width: '100%',
                                            resize: 'none'
                                        }}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                    </div>

                    </Container>
                    <br />
                <Button type='submit'
                    color="primary"
                    disabled={isSubmitted}
                    style={{ fontSize: '15px', padding: '10px 20px' }}
                >
                        {editMode ? 'Save' : 'Create'}
                    </Button>
                </Form>
        </div>

    );
};

export default AddEditApplication;