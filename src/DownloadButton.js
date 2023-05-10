import React from 'react';
import axios from 'axios';
import FileSaver from 'file-saver';

function DownloadButton(props) {
    const handleClick = () => {
        axios.get(`/api/runs/${props.studyId}/${props.runId}/download`)
            .then(response => {
                if (response.data.status === 'Failed' || response.data.status === 'Canceled') {
                    alert(`Download failed: ${response.data.status}`);
                } else {
                    const blob = new Blob([''], { type: 'text/csv;charset=utf-8' });
                    FileSaver.saveAs(blob, `${props.studyId}-${props.runId}.csv`);
                }
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <button type="button" className="btn btn-primary" onClick={handleClick}>Download</button>
    );
}

export default DownloadButton;
