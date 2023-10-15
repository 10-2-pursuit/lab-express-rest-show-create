const express = require('express');
const logs = express.Router();
const logsData = require('../models/log.js');

// INDEX
logs.get('/', (req, res) => {
	if (logsData) {
		res.status(200).json(logsData);
	} else {
		res.status(404).send('No logs found!');
	}
});

// SHOW
logs.get('/:index', (req, res) => {
	const { index } = req.params;
	if (logsData[index]) {
		res.status(200).json(logsData[index]);
	} else {
		res.status(404).send('No log at that index!');
	}
});

// CREATE
logs.post('/', (req, res) => {
	logsData.push(req.body);
	res
		.status(200)
		.json({ status: 'OK', payload: logsData[logsData.length - 1] });
});

// DELETE
logs.delete('/:index', (req, res) => {
	const { index } = req.params;
	if (logsData[index]) {
		const deletedLog = logsData.splice(index, 1);
		res.status(200).json(deletedLog[0]);
	} else {
		res.status(404).json({ error: 'Log not found' });
	}
});

// UPDATE
logs.put('/:index', (req, res) => {
	const { index } = req.params;
	if (logsData[index]) {
		logsData[index] = req.body;
		res.status(200).json(logsData[index]);
	} else {
		res.status(404).json({ error: 'Log not found' });
	}
});

module.exports = logs;
