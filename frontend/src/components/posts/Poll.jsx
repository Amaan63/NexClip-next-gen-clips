import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { votePoll } from "../../redux/actions/postActions";
import Button from "../common/Button";

const Poll = ({ post }) => {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = async (optionIndex) => {
    if (hasVoted) return;

    try {
      setSelectedOption(optionIndex);
      setHasVoted(true);
      await dispatch(votePoll(post._id, optionIndex));
    } catch (error) {
      console.error("Error voting:", error);
      setHasVoted(false);
      setSelectedOption(null);
    }
  };

  const getTotalVotes = () => {
    if (!post.poll?.options) return 0;
    return post.poll.options.reduce(
      (total, option) => total + (option.votes || 0),
      0
    );
  };

  const getVotePercentage = (votes) => {
    const total = getTotalVotes();
    if (total === 0) return 0;
    return Math.round((votes / total) * 100);
  };

  if (!post.poll) return null;

  const totalVotes = getTotalVotes();

  return (
    <div className="bg-gray-50 rounded-lg p-4 mb-4">
      <h4 className="font-medium text-gray-900 mb-3">
        📊 {post.poll.question}
      </h4>

      <div className="space-y-2">
        {post.poll.options?.map((option, index) => {
          const votes = option.votes || 0;
          const percentage = getVotePercentage(votes);
          const isSelected = selectedOption === index;

          return (
            <div key={index} className="relative">
              <Button
                onClick={() => handleVote(index)}
                disabled={hasVoted}
                variant={isSelected ? "primary" : "outline"}
                fullWidth
                className={`
                  justify-between text-left relative overflow-hidden
                  ${hasVoted ? "cursor-default" : ""}
                `}
              >
                {/* Progress bar background */}
                {hasVoted && (
                  <div
                    className="absolute left-0 top-0 h-full bg-blue-100 transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                )}

                {/* Option content */}
                <div className="relative flex justify-between items-center w-full">
                  <span>{option.text}</span>
                  {hasVoted && (
                    <span className="text-sm font-medium">
                      {percentage}% ({votes})
                    </span>
                  )}
                </div>
              </Button>
            </div>
          );
        })}
      </div>

      {hasVoted && (
        <p className="text-sm text-gray-600 mt-3 text-center">
          Total votes: {totalVotes}
        </p>
      )}
    </div>
  );
};

export default Poll;
