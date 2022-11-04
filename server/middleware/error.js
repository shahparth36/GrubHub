function errorHandler(err, req, res, next) {
  console.log("err");
  console.log(err);
  switch (true) {
    case typeof err.message === "string":
      return res.status(400).json({ error: err.message });

    default:
      return res.status(500).json({
        type: "Internal Server Error",
        message: "An Internal Server Error occurred",
        statusCode: 500,
      });
  }
}

module.exports = {
  errorHandler,
};
