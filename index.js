import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
// local imports
import { connectDB } from "./db/connectDB.js";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import videoRoutes from "./routes/video.js";
import commentRoutes from "./routes/comment.js";

const app = express();
dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";

  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.listen(8800, () => {
  connectDB();
  console.log("Server is listen on port 8800");
});
