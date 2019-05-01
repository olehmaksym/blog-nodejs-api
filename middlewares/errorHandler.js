export default (err, reg, res, next) => {
  let { status = 500, message = 'Server Error' } = err;

  return res
    .status(status)
    .json({ message })
};