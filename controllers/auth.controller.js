import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

import User from "../models/User.model.js";
import { errorHandler } from "../utils/error.js";

// Singup controller
export const singup = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({ ...req.body, password: hash });

    await newUser.save();
    res.status(200).send("User has been created");
  } catch (err) {
    next(err);
  }
};

// Singin controller
export const singin = async (req, res, next) => {
  try {
    const user = await User.findOne({ name: req.body.name });
    if (!user) return next(errorHandler(404, "User not found"));

    const isCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isCorrect) return next(errorHandler(400, "Wrong password"));

    const token = Jwt.sign({ id: user._id }, process.env.JWT_KEY);
    const { password, ...others } = user._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  } catch (err) {
    next(err);
  }
};
