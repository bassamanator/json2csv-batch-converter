const myFile = '/home/bassam/fractal-task/batch-json2csv/txxQhnxdo.txt';
const myFile2 = '/home/bassam/fractal-task/batch-json2csv/file.csv';

const fs = require('fs');

const myData = fs.readFileSync(myFile, 'utf8');
// console.log(myData); // This displays file contents correctly.

const { Parser } = require('json2csv');

const fields = [];
const opts = { fields };

try {
	const parser = new Parser({});
	const csv = parser.parse(JSON.parse(myData));
	console.log(csv);
	fs.writeFileSync(myFile2, csv, 'utf8');
} catch (err) {
	console.error(err);
}
