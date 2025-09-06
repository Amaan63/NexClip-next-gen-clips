// validations/validateComment.js

export const validateComment = (data) => {
  const errors = [];

  // Text validation
  if (!data.text || data.text.trim() === "") {
    errors.push("Comment text is required");
  }

  return errors;
};
