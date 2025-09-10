import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComments } from "../../redux/actions/postActions";
import { Spinner } from "../common/Loader";

const CommentBox = ({ postId }) => {
  const dispatch = useDispatch();
  const { comments, loading } = useSelector((state) => state.posts);

  const postComments = comments[postId] || [];

  useEffect(() => {
    if (postId) {
      dispatch(getComments(postId));
    }
  }, [dispatch, postId]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center py-4">
        <Spinner size="md" />
      </div>
    );
  }

  if (postComments.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <div className="mb-2">💬</div>
        <p>No comments yet.</p>
        <p className="text-sm">Be the first to comment!</p>
      </div>
    );
  }

  return (
    <div className="max-h-96 overflow-y-auto">
      <div className="space-y-4">
        {postComments.map((comment, index) => (
          <div key={comment._id || index} className="flex space-x-3">
            {/* Avatar */}
            <div className="h-8 w-8 bg-gray-400 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
              {comment.user?.username?.charAt(0).toUpperCase() ||
                comment.username?.charAt(0).toUpperCase() ||
                "U"}
            </div>

            {/* Comment Content */}
            <div className="flex-1 min-w-0">
              <div className="bg-gray-100 rounded-lg px-3 py-2">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-gray-900">
                    {comment.user?.username || comment.username || "User"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatDate(comment.createdAt)}
                  </p>
                </div>
                <p className="text-sm text-gray-800">{comment.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentBox;
