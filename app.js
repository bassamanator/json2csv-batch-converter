/*
 * Author: Bassam Husain
 * Batch conver json files to csv files using the
 * json2csv package https://www.npmjs.com/package/json2csv
 * Place all .json files in json/ and run.
 */
 
const fs = require('fs');
const path = require('path');
const dir = '/path/';

const { getFiles } = require('./getFiles.js');
const { convertToCsv } = require('./convertToCsv.js');
const targetDirectory = path.join(__dirname, 'json');

const start = async (testRun, toChangeExtension, newExtension) => {
	if (!fs.existsSync(targetDirectory)) {
		console.log(`Directory ${targetDirectory} not found.`);
		return;
	}
	let files;
	try {
		files = await getFiles(targetDirectory, toChangeExtension, newExtension);
	} catch (err) {}
	if (files.length === 0) {
		console.log(`No ${toChangeExtension} files found.`);
		return;
	}
	let count = 0;
	files.forEach(file => {
		const fullSource = path.join(targetDirectory, file);
		const newFile = file.replace('.' + toChangeExtension, '.' + newExtension);
		const fullDest = path.join(targetDirectory, newFile);

		let csvData;
		try {
			const fileContents = JSON.parse(fs.readFileSync(fullSource, 'utf8'));
			csvData = convertToCsv(fileContents, {});
			if (!testRun) {
				fs.writeFileSync(fullDest, csvData);
				count++;
			}

			console.log(fullSource, fullDest);
		} catch (err) {
			console.error(err);
		}
	});
	console.log(`Files converted: ${count}`);
};

start(false, 'json', 'csv');
