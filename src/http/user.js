import axiosInstance from './axios';

export function updateUserMutation(formData) {
  return axiosInstance.put('users/update', formData);
}
