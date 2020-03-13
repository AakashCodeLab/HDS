import express from 'express';
import path from 'path';
import gmail from 'email-via-gmail';

import { validateEmail, generateOTP } from  '../../client/utils/index';
import privateData from '../private';

import temp from '../model/temp';
import users from '../model/users';

const apiRoutes = express.Router();

apiRoutes.post('/',(req,res) => {
	if(req.body.hasOwnProperty('name') && req.body.hasOwnProperty('email') && req.body.hasOwnProperty('password')) {
		const name = req.body['name'];
		const email = req.body['email'];
		const password = req.body['password'];
		const validEmail = validateEmail(email);
		if(name.length == 0) {
			res.json({msg: "Please provide a name",success: false});
		}
		else if(!validEmail) {
			res.json({msg: "Email ID not valid",success: false});
		}
		else {
			users.findOne({email},(err,docs) => {
				if(docs)
					res.json({msg: 'User already exists',success: false});
				else	
					temp.findOne({email},(err,docs) => {
						const otp = generateOTP();
						gmail.login(privateData.gmail.email,privateData.gmail.password);
						gmail.sendEmail('DDS',`Your OTP is ${otp}`,email);
						if(docs) {
							// change otp if user exists in temp
							temp.where({_id: docs._id})
									.update({ otp })
									.exec();
							res.json({msg: `Your OTP ${otp} is sent on your Email ID, again`,success: true});
						}
						else {
							// add user in temp collection
							const tempUser = new temp({ name, email, password, otp });
							tempUser.save((err,docs) => {
								res.json({msg: `Your OTP ${otp} is sent on your Email ID`,success: true});
							});
						}
					});
			});
		}
	}
	else {
		res.json({msg: "Please provide all fields",success: false});
	}
});

export default apiRoutes;