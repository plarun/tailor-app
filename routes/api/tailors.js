const express = require("express");
const router = express.Router();
// const bcrypt = require('bcryptjs');
const passport = require("passport");

// Load Model
const User = require("../../models/User");

//@route	GET api/tailor/all
//@desc		Get all tailors
//@access	Private
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.find()
      .then((users) => {
        if (!users) {
          errors.nousers = "No users";
          return res.status(404).json(errors);
        }
        res.json(users);
      })
      .catch((err) =>
        res.status(404).json({ profile: "There are no profiles" })
      );
  }
);

// @route   DELETE api/tailor
// @desc    Delete tailor profile
// @access  Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

module.exports = router;
