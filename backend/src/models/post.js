import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    caption: { type: String, required: true },
    mediaUrl: { type: String, trim: true }, // image or video
    categories: [
      {
        categoryId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Category",
          required: true,
        },
        name: { type: String, required: true }, // for quick search
      },
    ],
    poll: { type: mongoose.Schema.Types.ObjectId, ref: "Poll" }, // optional
    visibility: {
      type: String,
      enum: ["public", "private"],
      default: "public",
    },
    allowComments: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
