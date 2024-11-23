import { createBrowserRouter, Navigate } from "react-router-dom";

import AuthLayout from "../pages/AuthPages/AuthLayout";
import LoginPage from "../pages/AuthPages/LoginPage";
import SignupPage from "../pages/AuthPages/SignupPage";
import ActivationPage from "../pages/AuthPages/ActivationPage";
import MainLayout, { mainLoader } from "../pages/MainLayout";
import HomeLayout from "../pages/HomeLayout";
import ExplorePage from "../pages/HomePages/ExplorePage";
import { destroyAuthInfo } from "../util/http";

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
        children: [
          { index: true, element: <ExplorePage /> },
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
