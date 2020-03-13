import express from 'express';

import { validateEmail } from  '../../client/utils/index';

import users from '../model/users';

const apiRoutes = express.Router();

apiRoutes.post('/',(req,res) => {
	if(req.body.hasOwnProperty('email') && req.body.hasOwnProperty('password')) {
		const email = req.body['email'];
		const password = req.body['password'];
		const validEmail = validateEmail(email);
		if(!validEmail) {
			res.json({msg: "Email ID not valid",success: false});
		}
		else {
			users.findOne({email, password},(err,docs) => {
				if(docs)
					res.json({msg: "Login Successful !!!",success: true});
				else res.json({msg: "No such user exists",success: false});
			})
		}
	}
	else {
		res.json({msg: "Please fill all fields",success: false});
	}
});

export default apiRoutes;