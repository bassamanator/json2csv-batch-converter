const fs = require('fs');

const util = require('util');

const readdir = util.promisify(fs.readdir);

const getFiles = async (directory, extension) => {
	let files;
	try {
		files = await readdir(directory);
	} catch (err) {
		console.log(err);
	}
	return files.filter(
		file =>
			file.substr(
				file.length - extension.length,
				extension.length
			) === extension
	);
};

exports.getFiles = getFiles;
