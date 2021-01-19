const convertToCsv = (jsonData, opts) => {
	const { parse } = require('json2csv');
	let csvData;
	try {
		csvData = parse(jsonData, opts);
	} catch (err) {
		console.error(err);
		return null;
	}
	return csvData;
};

exports.convertToCsv = convertToCsv;
