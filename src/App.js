import React, { useState } from 'react';
import Header from './Header';
import SkinAnalysisTable from './Table';
import SkinAnalysisForm from './Form';

function App() {
    const [refresh, setRefresh] = useState(false);

    const handleSuccess = () => {
        setRefresh(!refresh);
    };

    return (
        <div className="App">
            <Header />
            <div className="container mb-5">
                <div className="row">
                    <div className="col-12">
                        <h2>Latest Runs</h2>
                        <SkinAnalysisTable key={refresh} />
                    </div>
                    <div className="col-12 mt-5">
                        <h2>New Run</h2>
                        <SkinAnalysisForm onSuccess={handleSuccess} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
