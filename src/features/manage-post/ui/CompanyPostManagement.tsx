"use client";

import { useState } from "react";
import { Post } from "@/entities/post/types";
import PostListSection from "./PostListSection";
import PostFormSection from "./PostFormSection";

interface Props {
  companyId: string;
  yearMonth: string;
  posts: Post[];
}

const CompanyPostManagement = ({ companyId, yearMonth, posts }: Props) => {
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  const filteredPosts = posts.filter(
    (p) => p.resourceUid === companyId && (!yearMonth || p.dateTime === yearMonth)
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <PostListSection 
        posts={filteredPosts} 
        yearMonth={yearMonth} 
        onEdit={setEditingPost}
      />
      <PostFormSection 
        companyId={companyId} 
        yearMonth={yearMonth || "2026-06"}
        editingPost={editingPost}
        onCancelEdit={() => setEditingPost(null)}
      />
    </div>
  );
};

export default CompanyPostManagement;
