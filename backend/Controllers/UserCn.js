import ApiFeatures, { catchAsync, HandleERROR } from "vanta-api";
import User from "../Models/UserMd.js";
import bcrypt from "bcryptjs";

export const getAllUser = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(User, req?.query, req.role)
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate();

  const result = await features.execute();

  return res.status(200).json({
    success: true,
    message: "کاربران با موفقیت دریافت شدند",
    ...result,
  });
});

export const getOneUser = catchAsync(async (req, res, next) => {
    const {id} = req.params
  const filters =
    req?.role === "admin" ? {_id:id} : { _id: req.userId };

  const features = new ApiFeatures(User, req?.query, req.role)
    .addManualFilters(filters)
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .populate();

  const result = await features.execute();

  return res.status(200).json({
    success: true,
    message: "اطلاعات کاربر با موفقیت دریافت شد",
    ...result,
  });
});

export const updateUser = catchAsync(async (req, res, next) => {
  // بررسی سطح دسترسی
  if (req.role !== "admin" && req.userId !== req.params.id) {
    return next(
      new HandleERROR("شما مجاز به ویرایش این کاربر نیستید", 403)
    );
  }

  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new HandleERROR("کاربر مورد نظر یافت نشد", 404));
  }

  
  user.username = req?.body?.username || user.username;
  user.password = req?.body?.password
    ? bcrypt.hashSync(req.body.password, 12)
    : user.password;
  user.email = req?.body?.email || user.email;

  
  if (req?.body?.role && req?.role === "admin") {
    user.role = req.body.role;
  }

  const newUser = await user.save();

  return res.status(200).json({
    success: true,
    message: "اطلاعات کاربر با موفقیت بروزرسانی شد",
    data: newUser,
  });
});
