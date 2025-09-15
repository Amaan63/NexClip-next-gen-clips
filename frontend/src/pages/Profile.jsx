import React from "react";
import Layout from "../components/Layout/Layout";

const Profile = () => {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Profile Header */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            {/* Profile Picture */}
            <div className="w-32 h-32 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-full flex items-center justify-center border-4 border-purple-400/30">
              <span className="text-4xl">👤</span>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                Your Profile
              </h2>
              <p className="text-gray-300 mb-4">
                Welcome to your private sanctuary
              </p>

              {/* Stats */}
              <div className="flex justify-center md:justify-start space-x-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">24</div>
                  <div className="text-gray-400 text-sm">Exclusive</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">12</div>
                  <div className="text-gray-400 text-sm">Reels</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">VIP</div>
                  <div className="text-gray-400 text-sm">Status</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Settings Section */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
          <h3 className="text-2xl font-bold text-white mb-6">
            Settings & Preferences
          </h3>

          <div className="space-y-4">
            {[
              {
                icon: "🔔",
                title: "Notifications",
                desc: "Manage your notification preferences",
              },
              {
                icon: "🔒",
                title: "Privacy",
                desc: "Control your privacy settings",
              },
              {
                icon: "💳",
                title: "Billing",
                desc: "Manage your subscription",
              },
              { icon: "❤️", title: "Favorites", desc: "Your saved content" },
            ].map((setting, index) => (
              <button
                key={index}
                className="w-full flex items-center space-x-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all"
              >
                <span className="text-2xl">{setting.icon}</span>
                <div className="flex-1 text-left">
                  <h4 className="text-white font-medium">{setting.title}</h4>
                  <p className="text-gray-400 text-sm">{setting.desc}</p>
                </div>
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
