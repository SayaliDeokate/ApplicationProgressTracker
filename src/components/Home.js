import React, { Component } from "react";
import { Card, CardBody, CardTitle, CardText, CardLink, Row, Col, Alert } from 'reactstrap';
import './Home.css';
import progressMenu from '../images/ProgressMenu.png';
import applicationMenu from '../images/ApplicationMenu.png';

export default class Home extends Component {
    render() {
        return (
            <div className="container">
                <Alert className="py-4 centered-alert text-center">
                    <h3 className="alert-heading">Admin Section</h3>
                    <hr />
                    <p className="lead">Use these options to change things in the application.</p>
                </Alert>
                <br />
                <br />
                <Row >
                    <Col xs={12} md={6} className="d-flex justify-content-center">
                        <Card
                            className="text-center"
                            color="light"
                            outline
                            style={{
                                width: '18rem',
                                height: '14rem',
                            }}>
                            <img
                                style={{ width: '50px', height: '50px', marginTop: '10px' }}
                                src={progressMenu}
                                alt='Progress Menu'
                            />
                            <CardBody>
                                <CardTitle tag="h4">List of Progress Status</CardTitle>
                                <CardText>
                                    To show/edit List of <CardLink href="/progressStatus">Progress Statuses</CardLink>.
                                </CardText>
                            </CardBody>
                        </Card>
                    </Col>
                <br />
                    <Col xs={12} md={6} className="d-flex justify-content-center">
                        <Card
                            className="text-center"
                            color="light"
                            outline
                            style={{
                                width: '18rem',
                                height: '14rem',
                            }}>
                            <img
                                style={{ width: '50px', height: '50px', marginTop: '10px' }}
                                src={applicationMenu}
                                alt='Application Menu'
                            />
                            <CardBody>
                                <CardTitle tag="h4">List of Applications</CardTitle>
                                <CardText>
                                    To show/edit List of <CardLink href="/application">Applications</CardLink>.
                                </CardText>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}
