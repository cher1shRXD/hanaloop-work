"use client";

import { useState } from "react";
import { Post } from "@/entities/post/types";
import PostList from "./PostList";
import PostForm from "./PostForm";

interface Props {
  companyId: string;
  yearMonth: string;
  posts: Post[];
}

const CompanyPostManagement = ({ companyId, yearMonth, posts }: Props) => {
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const today = new Date();

  const filteredPosts = posts.filter(
    (p) => p.resourceUid === companyId && (!yearMonth || p.dateTime === yearMonth)
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <PostList 
        posts={filteredPosts} 
        yearMonth={yearMonth} 
        onEdit={setEditingPost}
      />
      <PostForm
        key={editingPost?.id ?? "new"}
        companyId={companyId}
        yearMonth={yearMonth || `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2, "0")}`}
        editingPost={editingPost}
        onCancelEdit={() => setEditingPost(null)}
      />
    </div>
  );
};

export default CompanyPostManagement;
