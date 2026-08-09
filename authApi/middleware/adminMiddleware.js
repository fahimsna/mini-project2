let adminMiddleware = (req, res, next) => {
  if (req.name.role !== "admin") {
    return res.status(403).json({
      status: 0,
      message: "Access Denied",
    });
  }

  next();
};

module.exports = adminMiddleware;
