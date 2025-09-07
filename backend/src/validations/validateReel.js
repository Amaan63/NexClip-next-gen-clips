export const validateReel = (data) => {
  const errors = [];

  // Caption validation
  if (
    !data.caption ||
    typeof data.caption !== "string" ||
    data.caption.trim() === ""
  ) {
    errors.push("Caption is required and must be a non-empty string");
  } else if (data.caption.length > 300) {
    errors.push("Caption must not exceed 300 characters");
  }

  // Media URL validation
  if (
    !data.mediaUrl ||
    typeof data.mediaUrl !== "string" ||
    data.mediaUrl.trim() === ""
  ) {
    errors.push("Media URL is required and must be a non-empty string");
  }

  // isVisible validation (optional)
  if (data.isVisible !== undefined) {
    if (typeof data.isVisible !== "boolean") {
      errors.push("isVisible must be true or false (boolean)");
    }
  }

  return errors;
};
