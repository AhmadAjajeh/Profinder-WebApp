import { createBrowserRouter, Navigate } from 'react-router-dom';

import AuthLayout from '../pages/AuthPages/AuthLayout';
import LoginPage from '../pages/AuthPages/LoginPage';
import SignupPage from '../pages/AuthPages/SignupPage';
import ActivationPage from '../pages/AuthPages/ActivationPage';
import MainLayout, { mainLoader } from '../pages/MainLayout';
import ExplorePage from '../pages/HomePages/ExplorePage';
import { destroyAuthInfo } from '../util/http';
import JobPage from '../pages/HomePages/JobPage';
import ProjectPage from '../pages/HomePages/ProjectPage';
import HashtagPage from '../pages/HomePages/HashtagPage';
import ProfilePage from '../pages/ProfilePage';
import JobDetails from '../components/job/JobDetails';
import ProjectDetails from '../components/project/ProjectDetails';
import NewProject from '../components/project/NewProject';
import MainErrorPage from '../pages/MainErrorPage';

export default createBrowserRouter([
  {
    element: <AuthLayout />,
    path: '/auth',
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'signup',
        element: <SignupPage />,
      },
      { path: 'check-code', element: <ActivationPage /> },
    ],
  },
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <MainErrorPage />,
    loader: mainLoader,
    children: [
      { path: '/', element: <Navigate to="/home" replace /> },
      {
        path: 'home',
        children: [
          { index: true, element: <ExplorePage /> },
          {
            path: 'jobs',
            element: <JobPage />,
            children: [{ path: ':jobId', element: <JobDetails /> }],
          },
          {
            path: 'projects',
            element: <ProjectPage />,
            children: [
              { path: ':projectId', element: <ProjectDetails /> },
              { path: 'new-project', element: <NewProject /> },
            ],
          },
          {
            path: 'hashtags',
            element: <HashtagPage />,
          },
        ],
      },
      { path: 'profile/:id', element: <ProfilePage /> },
    ],
  },
]);
