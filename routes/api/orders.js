const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Input Validation
const validateOrderInput = require("../../validation/order");

//Order Model
const Order = require("../../models/Order");
// Customer Model
const Customer = require("../../models/Customer");
// Counter Model
const Counter = require("../../models/Counter");

// @route   GET: /api/orders/
// @desc    Get all orders
// @access  Private
router.get(
  "/",
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

// @route   GET: /api/orders/delivered
// @desc    Get all delivered orders
// @access  Private
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
          orderId: 1,
          deliveryDays: 1,
          orderStatus: 1,
          note: 1,
          orderDate: 1,
          dueDate: 1,
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

//@route	POST: /api/orders/
//@desc		post customer
//@access	private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateOrderInput(req.body);

    //Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // get next order id seq
    Counter.findByIdAndUpdate(
      { _id: "orderId" },
      { $inc: { seq: 1 } },
      function (err, counter) {
        if (err) {
          console.log("error: ", err);
        }
        console.log(counter);
        const newOrder = new Order({
          customer: req.body.customer,
          orderId: counter.seq,
          user: req.body.user,
          dressType: req.body.dressType,
          dueDate: req.body.dueDate,
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
  }
);

//@route	PATCH: /api/orders/
//@desc		update order
//@access	private
router.patch(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const id = new mongoose.Types.ObjectId(req.body._id);

    console.log(req.body);

    Order.updateOne(
      { _id: id },
      {
        $set: {
          note: req.body.note,
          dueDate: req.body.dueDate,
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

//@route	DELETE: /api/orders/:id
//@desc		delete order
//@access	private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const id = new mongoose.Types.ObjectId(req.params.id);

    Order.deleteOne({ _id: id })
      .then((order) => res.json(order))
      .catch((err) =>
        res.status(404).json({ order: "Unable to delete order" })
      );
  }
);

//@route	GET: /api/orders/stats
//@desc		get statistics of orders
//@access	private
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
