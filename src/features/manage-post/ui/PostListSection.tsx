"use client";

import { Post } from "@/entities/post/types";
import { MessageSquareIcon, CalendarIcon, Trash2Icon, PencilIcon } from "lucide-react";
import SectionCard from "@/shared/ui/SectionCard";
import { deletePostAction } from "../actions/post-actions";

interface Props {
  posts: Post[];
  yearMonth?: string;
  onEdit?: (post: Post) => void;
}

const PostListSection = ({ posts, yearMonth, onEdit }: Props) => {
  const handleDelete = async (id: string, resourceUid: string) => {
    if (confirm("정말로 이 포스트를 삭제하시겠습니까?")) {
      await deletePostAction(id, resourceUid);
    }
  };

  return (
    <SectionCard 
      title={yearMonth ? `${yearMonth} 분석 포스트 목록` : "전체 포스트 목록"} 
      inView={true}
      className="h-full lg:col-[1/3]"
    >
      <div className="space-y-3 pr-2">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post.id}
              className="p-4 rounded-xl border border-border bg-background/50 group transition-all hover:border-primaryBlue/30"
            >
              <div className="flex justify-between items-start gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 flex items-center justify-center rounded-lg bg-primaryBlue/10 text-primaryBlue">
                    <MessageSquareIcon size={12} />
                  </div>
                  <h3 className="font-bold text-text truncate">{post.title}</h3>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => onEdit?.(post)}
                    className="p-1.5 rounded-lg hover:bg-primaryBlue/10 text-primaryBlue transition-colors"
                  >
                    <PencilIcon size={14} />
                  </button>
                  <button 
                    onClick={() => handleDelete(post.id, post.resourceUid)}
                    className="p-1.5 rounded-lg hover:bg-red-400/10 text-red-400 transition-colors"
                  >
                    <Trash2Icon size={14} />
                  </button>
                </div>
              </div>
              <p className="text-sm text-text/60 line-clamp-2 leading-relaxed mb-2">
                {post.content}
              </p>
              <div className="flex items-center gap-1 text-[10px] text-text/30 font-medium uppercase">
                <CalendarIcon size={10} />
                {post.dateTime}
              </div>
            </div>
          ))
        ) : (
          <div className="py-12 flex flex-col items-center justify-center text-text/20 gap-2">
            <MessageSquareIcon size={24} strokeWidth={1.5} />
            <p className="text-xs">등록된 포스트가 없습니다.</p>
          </div>
        )}
      </div>
    </SectionCard>
  );
};

export default PostListSection;
