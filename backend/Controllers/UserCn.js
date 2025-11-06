import ApiFeatures, { catchAsync } from "vanta-api";
import User from "../Models/UserMd.js";

export const getAllUser = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(User, req?.query, req.role)
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate();
  const result = await features.execute();
  return res.status(200).json(result);
});

export const getOneUser = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(User, req?.query, req.role)
    .addManualFilters(req?.role == "admin" ? {} : { _id: req.userId })
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate();
  const result = await features.execute();
  return res.status(200).json(result);
});

export const updateUser = catchAsync(async (req, res, next) => {
  if (req.role != "admin" && req.userId != req.params.id) {
    return next(
      new HandleERROR("You are not authorized to update this user", 403)
    );
  }
  const user = await User.findById(req.params.id);
  user.username = req?.body?.username || user.username;
  user.password = req?.body?.password
    ? bcrypt.hashSync(req.body.password, 12)
    : user.password;
  user.email = req?.body?.email || user.email;
  user.role =
    req?.body?.role && req?.role == "admin" ? req.body.role : user.role;

  const newUser = user.save();
  return res.status(200).json({
    success: true,
    data: newUser,
  });
});
