const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");

const users = require("./routes/api/users");
const admin = require("./routes/api/admin");
const tailors = require("./routes/api/tailors");
const dresses = require("./routes/api/dresses");
const customers = require("./routes/api/customers");
const orders = require("./routes/api/orders");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose.set("strictQuery", true);
mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

//Passport middleware
app.use(passport.initialize());

//Passport Config
require("./config/passport")(passport);

//use routes
app.use("/api/users", users);
app.use("/api/users", admin);
app.use("/api/tailors", tailors);
app.use("/api/dresses", dresses);
app.use("/api/customers", customers);
app.use("/api/orders", orders);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
