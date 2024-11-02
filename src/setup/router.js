import { createBrowserRouter, Navigate } from "react-router-dom";

import AuthLayout from "../pages/AuthLayout";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import ActivationPage from "../pages/ActivationPage";
import MainLayout, { mainLoader } from "../pages/MainLayout";
import HomeLayout from "../pages/HomeLayout";

export default createBrowserRouter([
  {
    element: <AuthLayout />,
    path: "/auth",
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <SignupPage />,
      },
      { path: "check-code", element: <ActivationPage /> },
    ],
  },
  {
    path: "/",
    element: <MainLayout />,
    loader: mainLoader,
    children: [
      { path: "/", element: <Navigate to="/home" replace /> },
      {
        path: "home",
        element: <HomeLayout />,
        loader: async () => {
          return null;
        },
        children: [
          { index: true, element: <div>index</div> },
          {
            path: "jobs",
            element: <div>jobs</div>,
            children: [{ index: true, element: <div>ahmad</div> }],
          },
          {
            path: "projects",
            element: <div>projects</div>,
            children: [{ index: true, element: <div>ahmad</div> }],
          },
          {
            path: "hashtags",
            element: <div>hashtags</div>,
            children: [{ index: true, element: <div>ahmad</div> }],
          },
        ],
      },
    ],
  },
]);
