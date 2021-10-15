const express = require("express");
const router = express.Router();
const UserModel = require("../models/UserModel");
const SubscriptionModel = require('../models/SubscriptionModel')
const NotificationModel = require("../models/NotificationModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const isEmail = require("validator/lib/isEmail");
const userPng =
  "https://res.cloudinary.com/indersingh/image/upload/v1593464618/App/user_mklcpl.png";
  const { v4: uuidv4 } = require('uuid');


const regexUserName = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;

router.get("/:username", async (req, res) => {
  const { username } = req.params;

  try {
    if (username.length < 1) return res.status(401).send("Invalid");

    if (!regexUserName.test(username)) return res.status(401).send("Invalid");

    const user = await UserModel.findOne({ username: username });

    if (user) return res.status(401).send("Username already taken");

    return res.status(200).send("Available");
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error`);
  }
});

router.post("/", async (req, res) => {
  const {
    name,
    email,
    username,
    password,
  } = req.body.user;

  if (!isEmail(email)) return res.status(401).send("Invalid Email");

  if (password.length < 6) {
    return res.status(401).send("Password must be atleast 6 characters");
  }

  try {
    let user;
    user = await UserModel.findOne({ email: email });
    if (user) {
      return res.status(401).send("User already registered");
    }

    user = new UserModel({
      name,
      email: email,
      username: username,
      password,
      profilePicUrl: req.body.profilePicUrl || userPng,
      streamKey:uuidv4(),
    });

    user.password = await bcrypt.hash(password, 10);
    await user.save();

    
    await new NotificationModel({ user: user._id, notifications: [] }).save();
    await new SubscriptionModel({user:user._id,followedChannels:[],SubscribedChannels:[]}).save();

    const payload = { userId: user._id };
    jwt.sign(payload, process.env.jwtSecret, { expiresIn: "5d" }, (err, token) => {
      if (err) throw err;
      res.status(200).json(token);
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error`);
  }
});

module.exports = router;
