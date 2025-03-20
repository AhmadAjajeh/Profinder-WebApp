import axiosInstance from './axios';

export function myProfileQuery() {
  return axiosInstance.get('users/profiles/my-profile');
}

export function profileQuery({ id }) {
  return axiosInstance.get(
    `public/profiles/${id}?populate=social_media_links._id`
  );
}

export function visitUserQuery({ id }) {
  return axiosInstance.get(`users/${id}/visit`);
}

export function updateProfileInfoMutation(data) {
  return axiosInstance.put('users/profiles/', data);
}
