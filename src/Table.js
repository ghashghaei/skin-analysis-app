import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Alert } from 'react-bootstrap';
import { saveAs } from 'file-saver';

function SkinAnalysisTable() {
    const [runs, setRuns] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    useEffect(() => {
        fetchRuns();
    }, []);

    const fetchRuns = async () => {
        try {
            const response = await axios.get('/data.json');
            setRuns(response.data.runs);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDownload = async (studyId, runId, status) => {
        if (status === 'Failed' || status === 'Cancelled') {
            setShowAlert(true);
            setAlertMessage(`Cannot download ${studyId}-${runId}.csv because the run status is ${status}.`);
            return;
        }

        try {
            const response = await axios.get(`http://localhost:3002/api/runs/${studyId}/${runId}/download`);
            const blob = new Blob([''], { type: 'text/csv;charset=utf-8' });
            saveAs(blob, `${studyId}-${runId}.csv`);
        } catch (error) {
            console.log(error);
            setShowAlert(true);
            setAlertMessage(`Failed to download ${studyId}-${runId}.csv`);
        }
    };

    const handleRefresh = () => {
        fetchRuns();
    };

    return (
        <>
            {showAlert && (
                <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
                    {alertMessage}
                </Alert>
            )}
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>RunId</th>
                    <th>StudyDate</th>
                    <th>RunDate</th>
                    <th>Status</th>
                    <th>Download</th>
                </tr>
                </thead>
                <tbody>
                {runs.map(run => (
                    <tr key={`${run.StudyId}-${run.RunId}`}>
                        <td>{run.RunId}</td>
                        <td>{run.StudyDate}</td>
                        <td>{run.RunDate}</td>
                        <td>{run.Status}</td>
                        <td className="text-center">
                            <Button variant="primary" onClick={() => handleDownload(run.StudyId, run.RunId, run.Status)}>Download</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <Button variant="primary" onClick={handleRefresh}>Refresh</Button>
        </>
    );
}

export default SkinAnalysisTable;
