import express from 'express';
import unique from 'array-unique';

import { validateEmail, lowercase } from  '../../client/utils/index';

import disease from '../model/disease';

const apiRoutes = express.Router();

apiRoutes.get('/allSymptoms',(req,res) => {
	disease.find({},'symptoms',(err,docs) => {
		if(docs) {
			const msg = unique(docs.map(a => a.symptoms).reduce((a,b) => a.concat(b)));
			res.json({msg,success: true});
		}
		else res.json({msg: "No diseases added yet",success: false});
	});
});

apiRoutes.get('/allDiseases',(req,res) => {
	disease.find({},'name',(err,docs) => {
		if(docs)
			res.json({msg: docs,success: true});
		else res.json({msg: "No diseases added yet",success: false});
	});
});

apiRoutes.post('/symptoms',(req,res) => {
	if(req.body.hasOwnProperty('symptoms')) {
		const symptoms = lowercase(req.body['symptoms']);
		if(symptoms.length)
			disease.find({symptoms: {$all: symptoms}},(err,docs) => {
				if(docs) {
					if(docs.length)
						res.json({msg: docs,success: true});
					else res.json({msg: "No such disease exists",success: false});
				}
				else res.json({msg: "No diseases added yet",success: false});
			});
		else res.json({msg: "Please provide the symptoms",success: false});
	}
	else {
		res.json({msg: "Please provide all fields",success: false});
	}
});

apiRoutes.post('/',(req,res) => {
	if(req.body.hasOwnProperty('name') && req.body.hasOwnProperty('symptoms')) {
		const name = req.body['name'];
		const symptoms = req.body['symptoms'];
		if(name.length == 0) {
			res.json({msg: "Please provide a name",success: false});
		}
		else if(symptoms.length == 0) {
			res.json({msg: "Please provide the symptoms",success: false});
		}
		else {
			disease.findOne({name},(err,docs) => {
				if(docs)
					res.json({msg: 'Disease already exists',success: true});
				else {
					const tempDisease = new disease({name, symptoms});
					tempDisease.save((err,docs) => {
						res.json({msg: 'Inserted new disease',success: true});
					});
				}
			});
		}
	}
	else {
		res.json({msg: "Please provide all fields",success: false});
	}
});

export default apiRoutes;