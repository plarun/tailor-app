const express = require("express");
const router = express.Router();
const passport = require("passport");

// Load Input Validation
const validateDresstypeInput = require("../../validation/dresstype");

// Load Dresslist Model
const Dresslist = require("../../models/Dresslist");

//@route	POST api/dresslists/create
//@desc		post all dresslists
//@access	private
router.post(
  "/create",
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

//@route	GET api/dresslists/all
//@desc		Get all dresslists
//@access	Public
router.get(
  "/all",
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

module.exports = router;
