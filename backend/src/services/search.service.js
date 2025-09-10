import Post from "../models/post.js";

export const searchPosts = async (query) => {
  try {
    if (!query) {
      return []; // No query provided
    }

    // Case-insensitive regex for partial match
    const regex = new RegExp(query, "i");

    const posts = await Post.find({
      visibility: "public", // Only public posts
      $or: [
        { caption: { $regex: regex } }, // Match caption
        { "categories.name": { $regex: regex } }, // ✅ Match category name inside object
      ],
    }).sort({ createdAt: -1 }); // Latest first

    return posts;
  } catch (error) {
    throw new Error("Error while searching posts: " + error.message);
  }
};
