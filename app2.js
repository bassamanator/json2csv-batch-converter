const path = require('path');

const myFile = '/home/bassam/fractal-task/batch-json2csv/txxQhnxdo.json';
const fs = require('fs');

const { parse } = require('json2csv');

const fields = ['ParticipantID', 'TrialType'];
const opts = { fields };

const data = fs.readFileSync(myFile, 'utf8');
console.log(data) // This displays file contents correctly.

try {
	const csv = parse(data, opts);
	console.log(csv);
} catch (err) {
	console.error(err);
}
