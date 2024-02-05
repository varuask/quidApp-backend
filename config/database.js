const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI;

const connectToDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log(`connected to the db successfully`);
  } catch (err) {
    throw err;
  }
};

module.exports = connectToDB;
