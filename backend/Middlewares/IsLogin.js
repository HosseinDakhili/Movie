const isLogin = (req, res, next) => {
  if (!req.userId || !req.role) {
    return res.status(403).json({
      success: false,
      message: "برای دسترسی به این بخش باید وارد شوید",
    });
  }
  next();
};

export default isLogin;
