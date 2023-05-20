const mongoose = require("mongoose");
const mongoURI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}?retryWrites=true&w=majority`

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Mongo DB connected");
  } catch (err) {
    console.log(err.message);
    // exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
