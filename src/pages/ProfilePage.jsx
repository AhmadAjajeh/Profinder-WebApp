import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { profileQuery, visitUserQuery } from '../http/profile';
import { errorHandlingFunction, getBaseUrl } from '../util/http';
import { errorHandlingActions } from '../store/errorHandlingSlice';
import UserInfo from '../components/profile/user-info/UserInfo';

export default function ProfilePage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  const [profile, setProfile] = useState({});
  const [user, setUser] = useState({});

  const currentUser = useSelector((state) => state.auth.user);
  const myProfile = user._id === currentUser._id;

  const backgroundImage = user?.background_image
    ? getBaseUrl() + user?.background_image
    : null;
  console.log('here', backgroundImage);

  useQuery({
    queryKey: ['visit-user', id],
    queryFn: () => visitUserQuery({ id }),
    onSuccess: (data) => {
      setUser(data.user);
    },
    onError: errorHandlingFunction(dispatch, errorHandlingActions, navigate),
  });

  useQuery({
    queryKey: ['profile', id],
    queryFn: () => profileQuery({ id }),
    onSuccess: (data) => {
      setProfile(data.profile);
    },
    onError: errorHandlingFunction(dispatch, errorHandlingActions, navigate),
  });

  const username = 'John Doe';
  const email = 'johndoe@example.com';
  const bio =
    'Full-stack developer passionate about creating beautiful and functional web applications. Experienced in React, Node.js, and cloud technologies.';
  const address = 'San Francisco, CA';
  const linkedin = 'https://linkedin.com/in/johndoe';
  const github = 'https://github.com/johndoe';
  const profileImage =
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';
  // const backgroundImage =
  // 'https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&h=400&q=80';

  return (
    <div className="w-full">
      <UserInfo
        myProfile={myProfile}
        username={user.username}
        email={user.email}
        bio={profile.bio}
        address={address}
        backgroundImage={backgroundImage}
        profileImage={profileImage}
        github={github}
        linkedin={linkedin}
        fullname={profile.full_name}
      />
    </div>
  );
}
