import React, { useState, useEffect } from 'react';
import { Form, Container, Row, Col, Label, Input, Button, Alert, FormGroup } from 'reactstrap';
import { useNavigate, useParams } from 'react-router-dom';
import ProgressStatusList from './ProgressStatusList';
import GoBack from '../SharedComponents/GoBack';

const AddEditProgressStatus = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [progressStatus, setProgressStatus] = useState({
        id: id,
        progressStatusName: '',
        isActive: false,
    });

    const [editMode, setEditMode] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');


    useEffect(() => {
        if (id) {
            getProgressStatus(id);
        }
    }, [id]);

    const getProgressStatus = async (id) => {
        try {
            const response = await fetch(`/api/progressStatus/${id}`);
            if (response.ok) {
                const data = await response.json();
                setEditMode(true);
                setProgressStatus(data);
            }
        }
        catch (error) {
            console.error("Error fetching progress status:", error);
        }
    };

    async function handleSubmit(e) {
        e.preventDefault();
        setIsSubmitted(true);

        try {
            const method = editMode ? 'PUT' : 'POST';
            const url = editMode ? `/api/progressStatus/${id}` : `/api/progressStatus`;
        
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
                setSuccessMessage(`Progress Status has been successfully ${editMode ? 'updated' : 'created'}!`);
                if (!editMode) navigate('/progressStatusList');
            } else {
                throw new Error("An error occurred while saving.");
            }
        } catch (error) {
            setShowError(true);
            setErrorMessage("An error has occurred. Nothing has been saved to the database.");
        } finally {
            setIsSubmitted(false);
        }
    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProgressStatus(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const gatherFormData = () => {

        return {
            id: progressStatus.id,
            progressStatusName: progressStatus.progressStatusName,
            isActive: progressStatus.isActive
        };
    }


    return (
        <div style={{ padding: '20px', width: '80%', marginLeft: '10%' }}>
            <GoBack />
            <Alert color="secondary">
                <h4>
                    {editMode ? `Update ${progressStatus.progressStatusName} (Progress Status Id # ${progressStatus.id})` : "Add a New Progress Status"}
                </h4>
            </Alert>

            {showSuccess && <Alert color="success">{successMessage}</Alert>}
            {showError && <Alert color="danger">{errorMessage}</Alert>}

            <Form id='section1'
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
                        <h3>Progress Status Information</h3>
                    </Alert>

                    <div style={{ textAlign: 'left' }}>
                    <Row className="mb-3">
                            <Col sm={12} md={4}>
                            <FormGroup>
                                    <Label
                                        for='progressStatusName'
                                        className="mb-2"
                                        style={{ marginBottom: '5px', display: 'block' }} >
                                        <strong>
                                            Progress Status Name
                                        </strong>
                                    </Label>
                                <Input
                                    name='progressStatusName'
                                    maxLength={50}
                                    id='progressStatusName'
                                    required
                                    disabled={isSubmitted}
                                    onChange={handleChange}
                                    value={progressStatus.progressStatusName || ''}
                                    style={{ height: '25px', fontSize: '15px', width: '30%' }}
                                />
                            </FormGroup>
                            </Col>
                        {/*</Row>*/}
                        {/*<br />*/}
                        {editMode &&
                           
                     /*   <Row className="mb-3">*/
                            <Col sm={12} md={4}>
                                <FormGroup check>
                                        <Label
                                            className="mb-2"
                                            style={{ marginBottom: '5px', display: 'block' }}
                                        >
                                            <strong>
                                                Is Active
                                            </strong>
                                            <Input
                                                type='checkbox'
                                                name='isActive'
                                                checked={progressStatus.isActive}
                                                onChange={handleChange}
                                                style={{ height: '20px',  width: '30%' }}
                                            />
                                    </Label>
                                </FormGroup>
                            </Col>
                           
                            } </Row>
                    </div>
               
                </Container>
                <br />
                <Button
                    type='submit'
                    disabled={isSubmitted}
                    style={{ fontSize: '15px', padding: '10px 20px' }}
                >
                    {editMode ? 'Save' : 'Create'}
                </Button>
            </Form>
        </div>
    );
};


export default AddEditProgressStatus;
