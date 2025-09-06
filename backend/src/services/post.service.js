import Post from "../models/post.js";
import Category from "../models/category.js";
import Poll from "../models/poll.js";
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
    poll: pollValue, // Either poll ID or default message
    visibility: visibility || "public",
    allowComments: allowComments || false,
  });

  await post.save();

  return post;
};
