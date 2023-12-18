const express = require("express");
const router = express.Router();

const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../models/User");

router.post(
  "/createuser",
  body("email", "Enter a Valid Email ID.").isEmail(),
  //password must be at least 5 chars long
  body("name", "Provide a valid Name.").isLength({ min: 5 }),
  body("password", "Password must be 5 chars. ").isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    let securedPassword = await bcrypt.hash(req.body.password, salt);

    console.log(await User.find({ email: req.body.email }));
    try {
      if ((await User.find({ email: req.body.email })).length > 0) {
        res.json({ message: "User email Already eisted" });
      } else {
        await User.create({
          name: req.body.name,
          password: securedPassword,
          email: req.body.email,
          location: req.body.location,
        }).then((response) => {
          res.json({ success: true });
        });
      }
    } catch (e) {
      console.log(e);
      res.json({ success: false });
    }
  }
);

router.post(
  "/loginuser",
  body("email").isEmail(),
  //password must be at least 5 chars long
  body("password", "Password must be 5 chars. ").isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(400).json({ errors: "Invalid Email Provided" });
      } else {
        const pwdCompare = await bcrypt.compare(
          req.body.password,
          user.password
        );
        if (pwdCompare) {
          const data = {
            jwtUser: {
              id: user.id,
            },
          };
          const authToken = jwt.sign(data, process.env.JWT_SECRET);
          return res.json({ success: true, authToken: authToken });
        } else {
          return res
            .status(400)
            .json({ errors: "Invalid Password! Enter Valid Credential" });
        }
      }
    } catch (e) {
      console.log(e);
      res.json({ success: false });
    }
  }
);

module.exports = router;
