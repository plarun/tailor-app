const express = require("express");
const router = express.Router();
// const bcrypt = require('bcryptjs');
const passport = require("passport");

// Load Model
const User = require("../../models/User");

//@route	GET: /api/tailors/
//@desc		Get all tailors profile
//@access	Private
router.get(
  "/",
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

// @route   DELETE: /api/tailors/:id
// @desc    Delete tailor profile
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOneAndRemove({ user: req.params.id }).then(() => {
      User.findOneAndRemove({ _id: req.params.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

module.exports = router;
