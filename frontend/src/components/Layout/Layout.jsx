import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import BottomNavigation from "./BottomNavigation";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black">
      {/* Background ambient elements */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-3/4 w-64 h-64 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Header */}
      <Header />

      {/* Sidebar for desktop */}
      <Sidebar />

      {/* Main content */}
      <main className="pt-20 lg:pl-64 pb-20 lg:pb-6 relative z-10">
        <div className="container mx-auto px-4 py-6">{children}</div>
      </main>

      {/* Bottom Navigation for mobile */}
      <BottomNavigation />
    </div>
  );
};

export default Layout;
