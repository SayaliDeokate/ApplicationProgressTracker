import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import './custom.css';
import  Home  from "./components/Home";
import { Layout } from "./components/Layout";

import ProgressStatusList  from "./components/ProgressStatuses/ProgressStatusList";
import AddEditProgressStatus from './components/ProgressStatuses/AddEditProgressStatus';
import ApplicationList from './components/Applications/ApplicationList';
import AddEditApplication from './components/Applications/AddEditApplication';

/* eslint-disable */
export default class App extends Component {
    render() {
        return (
            <Layout>
            <div>
                <div className="App">
                    <header className="App-header">
                        <h3>Application Progress Tracker</h3>
                    </header>
                        <Routes>
                            <Route path="home" element={<Home />} />
                            <Route path="progressStatus"List element={<ProgressStatusList />} />
                            <Route path="addprogressStatus" List element={<AddEditProgressStatus />} />
                            <Route path="editprogressStatus/:id" List element={<AddEditProgressStatus />} />
                            <Route path="application" List element={<ApplicationList />} />
                            <Route path="addapplication" List element={<AddEditApplication />} />
                            <Route path="editapplication/:id" List element={<AddEditApplication />} />
                    </Routes>
                </div>
                </div>
            </Layout>
        );
    }                                  
}

                    