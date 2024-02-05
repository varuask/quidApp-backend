module.exports = async (err, req, res, next) => {
  const code = err.statusCode || 500;
  const message = err.message || 'Something went wrong';
  return res.status(code).json({ message });
};
