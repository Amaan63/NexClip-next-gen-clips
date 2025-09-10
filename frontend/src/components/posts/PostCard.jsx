import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addComment, getComments } from "../../redux/actions/postActions";
import CommentBox from "./CommentBox";
import Poll from "./Poll";
import Modal from "../common/Modal";
import Button from "../common/Button";
import { showToast } from "../common/Toast";

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddComment = async () => {
    if (!commentText.trim()) {
      showToast.error("Please enter a comment");
      return;
    }

    try {
      setLoading(true);
      await dispatch(addComment(post._id, commentText));
      setCommentText("");
      // Refresh comments
      dispatch(getComments(post._id));
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleShowComments = () => {
    setShowComments(true);
    dispatch(getComments(post._id));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow mb-4 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center">
          <div className="h-10 w-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-medium">
            {post.createdBy?.username?.charAt(0).toUpperCase() || "A"}
          </div>
          <div className="ml-3">
            <p className="font-semibold text-gray-900">
              {post.createdBy?.username || "Admin"}
            </p>
            <p className="text-sm text-gray-500">
              {formatDate(post.createdAt)}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-gray-800 mb-4">{post.caption}</p>

        {/* Categories */}
        {post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.categories.map((category, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
              >
                {typeof category === "string" ? category : category.name}
              </span>
            ))}
          </div>
        )}

        {/* Media */}
        {post.mediaUrl && (
          <div className="mb-4">
            <img
              src={post.mediaUrl}
              alt="Post media"
              className="w-full h-64 object-cover rounded-lg"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          </div>
        )}

        {/* Poll */}
        {post.poll && <Poll post={post} />}
      </div>

      {/* Actions */}
      {post.allowComments && (
        <div className="px-4 pb-4 border-t bg-gray-50">
          <div className="flex items-center space-x-4 py-3">
            <Button variant="secondary" size="sm" onClick={handleShowComments}>
              💬 Comments
            </Button>
          </div>

          {/* Add Comment */}
          <div className="flex space-x-2">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleAddComment();
                }
              }}
            />
            <Button
              onClick={handleAddComment}
              loading={loading}
              disabled={!commentText.trim()}
              size="sm"
            >
              Post
            </Button>
          </div>
        </div>
      )}

      {/* Comments Modal */}
      <Modal
        isOpen={showComments}
        onClose={() => setShowComments(false)}
        title="Comments"
        size="md"
      >
        <CommentBox postId={post._id} />
      </Modal>
    </div>
  );
};

export default PostCard;
