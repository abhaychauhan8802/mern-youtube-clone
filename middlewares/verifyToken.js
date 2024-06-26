import Jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(errorHandler(401, "You are not authenticated!"));

  Jwt.verify(token, process.env.JWT_KEY, (err, user) => {
    if (err) return next(errorHandler(403, "Token is not valid!"));
    req.user = user;
    next();
  });
};
