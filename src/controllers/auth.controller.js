import User from "../models/User.js";
import * as bcrypt from "bcrypt";
import { generateToken } from "../utils/token.js";
import AppError from "../utils/AppError.js";

export const signup = async (req, res, next) => {
  try {
    const { fullName, email, password, role, status } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new AppError("User already exists", 400));
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      role: role || "user",
      status: status || "active",
    });

    const token = generateToken(newUser);
    return res
      .status(201)
      .json({ message: "New User created successfully", token: token });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const validUser = await User.findOne({ email });
    const validPassword = await bcrypt.compare(password, validUser.password);
    if (!validUser || validUser.status == "deactive" || !validPassword) {
      return next(new AppError("Credentials are invalid", 404));
    }

    validUser.lastLogin = new Date();
    await validUser.save();
    const token = generateToken(validUser);
    res
      .status(201)
      .json({ message: "User logged in successfully", token: token });
  } catch (error) {
    next(error);
  }
};
