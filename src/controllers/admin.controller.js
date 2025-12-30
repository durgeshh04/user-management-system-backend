import User from "../models/User.js";
import AppError from "../utils/AppError.js";

export const viewAllUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const users = await User.find()
      .select("-password -__v")
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments();

    res.status(200).json({
      status: "success",
      message: "Users data fetched successfully",
      data: {
        users: users,
        total: total,
        page: page,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const viewUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password -__v");
    if (!user) {
      return next(new AppError("User not found", 404));
    }
    res.status(200).json({
      status: "success",
      message: "user data fetched successfully",
      data: {
        user: user,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(new AppError("User not found", 404));
    }
    user.status = status;
    await user.save();
    res.status(200).json({
      status: "success",
      message: "Status updated successfully",
      data: {
        user: user,
      },
    });
  } catch (error) {
    next(error);
  }
};
