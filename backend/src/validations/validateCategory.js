// validations/validateCategory.js
export const validateCategory = (data) => {
  const errors = [];

  // Name validation
  if (!data.name || data.name.trim() === "") {
    errors.push("Category name is required");
  } else if (data.name.length < 3) {
    errors.push("Category name must be at least 3 characters long");
  }

  // Avatar URL validation
  if (
    data.avatarUrl !== undefined &&
    (typeof data.avatarUrl !== "string" || data.avatarUrl.trim() === "")
  ) {
    errors.push("Avatar URL must be a non-empty string if provided");
  }

  return errors;
};
