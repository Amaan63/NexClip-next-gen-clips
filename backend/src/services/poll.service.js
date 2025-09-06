import Poll from "../models/poll.js";

export const createPoll = async (pollData) => {
  if (!pollData) return null;

  const { question, options } = pollData;
  if (!question || !Array.isArray(options) || options.length === 0) {
    throw new Error("Poll must have a question and at least one option");
  }

  const poll = new Poll({
    question: question.trim(),
    options: options.map((opt) => ({ text: opt.text.trim() })),
    isActive: true,
  });

  await poll.save();
  return poll._id;
};

// ✅ Update existing poll
export const updatePoll = async (pollId, pollData) => {
  if (!pollData) return null;

  const { question, options, isActive } = pollData;
  const poll = await Poll.findById(pollId);

  if (!poll) {
    throw new Error("Poll not found");
  }

  // Update fields if provided
  if (question) poll.question = question.trim();
  if (options && Array.isArray(options) && options.length > 0) {
    poll.options = options.map((opt) => ({ text: opt.text.trim() }));
  }
  if (typeof isActive === "boolean") {
    poll.isActive = isActive;
  }

  await poll.save();
  return poll._id;
};
