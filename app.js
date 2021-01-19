const fs = require('fs');
const path = require('path');
const dir = '/path/';
const toChangeExtension = 'txt';
const newExtension = 'csv';
const {getFiles}=require('./getFiles.js');

const logsDir = path.join(__dirname, 'logs');
const { parse } = require('json2csv');



const start = async testRun => {
	if (!fs.existsSync(logsDir)) {
		console.log('Directory "logs" not found.');
		return;
	}
	let files;
	try {
		files = await getFiles(logsDir,toChangeExtension);
	} catch (err) {}
	if (files.length === 0) {
		console.log(`No ${toChangeExtension} files found.`);
		return;
	}

	console.log('**Files: ', files);

	files.forEach(file => {
		const fullSource = path.join(logsDir, file);
		const newFile = file.replace('.' + toChangeExtension, '.' + newExtension);
		const fullDest = path.join(logsDir, newFile);
		console.log(fullSource);
		console.log(fullDest);

		let csvData;
		try {
			const fileContents = JSON.parse(fs.readFileSync(fullSource, 'utf8'));
			csvData = parse(fileContents, {});
			if (!testRun) fs.writeFileSync(fullDest, csvData);
			else {
				console.log(fullSource);
				console.log(fullDest);
			}
		} catch (err) {
			console.error(err);
		}
	});
};

start(true);
