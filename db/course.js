let mongoose = require("mongoose"); //INITIALIZING MONGOOSE

//CREATING SCHEMA
let courseSchema = new mongoose.Schema({
  tags: { type: String, min: 4, max: 100, required: true },
  date: { type: Date, default: Date.now() },
  name: { type: String, min: 4, max: 100, required: true },
  author: { type: String, min: 4, max: 100, required: true },
  isPublished: { type: Boolean, required: true },
  price: { type: Number, required: true },
});

//CREATING MODEL
let courseModel = mongoose.model("courseDetails", courseSchema);
//EXPORTING MODEL
module.exports = courseModel;
