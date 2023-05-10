const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3002;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/data.json', (req, res) => {
    const data = fs.readFileSync(path.join(__dirname, 'public', 'data.json'), 'utf8');
    res.json(JSON.parse(data));
});

app.post('/api/runs', (req, res) => {
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'public', 'data.json'), 'utf8'));
    const newRun = {
        StudyId: req.body.StudyId,
        RunId: `${req.body.StudyId}-${data.runs.length + 1}`,
        Status: 'Successful',
        RunDate: new Date().toLocaleString(),
        StudyDate: req.body.StudyDate
    };
    data.runs.push(newRun);
    fs.writeFileSync(path.join(__dirname, 'public', 'data.json'), JSON.stringify(data, null, 4));
    res.json(newRun);
});

app.get('/api/runs/:studyId/:runId/download', (req, res) => {
    const { studyId, runId } = req.params;
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'public', 'data.json'), 'utf8'));
    const run = data.runs.find(run => run.StudyId === studyId && run.RunId === runId);
    if (run.Status === 'Failed' || run.Status === 'Canceled') {
        res.status(400).send(`Cannot download ${studyId}-${runId}.csv`);
    } else {
        res.setHeader('Content-Disposition', `attachment; filename=${studyId}-${runId}.csv`);
        res.setHeader('Content-Type', 'text/csv');
        res.send('');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
