import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createPost,
  updatePost,
  deletePost,
  getPosts,
} from "../redux/actions/postActions";
import {
  createReel,
  updateReel,
  deleteReel,
  getReels,
} from "../redux/actions/reelActions";
import {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategories,
} from "../redux/actions/categoryActions";
import { uploadToCloudinary } from "../utils/cloudinary";
import Input from "../components/common/Input";
import Textarea from "../components/common/Textarea";
import Button from "../components/common/Button";
import Modal from "../components/common/Modal";
import { showToast } from "../components/common/Toast";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { posts, creating: creatingPost } = useSelector((state) => state.posts);
  const { reels, creating: creatingReel } = useSelector((state) => state.reels);
  const { categories, creating: creatingCategory } = useSelector(
    (state) => state.categories
  );

  const [activeTab, setActiveTab] = useState("posts");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Form states
  const [postForm, setPostForm] = useState({
    caption: "",
    mediaUrl: "",
    categories: [],
    poll: {
      question: "",
      options: [{ text: "" }, { text: "" }],
    },
    visibility: "public",
    allowComments: true,
    hasPoll: false,
  });

  const [reelForm, setReelForm] = useState({
    caption: "",
    mediaUrl: "",
    isVisible: true,
  });

  const [categoryForm, setCategoryForm] = useState({
    name: "",
    avatarUrl: "",
    description: "",
  });

  useEffect(() => {
    // Load all data
    dispatch(getPosts());
    dispatch(getReels());
    dispatch(getCategories());
  }, [dispatch]);

  const handleFileUpload = async (file, type) => {
    if (!file) return;

    try {
      setUploading(true);
      const uploadedUrl = await uploadToCloudinary(file, type);

      if (activeTab === "posts") {
        setPostForm((prev) => ({ ...prev, mediaUrl: uploadedUrl }));
      } else if (activeTab === "reels") {
        setReelForm((prev) => ({ ...prev, mediaUrl: uploadedUrl }));
      } else if (activeTab === "categories") {
        setCategoryForm((prev) => ({ ...prev, avatarUrl: uploadedUrl }));
      }

      showToast.success("File uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      showToast.error("Failed to upload file");
    } finally {
      setUploading(false);
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();

    if (!postForm.caption.trim()) {
      showToast.error("Caption is required");
      return;
    }

    try {
      const postData = {
        ...postForm,
        poll: postForm.hasPoll ? postForm.poll : null,
      };

      if (editingItem) {
        await dispatch(updatePost(editingItem._id, postData));
      } else {
        await dispatch(createPost(postData));
      }

      resetForm();
      setShowCreateModal(false);
      setEditingItem(null);
    } catch (error) {
      console.error("Create/Update post error:", error);
    }
  };

  const handleCreateReel = async (e) => {
    e.preventDefault();

    if (!reelForm.caption.trim() || !reelForm.mediaUrl) {
      showToast.error("Caption and video are required");
      return;
    }

    try {
      if (editingItem) {
        await dispatch(updateReel(editingItem._id, reelForm));
      } else {
        await dispatch(createReel(reelForm));
      }

      resetForm();
      setShowCreateModal(false);
      setEditingItem(null);
    } catch (error) {
      console.error("Create/Update reel error:", error);
    }
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();

    if (!categoryForm.name.trim()) {
      showToast.error("Category name is required");
      return;
    }

    try {
      if (editingItem) {
        await dispatch(updateCategory(editingItem._id, categoryForm));
      } else {
        await dispatch(createCategory(categoryForm));
      }

      resetForm();
      setShowCreateModal(false);
      setEditingItem(null);
    } catch (error) {
      console.error("Create/Update category error:", error);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);

    if (activeTab === "posts") {
      setPostForm({
        caption: item.caption || "",
        mediaUrl: item.mediaUrl || "",
        categories: item.categories || [],
        poll: item.poll || {
          question: "",
          options: [{ text: "" }, { text: "" }],
        },
        visibility: item.visibility || "public",
        allowComments:
          item.allowComments !== undefined ? item.allowComments : true,
        hasPoll: !!item.poll,
      });
    } else if (activeTab === "reels") {
      setReelForm({
        caption: item.caption || "",
        mediaUrl: item.mediaUrl || "",
        isVisible: item.isVisible !== undefined ? item.isVisible : true,
      });
    } else if (activeTab === "categories") {
      setCategoryForm({
        name: item.name || "",
        avatarUrl: item.avatarUrl || "",
        description: item.description || "",
      });
    }

    setShowCreateModal(true);
  };

  const handleDelete = async (item) => {
    if (
      !confirm(
        `Are you sure you want to delete this ${activeTab.slice(0, -1)}?`
      )
    ) {
      return;
    }

    try {
      if (activeTab === "posts") {
        await dispatch(deletePost(item._id));
      } else if (activeTab === "reels") {
        await dispatch(deleteReel(item._id));
      } else if (activeTab === "categories") {
        await dispatch(deleteCategory(item._id));
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const resetForm = () => {
    setPostForm({
      caption: "",
      mediaUrl: "",
      categories: [],
      poll: {
        question: "",
        options: [{ text: "" }, { text: "" }],
      },
      visibility: "public",
      allowComments: true,
      hasPoll: false,
    });
    setReelForm({
      caption: "",
      mediaUrl: "",
      isVisible: true,
    });
    setCategoryForm({
      name: "",
      avatarUrl: "",
      description: "",
    });
  };

  const addPollOption = () => {
    setPostForm((prev) => ({
      ...prev,
      poll: {
        ...prev.poll,
        options: [...prev.poll.options, { text: "" }],
      },
    }));
  };

  const removePollOption = (index) => {
    if (postForm.poll.options.length <= 2) return;

    setPostForm((prev) => ({
      ...prev,
      poll: {
        ...prev.poll,
        options: prev.poll.options.filter((_, i) => i !== index),
      },
    }));
  };

  const updatePollOption = (index, text) => {
    setPostForm((prev) => ({
      ...prev,
      poll: {
        ...prev.poll,
        options: prev.poll.options.map((option, i) =>
          i === index ? { text } : option
        ),
      },
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">Manage posts, reels, and categories</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="flex border-b">
            {["posts", "reels", "categories"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-4 px-6 text-center font-medium capitalize transition-colors ${
                  activeTab === tab
                    ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Create Button */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold capitalize">
                Manage {activeTab}
              </h2>
              <Button
                onClick={() => {
                  resetForm();
                  setEditingItem(null);
                  setShowCreateModal(true);
                }}
              >
                Create {activeTab.slice(0, -1)}
              </Button>
            </div>

            {/* Content List */}
            <div className="space-y-4">
              {activeTab === "posts" &&
                posts.map((post) => (
                  <div key={post._id} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 mb-1">
                          {post.caption}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          Categories:{" "}
                          {post.categories
                            ?.map((cat) =>
                              typeof cat === "string" ? cat : cat.name
                            )
                            .join(", ") || "None"}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(post.createdAt).toLocaleDateString()} •{" "}
                          {post.visibility}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleEdit(post)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(post)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}

              {activeTab === "reels" &&
                reels.map((reel) => (
                  <div key={reel._id} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 mb-1">
                          {reel.caption}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {new Date(reel.createdAt).toLocaleDateString()} •{" "}
                          {reel.isVisible ? "Visible" : "Hidden"}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleEdit(reel)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(reel)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}

              {activeTab === "categories" &&
                categories.map((category) => (
                  <div key={category._id} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 mb-1">
                          {category.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {category.description}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleEdit(category)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(category)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Create/Edit Modal */}
        <Modal
          isOpen={showCreateModal}
          onClose={() => {
            setShowCreateModal(false);
            setEditingItem(null);
            resetForm();
          }}
          title={`${editingItem ? "Edit" : "Create"} ${activeTab.slice(0, -1)}`}
          size="lg"
        >
          {activeTab === "posts" && (
            <form onSubmit={handleCreatePost} className="space-y-4">
              <Textarea
                label="Caption"
                value={postForm.caption}
                onChange={(e) =>
                  setPostForm((prev) => ({ ...prev, caption: e.target.value }))
                }
                required
                maxLength={500}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Media Upload
                </label>
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={(e) => handleFileUpload(e.target.files[0], "auto")}
                  className="w-full"
                />
                {postForm.mediaUrl && (
                  <p className="text-sm text-green-600 mt-1">
                    Media uploaded successfully!
                  </p>
                )}
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="hasPoll"
                  checked={postForm.hasPoll}
                  onChange={(e) =>
                    setPostForm((prev) => ({
                      ...prev,
                      hasPoll: e.target.checked,
                    }))
                  }
                  className="mr-2"
                />
                <label
                  htmlFor="hasPoll"
                  className="text-sm font-medium text-gray-700"
                >
                  Include Poll
                </label>
              </div>

              {postForm.hasPoll && (
                <div className="border p-4 rounded-lg">
                  <Input
                    label="Poll Question"
                    value={postForm.poll.question}
                    onChange={(e) =>
                      setPostForm((prev) => ({
                        ...prev,
                        poll: { ...prev.poll, question: e.target.value },
                      }))
                    }
                  />

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Options
                    </label>
                    {postForm.poll.options.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={option.text}
                          onChange={(e) =>
                            updatePollOption(index, e.target.value)
                          }
                          placeholder={`Option ${index + 1}`}
                          className="flex-1 px-3 py-2 border rounded-lg"
                        />
                        {postForm.poll.options.length > 2 && (
                          <Button
                            type="button"
                            variant="danger"
                            size="sm"
                            onClick={() => removePollOption(index)}
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={addPollOption}
                    >
                      Add Option
                    </Button>
                  </div>
                </div>
              )}

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="allowComments"
                  checked={postForm.allowComments}
                  onChange={(e) =>
                    setPostForm((prev) => ({
                      ...prev,
                      allowComments: e.target.checked,
                    }))
                  }
                  className="mr-2"
                />
                <label
                  htmlFor="allowComments"
                  className="text-sm font-medium text-gray-700"
                >
                  Allow Comments
                </label>
              </div>

              <div className="flex justify-end space-x-3">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" loading={creatingPost || uploading}>
                  {editingItem ? "Update" : "Create"} Post
                </Button>
              </div>
            </form>
          )}

          {activeTab === "reels" && (
            <form onSubmit={handleCreateReel} className="space-y-4">
              <Textarea
                label="Caption"
                value={reelForm.caption}
                onChange={(e) =>
                  setReelForm((prev) => ({ ...prev, caption: e.target.value }))
                }
                required
                maxLength={200}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Video Upload
                </label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => handleFileUpload(e.target.files[0], "video")}
                  className="w-full"
                />
                {reelForm.mediaUrl && (
                  <p className="text-sm text-green-600 mt-1">
                    Video uploaded successfully!
                  </p>
                )}
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isVisible"
                  checked={reelForm.isVisible}
                  onChange={(e) =>
                    setReelForm((prev) => ({
                      ...prev,
                      isVisible: e.target.checked,
                    }))
                  }
                  className="mr-2"
                />
                <label
                  htmlFor="isVisible"
                  className="text-sm font-medium text-gray-700"
                >
                  Make Visible to Users
                </label>
              </div>

              <div className="flex justify-end space-x-3">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" loading={creatingReel || uploading}>
                  {editingItem ? "Update" : "Create"} Reel
                </Button>
              </div>
            </form>
          )}

          {activeTab === "categories" && (
            <form onSubmit={handleCreateCategory} className="space-y-4">
              <Input
                label="Category Name"
                value={categoryForm.name}
                onChange={(e) =>
                  setCategoryForm((prev) => ({ ...prev, name: e.target.value }))
                }
                required
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e.target.files[0], "image")}
                  className="w-full"
                />
                {categoryForm.avatarUrl && (
                  <p className="text-sm text-green-600 mt-1">
                    Image uploaded successfully!
                  </p>
                )}
              </div>

              <Textarea
                label="Description"
                value={categoryForm.description}
                onChange={(e) =>
                  setCategoryForm((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                maxLength={200}
              />

              <div className="flex justify-end space-x-3">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" loading={creatingCategory || uploading}>
                  {editingItem ? "Update" : "Create"} Category
                </Button>
              </div>
            </form>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default AdminDashboard;
