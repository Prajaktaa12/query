let express = require("express"); //INITIALIZING EXPRESS
let Joi = require("@hapi/joi"); //FOR VALIDATION INITIALIZING HAPI-JOI
let model = require("../db/course"); //IMPORTING MODEL
let router = express.Router(); //IMPORTING ROUTER

//CREATE USER DATA
router.post("/newcourse", async (req, res) => {
  let { error } = ValidationError(req.body);
  if (error) {
    return res.send(error.details[0].message);
  }
  let newData = new model({
    tags: req.body.tags,
    date: req.body.date,
    name: req.body.name,
    author: req.body.author,
    isPublished: req.body.isPublished,
    price: req.body.price,
  });
  let data = await newData.save();
  res.send({ message: "successful", d: data });
});

//FETCH THE DATA
router.get("/course", async (req, res) => {
  let query1 = await model.find({ isPublished: true });
  let query2 = await model.find({
    tags: {
      $nin: ["Backend"], //DOESN'T INCLUDE THE SPECIFIED DATA
    },
  });
  let query3 = await model.find({}).sort("-price"); //SORT BY DESCENDING ORDER
  let query4 = await model.find({
    $and: [{ price: { $ne: 10000 } }, { price: { $gt: 10000 } }], //AND EXECUTES BOTH THE CONDITIONS
  });
  res.send({
    Message1: "ALL THE PUBLISHED COURSE",
    query1: query1,

    Message2: "TAGS THAT DOESN'T INCLUDE BACKEND",
    query2: query2,

    Message3: "SORT COURSE IN A DESCENDING ORDER BY COURSE PRICE",
    query3: query3,

    Message4: "COURSE WHERE PRICE IS NOT EQUAL TO AND IS GREATER 10,000",
    query4: query4,
  });
});

//CHECKING VALIDATION OF USER DATA
function ValidationError(error) {
  let Schema = Joi.object({
    tags: Joi.string().min(4).max(100).required(),
    date: Joi.date(),
    name: Joi.string().min(4).max(200).required(),
    author: Joi.string().min(4).max(200).required(),
    isPublished: Joi.boolean().required(),
    price: Joi.number().required(),
  });
  return Schema.validate(error);
}

//EXPORTING MODULE ROUTER
module.exports = router;
