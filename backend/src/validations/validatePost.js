// validations/validatePost.js
export const validatePost = (data) => {
  const errors = [];

  // Caption validation
  if (!data.caption || data.caption.trim() === "") {
    errors.push("Caption is required");
  }

  // Media URL validation (optional)
  if (
    data.mediaUrl !== undefined &&
    (typeof data.mediaUrl !== "string" || data.mediaUrl.trim() === "")
  ) {
    errors.push("Media URL must be a non-empty string if provided");
  }

  // Categories validation (array of names)
  if (!Array.isArray(data.categories) || data.categories.length === 0) {
    errors.push("At least one category is required");
  } else {
    data.categories.forEach((name) => {
      if (typeof name !== "string" || name.trim() === "") {
        errors.push(`Invalid category name: '${name}'`);
      }
    });
  }

  // Poll validation (optional)
  if (data.poll !== undefined && data.poll !== null) {
    if (typeof data.poll !== "object") {
      errors.push("Poll must be an object with question and options");
    } else {
      const { question, options } = data.poll;
      if (!question || question.trim() === "") {
        errors.push("Poll question is required");
      }
      if (!Array.isArray(options) || options.length === 0) {
        errors.push("Poll must have at least one option");
      } else {
        options.forEach((opt, index) => {
          if (!opt.text || opt.text.trim() === "") {
            errors.push(`Poll option ${index + 1} must have text`);
          }
        });
      }
    }
  }

  // allowComments validation (optional)
  if (
    data.allowComments !== undefined &&
    typeof data.allowComments !== "boolean"
  ) {
    errors.push("allowComments must be true or false");
  }

  // Visibility validation (optional)
  if (
    data.visibility !== undefined &&
    !["public", "private"].includes(data.visibility)
  ) {
    errors.push("Visibility must be either 'public' or 'private'");
  }

  return errors;
};
