const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Input Validation
const validateDresstypeInput = require("../../validation/dresstype");

// Load Dresslist Model
const Dresslist = require("../../models/Dresslist");

//@route	POST: /api/dresses/
//@desc		create a dress
//@access	private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateDresstypeInput(req.body);

    //Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Dresslist.findOne({ name: req.body.name }).then((dresslists) => {
      if (dresslists) {
        errors.dresstype = "This Dress type already exists";
        return res.status(400).json(errors);
      } else {
        const newDresslist = new Dresslist({
          gender: req.body.gender,
          name: req.body.name,
          cost: req.body.cost,
        });
        newDresslist
          .save()
          .then((dresslists) => res.json(dresslists))
          .catch((err) => console.log(err));
      }
    });
  }
);

//@route	GET: /api/dresses/
//@desc		Get all dresses
//@access	Public
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Dresslist.find()
      .sort({ name: "asc" })
      .then((dresslists) => {
        if (!dresslists) {
          errors.nodresslists = "No dresslists";
          return res.status(404).json(errors);
        }
        res.json(dresslists);
      })
      .catch((err) =>
        res.status(404).json({ dresslist: "There is no items in dress list" })
      );
  }
);

//@route	DELETE: /api/dresses/:id
//@desc		delete dress
//@access	private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const id = new mongoose.Types.ObjectId(req.params.id);

    Dresslist.deleteOne({ _id: id })
      .then((dress) => res.json({ success: true }))
      .catch((err) =>
        res.status(404).json({ dressnotfound: "Dress not found" })
      );
  }
);

module.exports = router;
