const Point = require('../models/Point');
const ErrorResponse = require('../utils/ErrorResponse');

exports.getData = async (req, res, next) => {
  try {
    const data = await Point.find({}, { createdAt: 0, __v: 0 });
    return res.status(200).json(data);
  } catch (err) {
    return next(new ErrorResponse(err.message, 500));
  }
};

exports.insertPoint = async (req, res, next) => {
  try {
    const requestData = { ...req.body };
    await Point.create(requestData);
    return res.status(201).json({ message: 'point successfully added' });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new ErrorResponse(err.message, 400));
    }
    return next(new ErrorResponse(err.message, 500));
  }
};

exports.updatePoint = async (req, res, next) => {
  try {
    const requestData = { ...req.body };
    if (!requestData.id) {
      return next(new ErrorResponse('invalid input', 400));
    }
    const options = {
      new: true,
      runValidators: true,
      context: 'query',
    };
    const { id, ...requestUpdates } = requestData;
    const result = await Point.findByIdAndUpdate(id, requestUpdates, options);
    if (!result) {
      return next(new ErrorResponse('No such point found', 400));
    }
    return res.status(200).json({ message: 'point updated successfulyy' });
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new ErrorResponse('No such point found', 400));
    }
    return next(new ErrorResponse(err.message, 500));
  }
};

exports.deletePoint = async (req, res, next) => {
  try {
    const id = req.query.id;
    if (!id) {
      return next(new ErrorResponse('invalid input', 400));
    }
    const result = await Point.findByIdAndDelete(id);
    if (!result) {
      return next(new ErrorResponse('No such point found', 400));
    }
    return res.status(200).json({ message: 'point deleted successfulyy' });
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new ErrorResponse('No such point found', 400));
    }
    return next(new ErrorResponse(err.message, 500));
  }
};
