import { ApiRequest } from "@/constant/api.config";

export const getCategories = async () =>
  await ApiRequest(`/wp-json/wp/v2/categories`);

export const getPosts = async () => await ApiRequest(`/wp-json/wp/v2/posts`);

export const getPost = async (id: number) =>
  await ApiRequest(`/wp-json/wp/v2/posts/${id}`);
