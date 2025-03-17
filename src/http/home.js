import { buildSearchParams } from '../util/http';
import axiosInstance from './axios';

export function createPostMutation(formData) {
  return axiosInstance.post('users/posts?publisher=true', formData);
}

export function updatePostMutation({ formData, id }) {
  return axiosInstance.put(`users/posts/${id}?publisher=true`, formData);
}

export function getPostQuery(page) {
  return axiosInstance.get(`public/posts?publisher=true&page=${page}`);
}

export function likePostMutaiton({ like, postId }) {
  const url = `users/likes${like ? '' : `/${postId}`}`;
  return axiosInstance({
    method: like ? 'POST' : 'DELETE',
    url,
    data: { post_id: postId },
  });
}

export function savePostMutation({ save, postId }) {
  const url = `users/saved-post${save ? '' : `/${postId}`}`;
  return axiosInstance({
    method: save ? 'POST' : 'DELETE',
    url,
    data: { post_id: postId },
  });
}

export function postWithCommentsQuery({ postId, page }) {
  return axiosInstance.get(`public/posts/${postId}/comments?page=${page}`);
}

export function createCommentMutation(formData) {
  return axiosInstance.post('users/comments', formData);
}

export function deletePostMutation(postId) {
  return axiosInstance.delete(`users/posts/${postId}`);
}

export function getJobsQuery({ title, location, page }) {
  const params = buildSearchParams({ title, location, page });
  return axiosInstance.get(`explore/jobs/search?${params}`);
}

export function getOneJobQuery(jobId) {
  return axiosInstance.get(`explore/jobs/${jobId}`);
}

export function jobApplyMutation({ jobId, apply }) {
  const url = `explore/jobs/${jobId}${apply ? '/apply' : '/cancel-apply'}`;
  return axiosInstance({
    method: apply ? 'POST' : 'DELETE',
    url,
  });
}

export function getProjectsQuery({ title, min, max, page }) {
  const params = buildSearchParams({
    title,
    'budget.min': min,
    'budget.max': max,
    page,
  });
  return axiosInstance.get(`explore/freelance-projects/search?${params}`);
}

export function getOneProjectQuery({ id }) {
  return axiosInstance.get(`explore/freelance-projects/${id}`);
}

export function projectApplyMutation({ id, apply }) {
  const url = `explore/freelance-projects/${id}${
    apply ? '/apply' : '/cancel-apply'
  }`;
  return axiosInstance({
    method: apply ? 'POST' : 'DELETE',
    url,
  });
}

export function createProjectMutation(formData) {
  return axiosInstance.post('user/freelance-projects', formData);
}

export function searchComapniesQuery({ name, page }) {
  const params = buildSearchParams({ name, page });
  return axiosInstance.get(`explore/companies/search?${params}`);
}
