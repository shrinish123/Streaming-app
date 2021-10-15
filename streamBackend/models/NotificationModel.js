const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },

  notifications: [
    {
      type: {
        type: String,
        enum: ["newStream", "newComment", "newFollower","newPost"]
      },
      user: { type: Schema.Types.ObjectId, ref: "User" },
      stream: {type:Schema.Types.ObjectId,ref:"Stream"},
      post: { type: Schema.Types.ObjectId, ref: "Post" },
      commentId: { type: String },
      text: { type: String },
      date: { type: Date, default: Date.now }
    }
  ]
});

module.exports = mongoose.model("Notification", NotificationSchema);
