import { createOrUpdatePost, fetchPosts, fetchPostById, deletePost } from "@/shared/libs/api"
import { Post } from "./types";

export const PostApi = {
  async getList() {
    return await fetchPosts();
  },

  async getById(id: string) {
    return await fetchPostById(id);
  },

  async savePost(payload: Omit<Post, "id"> & { id?: string }) {
    return await createOrUpdatePost(payload);
  },

  async delete(id: string) {
    return await deletePost(id);
  }
}
