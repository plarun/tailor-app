const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport')

//Load Input Validation
const validateRegisterAdminInput = require('../../validation/register-admin');
const validateLoginAdminInput = require('../../validation/login-admin');

// Load Model
const Admin = require('../../models/Admin');


router.get('/admin', (req, res) => {
	Admin.findOne({name: "admin"})
	.then(admin => {
		if (admin) {
			return res.json({
				exists: true
			});
		} else {
			return res.json({
				exists: false
			});
		}
	})
});

//@route	GET api/users/admin-register
//@desc		Register admin
//@access	Public
router.post('/admin-register', (req, res) => {
	const { errors, isValid } = validateRegisterAdminInput(req.body);

	//Check Validation
	if(!isValid){
		return res.status(400).json(errors);
	}

	Admin.findOne({name: "admin"})
	.then(admin => {
		if (admin) {
			errors.name = 'Admin already exists';
			return res.status(400).json(errors);
		} else {
			const newAdmin = new Admin({
				name: "admin",
				email: req.body.email,
				password: req.body.password
			});

			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newAdmin.password, salt, (err, hash) => {
					if(err) throw err;
					newAdmin.password = hash;
					newAdmin.save()
						.then(user => res.json(user))
						.catch(err => console.log(err));
				});
			});
		}
	})
});

//@route	GET api/users/admin-login
//@desc		Login as admin
//@access	Public
router.post('/admin-login', (req, res) => {
	const { errors, isValid } = validateLoginAdminInput(req.body);

	//Check Validation
	if(!isValid){
		return res.status(400).json(errors);
	}

	const password = req.body.password;

	//Find admin
	Admin.findOne({name: "admin"})
	.then(admin => {
		//check for admin
		if(!admin) {
			errors.email = 'Admin user is not yet created';
			return res.status(404).json(errors);
		}

		//check password
		bcrypt.compare(password, admin.password).then(isMatch => {
			if(isMatch) {

				//Admin Matched
				const payload = { id: admin.id, name: admin.name, email: admin.email} // Create jwt payload

				//Sign Token
				jwt.sign(
					payload, 
					keys.secretOrKey, 
					{ expiresIn: 3600}, 
					(err, token) => {
						res.json({
							success: true,
							token: 'Bearer ' + token
						});
					}
				);
			} else {
				errors.password = 'Password incorrect';
				return res.status(400).json(errors);
			}
		});
	});
});

module.exports = router;