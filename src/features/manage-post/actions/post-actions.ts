"use server";
import { PostApi } from "@/entities/post/api";
import { revalidatePath } from "next/cache";
import { FIELD_NAMES } from "../constants/field-names";
import { ActionState } from "@/shared/types/action-state";

export const savePost = async (_: ActionState, formData: FormData): Promise<ActionState> => {
  const id = formData.get(FIELD_NAMES.id) as string;
  const title = formData.get(FIELD_NAMES.title) as string;
  const content = formData.get(FIELD_NAMES.content) as string;
  const dateTime = formData.get(FIELD_NAMES.dateTime) as string;
  const resourceUid = formData.get(FIELD_NAMES.resourceUid) as string;

  if (!title || !content || !dateTime || !resourceUid) {
    return { error: "모든 필드를 입력해주세요." };
  }

  try {
    await PostApi.savePost({
      id: id || undefined,
      title,
      content,
      dateTime,
      resourceUid,
    });
    revalidatePath(`/companies/${resourceUid}`);
    return { success: true };
  } catch {
    return { error: "저장에 실패했습니다. 다시 시도해주세요." };
  }
};

export const deletePostAction = async (id: string, resourceUid: string) => {
  try {
    await PostApi.delete(id);
    revalidatePath(`/companies/${resourceUid}`);
    return { success: true };
  } catch {
    return { error: "삭제에 실패했습니다." };
  }
};
