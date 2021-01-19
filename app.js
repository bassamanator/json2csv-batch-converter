const fs = require('fs');
const path = require('path');
const dir = '/path/';
const toChangeExtension = 'txt';
const newExtension = 'csv';
const util = require('util');

const readdir = util.promisify(fs.readdir);

const logsDir = '/path/logs';
const { parse } = require('json2csv');

const getJsonFiles = async () => {
	let files;
	try {
		files = await readdir(logsDir);
		// console.log(files); // This prints the filenames
	} catch (err) {
		console.log(err);
	}
	return files.filter(
		file =>
			file.substr(
				file.length - toChangeExtension.length,
				toChangeExtension.length
			) === toChangeExtension
	);
};

const start = async () => {
	let files;
	try {
		files = await getJsonFiles();
	} catch (err) {}
	if (files.length === 0) {
		console.log('No files to convert.');
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
			fs.writeFileSync(fullDest, csvData);
		} catch (err) {
			console.error(err);
		}
	});
};

start();
