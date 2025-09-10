// API Base URL
export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api/fantasyHub";

// App Configuration
export const APP_NAME = import.meta.env.VITE_APP_NAME || "NexClip";
export const APP_VERSION = import.meta.env.VITE_APP_VERSION || "1.0.0";

// Cloudinary Configuration
export const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_UPLOAD_PRESET = import.meta.env
  .VITE_CLOUDINARY_UPLOAD_PRESET;

// File Upload Limits
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];
export const ALLOWED_VIDEO_TYPES = [
  "video/mp4",
  "video/webm",
  "video/ogg",
  "video/avi",
];

// Pagination
export const POSTS_PER_PAGE = 10;
export const REELS_PER_PAGE = 10;
export const COMMENTS_PER_PAGE = 20;

// UI Constants
export const TOAST_DURATION = 3000;
export const DEBOUNCE_DELAY = 300;
export const SKELETON_LOADER_COUNT = 3;

// Post Visibility Options
export const POST_VISIBILITY = {
  PUBLIC: "public",
  PRIVATE: "private",
};

// Poll Configuration
export const MAX_POLL_OPTIONS = 10;
export const MIN_POLL_OPTIONS = 2;

// Form Validation
export const VALIDATION_RULES = {
  USERNAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 20,
    PATTERN: /^[a-zA-Z0-9_]+$/,
  },
  PASSWORD: {
    MIN_LENGTH: 6,
    MAX_LENGTH: 100,
  },
  POST_CAPTION: {
    MAX_LENGTH: 500,
  },
  REEL_CAPTION: {
    MAX_LENGTH: 200,
  },
  CATEGORY_NAME: {
    MAX_LENGTH: 50,
  },
  CATEGORY_DESCRIPTION: {
    MAX_LENGTH: 200,
  },
  COMMENT_TEXT: {
    MAX_LENGTH: 300,
  },
};

// Navigation Routes
export const ROUTES = {
  HOME: "/",
  SEARCH: "/search",
  REELS: "/reels",
  PROFILE: "/profile",
  LOGIN: "/login",
  ADMIN: "/admin",
};

// Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: "token",
  USER_DATA: "userData",
  THEME: "theme",
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Network error. Please check your connection.",
  UNAUTHORIZED: "You are not authorized to perform this action.",
  SESSION_EXPIRED: "Session expired. Please login again.",
  FILE_TOO_LARGE: "File size exceeds the maximum limit.",
  INVALID_FILE_TYPE: "Invalid file type.",
  REQUIRED_FIELD: "This field is required.",
  LOGIN_REQUIRED: "Please login to continue.",
};

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: "Login successful!",
  LOGOUT_SUCCESS: "Logged out successfully",
  POST_CREATED: "Post created successfully!",
  POST_UPDATED: "Post updated successfully!",
  POST_DELETED: "Post deleted successfully!",
  REEL_CREATED: "Reel created successfully!",
  REEL_UPDATED: "Reel updated successfully!",
  REEL_DELETED: "Reel deleted successfully!",
  CATEGORY_CREATED: "Category created successfully!",
  CATEGORY_UPDATED: "Category updated successfully!",
  CATEGORY_DELETED: "Category deleted successfully!",
  COMMENT_ADDED: "Comment added!",
  FILE_UPLOADED: "File uploaded successfully!",
};

// Social Media Integration (for future use)
export const SOCIAL_SHARE_URLS = {
  TWITTER: "https://twitter.com/intent/tweet",
  FACEBOOK: "https://www.facebook.com/sharer/sharer.php",
  LINKEDIN: "https://www.linkedin.com/sharing/share-offsite/",
  WHATSAPP: "https://wa.me/",
};
