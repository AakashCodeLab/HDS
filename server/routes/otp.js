import express from 'express';

import { validateEmail } from  '../../client/utils/index';

import temp from '../model/temp';
import users from '../model/users';

const apiRoutes = express.Router();

apiRoutes.post('/',(req,res) => {
	if(req.body.hasOwnProperty('email') && req.body.hasOwnProperty('otp')) {
		const email = req.body['email'];
		const otp = req.body['otp'];
		const validEmail = validateEmail(email);
		if(!validEmail) {
			res.json({msg: "Email ID not valid",ok: false});
		}
		else if(otp.length != 4) {
			res.json({msg: "OTP invalid",ok: false});
		}
		else {
			temp.findOne({email, otp},(err,docs) => {
				if(docs) {
					// insert into users collection
					temp.remove({email: docs.email},(err, docs) =>  {
						 // removed
		            });
					const tempUser = new users({
						name: docs.name,
						email: docs.email,
						password: docs.password
					});
					tempUser.save((err,docs) => {
						res.json({msg: `Successfully signed up`,ok: true});
					});
				}
				else {
					// no such user signed up
					res.json({msg: 'Such user does not exist',ok: false});
				}
			})
		}
	}
	else {
		res.json({msg: "Please provide all fields",ok: false});
	}
});

export default apiRoutes;