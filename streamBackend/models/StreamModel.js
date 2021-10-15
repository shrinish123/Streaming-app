const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StreamSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    
    title :{ type:String} ,

    thumbnail: { type: String },

    description:{type:String},

    streamKey:{type:String},
  
  },

  { timestamps: true }
);

module.exports = mongoose.model("Stream", StreamSchema);
