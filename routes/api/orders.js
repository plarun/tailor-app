const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Input Validation
const validateOrderInput = require('../../validation/order');


//Order Model
const Order = require('../../models/Order');
// User Model
const User = require('../../models/User');
// Customer Model
const Customer = require('../../models/Customer');
// Dresslist Model
const Dresslist = require('../../models/Dresslist');

// @route   GET api/orders/user/:user_id
// @desc    Get orders by user ID
// @access  Public

router.get('/user/:user_id', (req, res) => {
	const errors = {};

	Order.find({ user: req.params.user_id })
	// .populate('user', ['name', 'email'])
	.then(orders => {
		if (!orders) {
		errors.noorders = 'There is no orders for this tailor';
		res.status(404).json(errors);
		}

		res.json(orders);
	})
	.catch(err =>
		res.status(404).json({ orders: 'There is no orders for this tailors' })
	);
});

// @route   GET api/orders/all
// @desc    Get all orders
// @access  Private
router.get('/all', passport.authenticate('jwt', { session: false }), (req, res) => {
	Order.find()
		.then(orders => {
			if (!orders) {
				errors.noorders = "No orders"
				return res.status(404).json(errors)
			}
			res.json(orders)
		})
		.catch(err => res.status(404).json({ orders: 'There is no orders' }));
});

router.get('/myorders', passport.authenticate('jwt', { session: false }), (req, res) => {
	Order.find({ user: req.params.user_id })
		.then(orders => {
			if (!orders) {
				errors.noorders = "No orders"
				return res.status(404).json(errors)
			}
			res.json(orders)
		})
		.catch(err => res.status(404).json({ orders: 'There is no orders' }));
})

//@route	POST api/orders/create
//@desc		post customer
//@access	private
router.post('/create', passport.authenticate('jwt', { session: false }), (req, res) => {
	const { errors, isValid } = validateOrderInput(req.body);

	//Check Validation
	if(!isValid){
		return res.status(400).json(errors);
	}

	const newOrder = new Order({	
		customer: {
			name: req.body.name,
			phone: req.body.phone,
		},
		dressType: {
			name: req.body.name
		},
		delivery_date: req.body.delivery_date,
		order_status: req.body.order_status,
		note: req.body.note

	});
	newOrder.save()
		.then(orders => res.json(orders))
		.catch(err => console.log(err));
});

//@route	GET api/orders/get-customer
//@desc		get customer id, name
//@access	Private
router.post('/get-customer', (req, res) => {
	const { errors, isValid } = validateOrderInput(req.body);

	//Check Validation
	if(!isValid){
		return res.status(400).json(errors);
	}

	const phone = req.body.phone;
	

	//Find Customer by phone no
	Customer.findOne({phone})
		.then(customer => {
			//check for customer
			if(!customer) {
				errors.phone = 'Phone Number does not exist';
				return res.status(404).json(errors);
			}
			res.json(customer);
	});
});




module.exports = router;