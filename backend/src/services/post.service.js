import Post from "../models/post.js";
import mongoose from "mongoose";
import { getCategoriesByName } from "./category.service.js";
import { createPoll, updatePoll } from "./poll.service.js";
import Poll from "../models/poll.js";

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
    .populate("poll");

  if (!posts || posts.length === 0) {
    throw new Error("No public posts found");
  }

  // Always return poll field
  return posts.map((post) => {
    const plainPost = post.toObject();
    return {
      ...plainPost,
      poll: plainPost.poll ? plainPost.poll : null, // always include poll
    };
  });
};

// Service to fetch all posts for admin (no restrictions)
export const getAllPostsForAdmin = async () => {
  const posts = await Post.find({})
    .populate("categories.categoryId", "name")
    .populate("poll");

  if (!posts || posts.length === 0) {
    throw new Error("No posts found in the system");
  }

  return posts.map((post) => {
    const plainPost = post.toObject();
    return {
      ...plainPost,
      poll: plainPost.poll ? plainPost.poll : null, // always include poll
    };
  });
};

// ✅ Update Post
export const updatePost = async (postId, updateData) => {
  const post = await Post.findById(postId);
  if (!post) {
    throw new Error("Post not found");
  }

  const { caption, mediaUrl, categories, poll, visibility, allowComments } =
    updateData;

  // Update caption
  if (caption) post.caption = caption.trim();

  // Update media
  if (mediaUrl) post.mediaUrl = mediaUrl.trim();

  // Update categories
  if (categories && categories.length > 0) {
    const formattedCategories = await getCategoriesByName(categories);
    post.categories = formattedCategories;
  }

  // Update poll
  if (poll !== undefined) {
    if (poll === null) {
      // Remove poll completely
      if (post.poll) {
        await Poll.findByIdAndDelete(post.poll); // delete old poll
      }
      post.poll = null;
    } else {
      if (post.poll) {
        // Update existing poll
        const updatedPollId = await updatePoll(post.poll, poll);
        post.poll = updatedPollId;
      } else {
        // Create new poll if none exists
        const newPollId = await createPoll(poll);
        post.poll = newPollId;
      }
    }
  }

  // Update visibility
  if (visibility) post.visibility = visibility;

  // Update allowComments
  if (allowComments !== undefined) post.allowComments = allowComments;

  await post.save();
  return post;
};
