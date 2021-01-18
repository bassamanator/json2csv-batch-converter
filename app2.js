const path = require('path');
const d = '{ "ParticipantID": "a3d040db-d41f-9aa3-9bcb-de9335c8f149", "TrialType": 1, "TrialDuration": 1000, "TrialNumber": 1, "PracticeTrial": 1, "FractalId": 17, "RandomTarget1": 57, "RandomTarget2": 16, "TargetId": 16, "Clicks": 0 }, { "ParticipantID": "a3d040db-d41f-9aa3-9bcb-de9335c8f149", "TrialType": 1, "TrialDuration": 1000, "TrialNumber": 2, "PracticeTrial": 1, "FractalId": 0, "RandomTarget1": 46, "RandomTarget2": 61, "TargetId": 46, "Clicks": 0 }'
const myFile = '/home/bassam/fractal-task/batch-json2csv/txxQhnxdo.json';
const fs = require('fs');

const { parse } = require('json2csv');

const fields = ['ParticipantID', 'TrialType'];
const opts = { fields };

// const data = fs.readFileSync(myFile, 'utf8');
// console.log(data) // This displays file contents correctly.

try {
	const csv = parse(d, opts);
	console.log(csv);
} catch (err) {
	console.error(err);
}
