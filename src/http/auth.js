import axiosInstance from './axios';

export function loginMutation(formData) {
  return axiosInstance.post('users/login', formData);
}

export function googleLoginMutation(formData) {
  return axiosInstance.post('users/sign-in-google', formData);
}

export function signup(formData) {
  return axiosInstance.post('users/signup', formData);
}

export function activate(formData) {
  return axiosInstance.put('users/approve', formData);
}
