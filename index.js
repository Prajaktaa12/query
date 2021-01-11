//INITIALIZING ALL THE REQUIRED MODULES
let express = require("express");
let mongoose = require("mongoose");
let app = express();
let course = require("./routes/course");
//INITIALIZING PORT THAT IS TO BE USED
let port = process.env.PORT || 4500;
app.use(express.json());
app.use("/api", course);

//INITIALIZING MONGOOSE CONNECTION
mongoose
  .connect("mongodb://localhost/query", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to db"))
  .catch((error) => console.log(`something went wrong ${error.message}`));
app.listen(port, () => console.log(`port is working on ${port}`));
