import { searchPosts } from "../services/search.service.js";

export const searchController = async (req, res) => {
  try {
    const { searchQuery } = req.query; // e.g. /search?q=a

    if (!searchQuery) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    const posts = await searchPosts(searchQuery);

    return res.status(200).json({
      success: true,
      count: posts.length,
      posts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
