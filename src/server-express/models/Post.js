const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PostSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  dateSet: { type: String, required: true },
  complete: { type: Boolean, required: true },
  dateComplete: { type: String, required: false }
});
//Export model
module.exports = mongoose.model("Post", PostSchema);