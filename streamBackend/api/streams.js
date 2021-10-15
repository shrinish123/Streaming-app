const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();
const UserModel = require("../models/UserModel");
const thumbnail = 'https://res.cloudinary.com/dk96bclgg/image/upload/v1628255508/thubnail_l5cbrs.png'
const StreamModel = require('../models/StreamModel');

router.get("/info", async (req, res) => {
  const { live } = req.query;
  const string = JSON.stringify(live);
  const liveObject = JSON.parse(string);
  const object = JSON.parse(liveObject);

  if (object) {
    const keys = Object.keys(object);

    try {
      let users = [];

      for (let i = 0; i < keys.length; i++) {
        let user = await UserModel.findOne({ streamKey: keys[i] });
        if (user) {
          users.push(user);
        } else {
          continue;
        }
      }
      return res.status(200).json(users);
    } catch (error) {
      console.log(error);
      res.status(500).send("Server error");
    }
  }
});

router.get("/user", authMiddleware, async (req, res) => {
  const { username } = req.query;

  try {
    const user = await UserModel.findOne({ username });
    if(!user) return res.status(404).send('No user found');

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server Error");
  }
});

router.get("/comment", authMiddleware, async (req, res) => {
  const { userId } = req.query;

  try {
    const user = await UserModel.findById(userId);
    if(!user) return res.status(404).send('No user found');

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server Error");
  }
});

router.post('/',async(req,res)=>{

  try {

    const {userId,title,description,streamKey} = req.body;

    const newStream= {
      user:userId,
      title,
      description,
      thumbnail:req.body.thumbnail || thumbnail,
      streamKey,
    }

    await new StreamModel(newStream).save();
    return res.status(200).json(newStream);
    
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error`);
  }
})

router.get('/',async(req,res)=>{
  const { live } = req.query;
  const string = JSON.stringify(live);
  const liveObject = JSON.parse(string);
  const object = JSON.parse(liveObject);

  if (object) {
    const keys = Object.keys(object);

    try {
      let streams = [];

      for (let i = 0; i < keys.length; i++) {
        let stream = await StreamModel.findOne({ streamKey: keys[i] }).populate('user');
        if (stream) {
          streams.push(stream);
        } else {
          continue;
        }
      }
      return res.status(200).json(streams);
    } catch (error) {
      console.log(error);
      res.status(500).send("Server error");
    }
  }
    
})


module.exports = router;
