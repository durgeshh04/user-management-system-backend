import User from "../models/User.js";
import * as bcrypt from "bcrypt";
import AppError from "../utils/AppError.js";

export const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select({
      password: 0,
      createdAt: 0,
      updatedAt: 0,
      __v: 0,
    });
    if (!user) {
      return next(new AppError("User not found", 404));
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    // const { fullName, email } = req.body;
    const updateUser = await User.findByIdAndUpdate(
      req.user.id,
      { $set: req.body },
      {
        new: true,
        runValidators: true,
      }
    ).select("-password -__v");
    if (!updateProfile) {
      return next(new AppError("User does not exists", 404));
    }
    res.status(201).json({
      status: "success",
      message: "Profile updated successfully",
      data: {
        user: updateUser,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id).select("password");
    if (!user) {
      return next(new AppError("User not found", 404));
    }
    const validPassword = await bcrypt.compare(oldPassword, user.password);
    if (!validPassword) {
      return next(new AppError("Invalid old password", 400));
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(201).json({ message: "password changed successfully" });
  } catch (error) {
    next(error);
  }
};
