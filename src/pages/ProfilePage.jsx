import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { visitUserQuery } from '../http/profile';
import { getBaseUrl } from '../util/http';
import UserInfo from '../components/profile/user-info/UserInfo';
import useErrorHandler from '../hooks/useErrorHandler';
import Certifications from '../components/profile/certifications/Certifications';
import Projects from '../components/profile/projects/Projects';

export default function ProfilePage() {
  const handleError = useErrorHandler();

  const { id } = useParams();
  const [profile, setProfile] = useState({});
  const [user, setUser] = useState({});

  const currentUser = useSelector((state) => state.auth.user);
  const myProfile = user._id === currentUser._id;

  const backgroundImage = user?.background_image
    ? getBaseUrl() + user?.background_image
    : null;

  const { isFetching } = useQuery({
    queryKey: ['visit-user', id],
    queryFn: () => visitUserQuery({ id }),
    onSuccess: ({ data }) => {
      setUser(data.user);
      setProfile(data.user.profile_id);
    },
    onError: handleError,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="w-full overflow-hidden flex flex-col space-y-5">
      <UserInfo
        myProfile={myProfile}
        username={user.username}
        email={user.email}
        bio={profile.bio}
        backgroundImage={backgroundImage}
        profileImage={user.profile_image}
        fullname={profile.full_name}
      />
      <Certifications
        certifications={profile.certifications || []}
        myProfile={myProfile}
        isFetching={isFetching}
      />
      <Projects
        projects={profile.projects || []}
        myProfile={myProfile}
        isFetching={isFetching}
      />
      <div>test</div>
    </div>
  );
}
