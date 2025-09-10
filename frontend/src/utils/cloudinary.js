import {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_UPLOAD_PRESET,
  MAX_FILE_SIZE,
  ALLOWED_IMAGE_TYPES,
  ALLOWED_VIDEO_TYPES,
  ERROR_MESSAGES,
} from "./constants";

/**
 * Validate file before upload
 * @param {File} file - The file to validate
 * @param {string} type - Expected file type ('image', 'video', 'auto')
 * @returns {boolean} - Whether file is valid
 */
export const validateFile = (file, type = "auto") => {
  if (!file) {
    throw new Error("No file provided");
  }

  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    throw new Error(ERROR_MESSAGES.FILE_TOO_LARGE);
  }

  // Check file type
  const allowedTypes =
    type === "image"
      ? ALLOWED_IMAGE_TYPES
      : type === "video"
      ? ALLOWED_VIDEO_TYPES
      : [...ALLOWED_IMAGE_TYPES, ...ALLOWED_VIDEO_TYPES];

  if (!allowedTypes.includes(file.type)) {
    throw new Error(ERROR_MESSAGES.INVALID_FILE_TYPE);
  }

  return true;
};

/**
 * Upload file to Cloudinary
 * @param {File} file - The file to upload
 * @param {string} type - Upload type ('image', 'video', 'auto')
 * @returns {Promise<string>} - The uploaded file URL
 */
export const uploadToCloudinary = async (file, type = "auto") => {
  // Validate environment variables
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
    throw new Error(
      "Cloudinary configuration is missing. Please check your environment variables."
    );
  }

  try {
    // Validate file
    validateFile(file, type);

    // Create FormData for upload
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    // Determine resource type
    const resourceType =
      type === "image" ? "image" : type === "video" ? "video" : "auto";

    formData.append("resource_type", resourceType);

    // Optional: Add transformation parameters
    if (type === "image") {
      formData.append("transformation", "f_auto,q_auto");
    } else if (type === "video") {
      formData.append("transformation", "f_auto,q_auto,vc_h264");
    }

    // Upload to Cloudinary
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    return data.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  }
};

/**
 * Generate Cloudinary URL with transformations
 * @param {string} publicId - Cloudinary public ID
 * @param {object} transformations - Transformation options
 * @returns {string} - Transformed image URL
 */
export const generateCloudinaryUrl = (publicId, transformations = {}) => {
  if (!CLOUDINARY_CLOUD_NAME || !publicId) {
    return "";
  }

  const baseUrl = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}`;

  // Build transformation string
  const transformString = Object.entries(transformations)
    .map(([key, value]) => `${key}_${value}`)
    .join(",");

  const transformationPart = transformString ? `/${transformString}` : "";

  return `${baseUrl}/image/upload${transformationPart}/${publicId}`;
};

/**
 * Get video thumbnail from Cloudinary
 * @param {string} videoUrl - Cloudinary video URL
 * @returns {string} - Thumbnail URL
 */
export const getVideoThumbnail = (videoUrl) => {
  if (!videoUrl || !videoUrl.includes("cloudinary.com")) {
    return "";
  }

  // Extract public ID from video URL
  const parts = videoUrl.split("/");
  const uploadIndex = parts.findIndex((part) => part === "upload");

  if (uploadIndex === -1) return "";

  const publicIdWithExtension = parts[uploadIndex + 1];
  const publicId = publicIdWithExtension.split(".")[0];

  return generateCloudinaryUrl(publicId, {
    f: "jpg",
    so: "0",
    q: "auto",
  });
};

/**
 * Delete file from Cloudinary (requires backend implementation)
 * Note: Direct deletion from frontend is not recommended for security
 * This function would typically call your backend API
 * @param {string} publicId - Cloudinary public ID to delete
 * @returns {Promise<boolean>} - Success status
 */
export const deleteFromCloudinary = async (publicId) => {
  // This would typically call your backend API
  console.warn(
    "File deletion should be handled by the backend for security reasons"
  );

  try {
    // Example: Call your backend API to delete the file
    // const response = await fetch('/api/upload/delete', {
    //   method: 'DELETE',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ publicId })
    // })
    // return response.ok

    return true;
  } catch (error) {
    console.error("Error deleting file:", error);
    return false;
  }
};

// Helper function to extract public ID from Cloudinary URL
export const extractPublicId = (cloudinaryUrl) => {
  if (!cloudinaryUrl || !cloudinaryUrl.includes("cloudinary.com")) {
    return null;
  }

  try {
    const parts = cloudinaryUrl.split("/");
    const uploadIndex = parts.findIndex((part) => part === "upload");

    if (uploadIndex === -1) return null;

    // Skip transformation part if exists
    let publicIdIndex = uploadIndex + 1;
    if (parts[publicIdIndex] && parts[publicIdIndex].includes("_")) {
      publicIdIndex += 1;
    }

    const publicIdWithExtension = parts[publicIdIndex];
    return publicIdWithExtension ? publicIdWithExtension.split(".")[0] : null;
  } catch (error) {
    console.error("Error extracting public ID:", error);
    return null;
  }
};
