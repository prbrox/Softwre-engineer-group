const asyncHandler = (fn) => (res, record) => {
    try {
      fn(res, record);
    } catch (error) {
      console.log(error)
      res.status(400).send("error");
    }
  };

  module.exports = asyncHandler;
  