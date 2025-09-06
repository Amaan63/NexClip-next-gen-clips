import mongoose from "mongoose";

const reelSchema = new mongoose.Schema(
  {
    caption: {
      type: String,
      required: true,
      trim: true,
    },
    mediaUrl: {
      type: String,
      required: true,
      trim: true,
    },
    isVisible: {
      type: Boolean,
      default: true, // By default, the reel is visible
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

const Reel = mongoose.model("Reel", reelSchema);

export default Reel;
