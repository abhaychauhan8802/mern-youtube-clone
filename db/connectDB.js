import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("DB is connected");
    })
    .catch((err) => {
      throw err;
    });
};
