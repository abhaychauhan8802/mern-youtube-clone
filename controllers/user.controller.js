import User from "../models/User.model.js";
import { createError } from "../utils/error.js";

// Update user
export const updateUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      const { password, ...other } = updatedUser._doc;
      res.status(200).json(other);
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "You are not allow to update this account"));
  }
};

// Delete user
export const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User deleted");
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "You are not allow to delete this account"));
  }
};

// Find a user
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// Subscribe a user
export const subscribe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $push: { subscribedUsers: req.params.id },
    });

    await User.findOneAndUpdate(req.params.id, {
      $inc: { subscribers: +1 },
    });
    res.status(200).json("Subscribed successfull");
  } catch (err) {
    next(err);
  }
};

// Unsubscribe a user
export const unsubscribe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { subscribedUsers: req.params.id },
    });

    await User.findOneAndUpdate(req.params.id, {
      $inc: { subscribers: -1 },
    });
    res.status(200).json("Unsubscribed successfull");
  } catch (err) {
    next(err);
  }
};

// Like a video
export const like = (req, res, next) => {};

// Like a video
export const dislike = (req, res, next) => {};
