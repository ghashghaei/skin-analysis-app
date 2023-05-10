import React from 'react';
import axios from 'axios';

function RefreshButton(props) {
    const handleClick = () => {
        axios.get('/api/runs')
            .then(response => {
                props.setData(response.data.runs);
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <button onClick={handleClick}>Refresh</button>
    );
}

export default RefreshButton;