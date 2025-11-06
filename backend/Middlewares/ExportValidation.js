import jwt from "jsonwebtoken";

const exportValidation = (req, res, next) => {
  try {
    const token = req?.headers?.authorization.split(" ")[1];
    const { role = null, id = null } = jwt.verify(
      token,
      process.env.JWT_SECRET
    );
   
    req.userId = id;
    req.role = role;
  } catch (error) {
    req.userId = null;
    req.role = null;
  }
  next();
};

export default exportValidation;
