const mongoose = require('mongoose');

const pointSchema = new mongoose.Schema({
  pointId: {
    type: Number,
    required: [true, 'pointId is required'],
    unique: true,
  },
  xCoord: {
    type: Number,
    required: [true, 'xCoord is required'],
    min: [-100, 'minimum value of xCoord can be -100'],
    max: [100, 'maximum value of xCoord can be 100'],
  },
  yCoord: {
    type: Number,
    required: true,
    min: [-100, 'minimum value of yCoord can be -100'],
    max: [100, 'maximum value of yCoord can be 100'],
  },
  label: {
    type: String,
    required: true,
    minLength: [5, 'minimum length of label can be 5'],
    maxLength: [10, 'maximum length of label can be 10'],
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
});

module.exports = mongoose.model('Point', pointSchema);
