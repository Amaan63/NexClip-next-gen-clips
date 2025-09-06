import Post from "../models/post.js";
import mongoose from "mongoose";
import { getCategoriesByName } from "./category.service.js";
import { createPoll } from "./poll.service.js";

// Service to create a new post
export const createPost = async ({
  caption,
  mediaUrl,
  categories, // array of category IDs
  poll, // { question, options } or pollId
  visibility,
  allowComments,
}) => {
  // format categories
  const formattedCategories = await getCategoriesByName(categories);

  let pollValue = await createPoll(poll); // Create poll and get its ID or message

  // Create post
  const post = new Post({
    caption: caption.trim(),
    mediaUrl: mediaUrl?.trim() || null,
    categories: formattedCategories,
    poll: pollValue || null, // Either poll ID or null
    visibility: visibility || "public",
    allowComments: allowComments || false,
  });

  await post.save();

  return post;
};

// Service to fetch all public posts for users
export const getAllPublicPosts = async () => {
  const posts = await Post.find({ visibility: "public" })
    .populate("categories.categoryId", "name")
    .populate("poll", "question options isActive"); // only fetch useful fields

  if (!posts || posts.length === 0) {
    throw new Error("No public posts found");
  }

  // Format poll: return either populated poll or message
  return posts.map((post) => ({
    ...post.toObject(),
    poll: post.poll || post.pollMessage,
  }));
};

// Service to fetch all posts for admin (no restrictions)
export const getAllPostsForAdmin = async () => {
  const posts = await Post.find({})
    .populate("categories.categoryId", "name")
    .populate("poll", "question options isActive");

  if (!posts || posts.length === 0) {
    throw new Error("No posts found in the system");
  }

  return posts.map((post) => ({
    ...post.toObject(),
    poll: post.poll || post.pollMessage,
  }));
};
