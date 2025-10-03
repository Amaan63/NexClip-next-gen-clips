import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { useToastContext } from "../../components/Toast/ToastProvider";
import CreateCategoryModal from "../../components/admin/modals/CreateCategoryModal";
import CategoryCard from "../../components/admin/categories/CategoryCard";
import CategoryStats from "../../components/admin/categories/CategoryStats";
import CategoryFilters from "../../components/admin/categories/CategoryFilters";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCategoriesThunk } from "../../redux/features/category/category.thunk";

const ManageCategories = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToastContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("all");

  // TODO: Replace with API data
  const { categories } = useSelector((state) => state.category);

  const handleDeleteCategory = (id) => {
    setCategories(categories.filter((c) => c._id !== id));
    toast.success("Category deleted");
  };

  const handleToggleStatus = (id) => {
    setCategories(
      categories.map((c) =>
        c._id === id ? { ...c, isActive: !c.isActive } : c
      )
    );
  };

  const handleEditCategory = (cat) => {
    setEditingCategory(cat);
    setShowCreateModal(true);
  };

  const filteredCategories = categories.filter((c) => {
    const name = c?.name || "";
    const description = c?.description || "";

    const matchesSearch =
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      selectedStatus === "all" ||
      (selectedStatus === "active" && c.isActive) ||
      (selectedStatus === "inactive" && !c.isActive);

    return matchesSearch && matchesStatus;
  });

  const totalPosts = 0; // backend later
  const totalReels = 0; // backend later
  // const activeCategories = categories.filter((c) => c.isActive).length;
  const activeCategories = categories.length;

  useEffect(() => {
    dispatch(fetchAllCategoriesThunk());
  }, [dispatch]);

  return (
    <Layout>
      <div className="space-y-6">
        {/* ✅ ADDED: Breadcrumb Navigation */}

        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <button
            onClick={() => navigate("/admin")}
            className="hover:text-purple-400"
          >
            Admin Dashboard
          </button>
          <span>›</span>
          <span className="text-white">Manage Categories</span>
        </div>
        {/* Header */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                Manage Categories
              </h1>
              <p className="text-gray-300">
                Organize your content with custom categories
              </p>
            </div>
            <div className="mt-4 lg:mt-0 flex items-center space-x-3">
              <span className="px-3 py-1 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-400/30 rounded-xl text-purple-300 text-sm">
                {categories.length} Categories
              </span>
              <button
                onClick={() => {
                  setEditingCategory(null);
                  setShowCreateModal(true);
                }}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:from-purple-500 hover:to-pink-500 transition-all"
              >
                + New Category
              </button>
            </div>
          </div>
        </div>

        {/* ✅ ADDED: Quick Navigation */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => navigate("/admin")}
              className="px-3 py-2 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-colors text-sm"
            >
              🏠 Dashboard
            </button>
            <button
              onClick={() => navigate("/admin/posts")}
              className="px-3 py-2 bg-yellow-600/20 text-yellow-400 rounded-lg hover:bg-yellow-600/30 transition-colors text-sm"
            >
              📝 Manage Posts
            </button>
            <button
              onClick={() => navigate("/admin/reels")}
              className="px-3 py-2 bg-pink-600/20 text-pink-400 rounded-lg hover:bg-pink-600/30 transition-colors text-sm"
            >
              🎬 Manage Reels
            </button>
          </div>
        </div>

        <CategoryStats
          totalPosts={totalPosts}
          totalReels={totalReels}
          activeCategories={activeCategories}
        />

        <CategoryFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
        />

        {filteredCategories.length === 0 ? (
          <div className="bg-black/40 border border-white/10 rounded-2xl p-12 text-center">
            <div className="text-6xl mb-4">📁</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              No categories found
            </h3>
            <p className="text-gray-400">
              Try searching or create a new category
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((cat) => (
              <CategoryCard
                key={cat._id}
                category={cat}
                onEdit={handleEditCategory}
                onDelete={handleDeleteCategory}
                onToggle={handleToggleStatus}
              />
            ))}
          </div>
        )}

        {showCreateModal && (
          <CreateCategoryModal
            onClose={() => {
              setShowCreateModal(false);
              setEditingCategory(null);
            }}
            editCategory={editingCategory}
          />
        )}
      </div>
    </Layout>
  );
};

export default ManageCategories;
