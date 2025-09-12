import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import { ToastProvider } from "./components/Toast/ToastProvider";

const App = () => {
  return (
    <ToastProvider>
      <RouterProvider router={router} />
    </ToastProvider>
  );
};

export default App;
