import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Browse from "./pages/browse/Browse";
import Search from "./pages/search/Search";
import RootLayout from "./pages/root";
import Auth, { action as AuthAction } from "./pages/Authenticate";
import ErrorPage from "./pages/error";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Browse /> },
        { path: "/search", element: <Search /> },
        { path: "/auth", element: <Auth />, action: AuthAction },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
