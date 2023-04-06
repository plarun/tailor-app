const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Input Validation
const validateOrderInput = require("../../validation/order");

//Order Model
const Order = require("../../models/Order");
// User Model
const User = require("../../models/User");
// Customer Model
const Customer = require("../../models/Customer");
// Dresslist Model
const Dresslist = require("../../models/Dresslist");

// @route   GET api/orders/user/:user_id
// @desc    Get orders by user ID
// @access  Public

router.get("/user/:user_id", (req, res) => {
  const errors = {};

  Order.find({ user: req.params.user_id })
    // .populate('user', ['name', 'email'])
    .then((orders) => {
      if (!orders) {
        errors.noorders = "There is no orders for this tailor";
        res.status(404).json(errors);
      }

      res.json(orders);
    })
    .catch((err) =>
      res.status(404).json({ orders: "There is no orders for this tailors" })
    );
});

// @route   GET api/orders/all
// @desc    Get all orders
// @access  Private
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Order.find()
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

router.get(
  "/myorders",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const id = new mongoose.Types.ObjectId(req.query.user);
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
          deliveryDays: 1,
          orderStatus: 1,
          note: 1,
          orderDate: 1,
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

router.get(
  "/delivered",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Order.aggregate([
      {
        $match: {
          orderStatus: {
            $eq: "Delivered",
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
          deliveryDays: 1,
          orderStatus: 1,
          note: 1,
          orderDate: 1,
          deliveredOn: 1,
          customer: "$customer.name",
          dressType: "$dressType.name",
          cost: "$dressType.cost",
          user: "$user.name",
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

//@route	POST api/orders/create
//@desc		post customer
//@access	private
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateOrderInput(req.body);

    //Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newOrder = new Order({
      customer: req.body.customer,
      user: req.body.user,
      dressType: req.body.dressType,
      deliveryDays: req.body.deliveryDays,
      orderStatus: req.body.orderStatus,
      note: req.body.note,
      deliveredOn: null,
    });
    newOrder
      .save()
      .then((orders) => res.json(orders))
      .catch((err) => console.log(err));
  }
);

//@route	POST api/orders/edit
//@desc		update customer
//@access	private
router.post(
  "/edit",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const id = new mongoose.Types.ObjectId(req.body._id);

    console.log(req.body);

    Order.updateOne(
      { _id: id },
      {
        $set: {
          note: req.body.note,
          deliveryDays: req.body.deilveryDays,
          orderStatus: req.body.orderStatus,
          deliveredOn: req.body.deliveredOn,
        },
      }
    )
      .then((order) => res.json(order))
      .catch((err) => {
        res.status(404).json({ order: "Unable to update order" });
      });
  }
);

//@route	POST api/orders/delete
//@desc		delete order
//@access	private
router.post(
  "/delete",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const id = new mongoose.Types.ObjectId(req.body._id);

    //Check Validation
    // if(!isValid){
    // 	return res.status(400).json(errors);
    // }

    Order.deleteOne({ _id: id })
      .then((order) => res.json(order))
      .catch((err) =>
        res.status(404).json({ order: "Unable to delete order" })
      );
  }
);

//@route	GET api/orders/get-customer
//@desc		get customer id, name
//@access	Private
router.post("/get-customer", (req, res) => {
  const { errors, isValid } = validateOrderInput(req.body);

  //Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const phone = req.body.phone;

  //Find Customer by phone no
  Customer.findOne({ phone }).then((customer) => {
    //check for customer
    if (!customer) {
      errors.phone = "Phone Number does not exist";
      return res.status(404).json(errors);
    }
    res.json(customer);
  });
});

router.get(
  "/stats",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // format date
    const formatDate = (date) => {
      const newDate = new Date(date);
      let formattedDate = `${newDate.getFullYear()}-`;
      formattedDate += `${`0${newDate.getMonth() + 1}`.slice(-2)}-`;
      formattedDate += `${`0${newDate.getDate()}`.slice(-2)}`;
      return formattedDate;
    };

    const statsDate = formatDate(req.query.statsDate);
    const userid = new mongoose.Types.ObjectId(req.query.user);

    Order.aggregate([
      {
        $addFields: {
          orderedDate: {
            $dateToString: { format: "%Y-%m-%d", date: "$orderDate" },
          },
        },
      },
      { $match: { user: userid, orderedDate: { $eq: statsDate } } },
      { $count: "OrdersCount" },
      {
        $unionWith: {
          coll: "orders",
          pipeline: [
            {
              $addFields: {
                deliveredDate: {
                  $dateToString: { format: "%Y-%m-%d", date: "$deliveredOn" },
                },
              },
            },
            { $match: { user: userid, deliveredDate: { $eq: statsDate } } },
            { $count: "DeliveredCount" },
          ],
        },
      },
      {
        $unionWith: {
          coll: "orders",
          pipeline: [
            {
              $match: {
                user: userid,
                orderStatus: { $in: ["New Order", "Inprogress", "Completed"] },
              },
            },
            { $group: { _id: "$orderStatus", count: { $sum: 1 } } },
          ],
        },
      },
    ])
      .then((stats) => {
        if (!stats) {
          errors.noorders = "No stats";
          return res.status(404).json(errors);
        }

        const orderStats = {
          ordersCount: 0,
          deliveredCount: 0,
          inprogressCount: 0,
          newOrderCount: 0,
          completedCount: 0,
        };

        for (const val of stats) {
          if (val._id && val._id === "Inprogress") {
            orderStats.inprogressCount = val.count;
          } else if (val._id && val._id === "New Order") {
            orderStats.newOrderCount = val.count;
          } else if (val._id && val._id === "Completed") {
            orderStats.completedCount = val.count;
          } else if (val.OrdersCount) {
            orderStats.ordersCount = val.OrdersCount;
          } else if (val.DeliveredCount) {
            orderStats.deliveredCount = val.DeliveredCount;
          }
        }

        res.json(orderStats);
      })
      .catch((err) => {
        console.log(err);
        return res.status(404).json({ orders: "No Stats" });
      });
  }
);

module.exports = router;
