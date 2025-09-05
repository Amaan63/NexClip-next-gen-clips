import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, trim: true },
    avatarUrl: { type: String, trim: true, required: true }, // optional
  },
  { timestamps: true }
);
const Category = mongoose.model("Category", categorySchema);

export default Category;
