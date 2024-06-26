import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      require: true,
    },
    videoId: {
      type: String,
      require: true,
    },
    comment: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Comments", CommentSchema);
