//REMOVE URI BEFORE COMMITTING!!!

const mongoose = require("mongoose");
const uri = "mongodb+srv://kruane2:<password>@csc436.xaxmppu.mongodb.net/?retryWrites=true&w=majority";
function connect() {
  const options = { useNewUrlParser: true };
  mongoose.connect(uri, options).then(
    () => {
      console.log("Database connection established!");
    },
    (err) => {
      console.log("Error connecting Database instance due to: ", err);
    }
  );
}
module.exports = connect;