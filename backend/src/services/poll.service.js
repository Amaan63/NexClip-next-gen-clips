import Poll from "../models/poll.js";

export const createPoll = async (pollData) => {
  if (!pollData) return "Poll is not active for this post";

  const { question, options } = pollData;
  if (!question || !Array.isArray(options) || options.length === 0) {
    throw new Error("Poll must have a question and at least one option");
  }

  const poll = new Poll({
    question: question.trim(),
    options: options.map((opt) => ({ text: opt.text.trim() })),
    isActive: false,
  });

  await poll.save();
  return poll._id;
};
