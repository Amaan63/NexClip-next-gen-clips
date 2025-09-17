import React, { createContext, useContext, useState, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import BottomNavigation from "./BottomNavigation";

// Create context for sidebar state
const SidebarContext = createContext();

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

const Layout = ({ children }) => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile/tablet
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Calculate main content margin based on sidebar state
  const getMainContentClass = () => {
    if (isMobile) {
      return "pb-20"; // Space for bottom navigation
    }

    // Desktop: adjust margin based on sidebar state
    const baseMargin = sidebarExpanded ? "ml-64" : "ml-20";
    return `${baseMargin} pb-4 transition-all duration-500`;
  };

  const sidebarContextValue = {
    sidebarExpanded,
    setSidebarExpanded,
    isMobile,
  };

  return (
    <SidebarContext.Provider value={sidebarContextValue}>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black ">
        {/* Header - Fixed at top */}
        <Header />

        {/* Sidebar - Desktop only */}
        <Sidebar />

        {/* Main Content Area */}
        <main className={`pt-20 px-4 lg:px-8 ${getMainContentClass()}`}>
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>

        {/* Bottom Navigation - Mobile only */}
        <BottomNavigation />
      </div>
    </SidebarContext.Provider>
  );
};

export default Layout;
