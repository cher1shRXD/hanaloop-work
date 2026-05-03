import { createOrUpdatePost, fetchPosts } from "@/shared/libs/api"
import { Post } from "./types";

export const PostApi = {
  async getList() {
    return await fetchPosts();
  },

  async savePost(payload: Omit<Post, "id">) {
    return await createOrUpdatePost(payload);
  }
}