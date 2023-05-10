import React, { useState } from 'react';
import axios from 'axios';

function Form(props) {
    const [studyId, setStudyId] = useState('');
    const [studyDate, setStudyDate] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3002/api/runs', { StudyId: studyId, StudyDate: studyDate, Status: 'Successful' })
            .then(response => {
                console.log(response);
                setStudyId('');
                setStudyDate('');
                props.onSuccess();
            })
            .catch(error => {
                console.log(error);
            });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'studyId') {
            setStudyId(value);
        } else if (name === 'studyDate') {
            setStudyDate(value);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form">
            <div className="form-group mb-2">
                <label htmlFor="studyId">Study ID</label>
                <input type="text" className="form-control" id="studyId" name="studyId" value={studyId} onChange={handleChange} required/>
            </div>
            <div className="form-group mb-2">
                <label htmlFor="studyDate">Study Date</label>
                <input type="text" className="form-control" id="studyDate" name="studyDate" value={studyDate} onChange={handleChange} required/>
            </div>
            <button type="submit" className="btn btn-success">Submit</button>
        </form>
    );
}

export default Form;
