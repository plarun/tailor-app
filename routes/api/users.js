const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

//Load Input Validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load Model
const User = require("../../models/User");
//Order Model
const Order = require("../../models/Order");

//@route	GET api/users/test
//@desc		Tests users route
//@access	Public
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

//@route	POST: /api/users/register
//@desc		Register user
//@access	Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  //Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

//@route	GET: /api/users/login
//@desc		Login User/ Returning JWT Token
//@access	Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  //Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  //Find User by email
  User.findOne({ email }).then((user) => {
    //check for user
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }

    //check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        //User Matched
        const payload = { id: user.id, name: user.name, email: user.email }; // Create jwt payload

        //Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

//@route	GET: /api/users/current
//@desc		Return Current user
//@access	Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      date: req.user.date,
    });
  }
);

// @route   GET: /api/users/:user_id/orders
// @desc    Get all orders of the user
// @access  Private
router.get(
  "/:user_id/orders",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.params);
    const id = new mongoose.Types.ObjectId(req.params.user_id);
    Order.aggregate([
      {
        $match: {
          user: id,
          orderStatus: {
            $in: ["New Order", "Inprogress", "Completed"],
          },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $lookup: {
          from: "customers",
          localField: "customer",
          foreignField: "_id",
          as: "customer",
        },
      },
      {
        $unwind: "$customer",
      },
      {
        $lookup: {
          from: "dresslists",
          localField: "dressType",
          foreignField: "_id",
          as: "dressType",
        },
      },
      {
        $unwind: "$dressType",
      },
      {
        $project: {
          _id: 1,
          orderId: 1,
          deliveryDays: 1,
          orderStatus: 1,
          note: 1,
          orderDate: 1,
          dueDate: 1,
          customer: "$customer.name",
          dressType: "$dressType.name",
          cost: "$dressType.cost",
        },
      },
    ])
      .then((orders) => {
        if (!orders) {
          errors.noorders = "No orders";
          return res.status(404).json(errors);
        }
        res.json(orders);
      })
      .catch((err) => res.status(404).json({ orders: "There is no orders" }));
  }
);

module.exports = router;
