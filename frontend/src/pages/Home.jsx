import React from "react";
import Layout from "../components/Layout/Layout";

const Home = () => {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Welcome to Your Sanctuary
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            Your exclusive content awaits. Explore intimate moments, personal
            reels, and connect in ways you never imagined.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center">
            <div className="text-4xl mb-4">💋</div>
            <h3 className="text-white font-semibold mb-2">Exclusive Content</h3>
            <p className="text-gray-400 text-sm">
              Premium intimate moments just for you
            </p>
          </div>

          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center">
            <div className="text-4xl mb-4">🔥</div>
            <h3 className="text-white font-semibold mb-2">Personal Reels</h3>
            <p className="text-gray-400 text-sm">Behind-the-scenes moments</p>
          </div>

          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center">
            <div className="text-4xl mb-4">❤️</div>
            <h3 className="text-white font-semibold mb-2">Private Messages</h3>
            <p className="text-gray-400 text-sm">Direct connection with me</p>
          </div>

          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center">
            <div className="text-4xl mb-4">✨</div>
            <h3 className="text-white font-semibold mb-2">VIP Access</h3>
            <p className="text-gray-400 text-sm">Exclusive privileges await</p>
          </div>
        </div>

        {/* Recent Content Preview */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
          <h3 className="text-2xl font-bold text-white mb-6">Latest Updates</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-white/5 rounded-2xl p-4 border border-white/10"
              >
                <div className="aspect-video bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-xl mb-4 flex items-center justify-center">
                  <span className="text-white/60">Content {item}</span>
                </div>
                <h4 className="text-white font-medium mb-2">
                  Exclusive Preview {item}
                </h4>
                <p className="text-gray-400 text-sm">
                  A glimpse into my world...
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
