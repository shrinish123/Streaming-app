const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubscriptionSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref:'User' },

    followedChannels:[
        {
            user:{type:Schema.Types.ObjectId,ref:'User'},
        }
    ],

    SubscribedChannels:[
        {
            user:{type:Schema.Types.ObjectId,ref:'User'},
        }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subscription", SubscriptionSchema);
