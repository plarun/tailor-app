const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Validation
const validateCustomerInput = require('../../validation/customer-input')

// Load Customer Model
const Customer = require('../../models/Customer');

//@route	POST api/customers/create
//@desc		post customer
//@access	private
router.post('/create', passport.authenticate('jwt', { session: false }), (req, res) => {
	const { errors, isValid } = validateCustomerInput(req.body);

	//Check Validation
	if(!isValid){
		return res.status(400).json(errors);
	}

	Customer.findOne({name: req.body.name} && {phone: req.body.name})
		.then(customers => {
			if(customers) {
				errors.customer = "Customer already exists";
				return res.status(400).json(errors);
			} else {
				const newCustomer = new Customer({
					name: req.body.name,
					phone: req.body.phone,
					gender: req.body.gender,	
					upper: {
						neck: req.body.neck,
						shoulder: req.body.shoulder,
						fullarm: req.body.fullarm,
						halfarm: req.body.halfarm,
						sleeve: req.body.sleeve,
						wrist: req.body.wrist,
						elbow: req.body.elbow,
						chest: req.body.chest,
						hip: req.body.hip,
						body: req.body.body
					},
					lower: {
						thigh: req.body.thigh,
						knee: req.body.knee,
						seat: req.body.seat,
						leg_half: req.body.leg_half,
						leg_full: req.body.leg_full,
						ankle: req.body.ankle
					}
				});
				newCustomer.save()
					.then(customers => res.json(customers))
					.catch(err => console.log(err));
			}
		})
});

// @route   GET api/customers/all
// @desc    Get all customers
// @access  Public
router.get('/all', passport.authenticate('jwt', { session: false }), (req, res) => {
	Customer.find()
	.sort({name:'asc'})
	.then(customers => {
		if (!customers) {
		errors.nocustomers = 'There are no customers';
		return res.status(404).json(errors);
		}

		res.json(customers);
	})
	.catch(err => res.status(404).json({ customers: 'There are no customers' }));
});

// @route   GET api/customers/all
// @desc    Get all customers
// @access  Public
router.get('/phone', passport.authenticate('jwt', { session: false }), (req, res) => {
	const phone = req.query.phone
	Customer.find({phone: phone})
	.then(customers => {
		if (customers.length == 0) {
			errors.nocustomer = 'Customer not found';
			return res.status(404).json(errors);
		}

		res.json(customers);
	})
	.catch(err => res.status(404).json({ customers: 'Customer not found' }));
});

module.exports = router;