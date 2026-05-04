"use client";

import { useActionState, useEffect, useState, startTransition } from "react";
import { Post } from "@/entities/post/types";
import { savePost } from "../actions/post-actions";
import Input from "@/shared/ui/Input";
import Textarea from "@/shared/ui/Textarea";
import Button from "@/shared/ui/Button";
import SectionCard from "@/shared/ui/SectionCard";
import { XIcon } from "lucide-react";
import { FIELD_NAMES } from "../constants/field-names";

interface Props {
  companyId: string;
  yearMonth: string;
  editingPost?: Post | null;
  onCancelEdit?: () => void;
}

const PostForm = ({
  companyId,
  yearMonth,
  editingPost,
  onCancelEdit,
}: Props) => {
  const [state, action, isPending] = useActionState(savePost, null);
  const [title, setTitle] = useState(editingPost?.title ?? "");
  const [content, setContent] = useState(editingPost?.content ?? "");

  useEffect(() => {
    if (state?.success && !editingPost) {
      startTransition(() => {
        setTitle("");
        setContent("");
      });
    }
  }, [state, editingPost]);

  useEffect(() => {
    if (state?.error) alert(state.error);
  }, [state]);

  return (
    <SectionCard
      title={editingPost ? "포스트 수정" : "새 포스트 작성"}
      hint={
        editingPost
          ? "기존 포스트 내용을 수정합니다"
          : `${yearMonth} 분석에 대한 포스트를 남겨보세요`
      }
      inView={true}
      action={
        editingPost && (
          <button
            onClick={onCancelEdit}
            className="p-1.5 rounded-lg hover:bg-border/20 text-text/40 transition-colors"
          >
            <XIcon size={16} />
          </button>
        )
      }
      className="h-min"
    >
      <form action={action} className="space-y-4">
        {editingPost && (
          <input type="hidden" name={FIELD_NAMES.id} value={editingPost.id} />
        )}
        <input type="hidden" name={FIELD_NAMES.dateTime} value={yearMonth} />
        <input type="hidden" name={FIELD_NAMES.resourceUid} value={companyId} />

        <Input
          name={FIELD_NAMES.title}
          label="제목"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="h-10"
        />

        <Textarea
          name={FIELD_NAMES.content}
          label="내용"
          placeholder="내용을 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="min-h-30"
        />

        <Button
          type="submit"
          className="w-full h-11 text-sm font-bold"
          isLoading={isPending}
        >
          {editingPost ? "수정 완료" : "포스트 저장"}
        </Button>
      </form>
    </SectionCard>
  );
};

export default PostForm;
