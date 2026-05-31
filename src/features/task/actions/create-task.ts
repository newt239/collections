"use server";

import { updateTag } from "next/cache";

import { CreateTaskRequestSchema, TaskResponseSchema } from "#/features/task/schemas/task";
import { getDb } from "#/lib/drizzle/client";
import { taskItems } from "#/lib/drizzle/schema";

export const createTask = async (data: { title: string }) => {
  try {
    const body = CreateTaskRequestSchema.parse(data);

    const db = getDb();
    const [task] = await db
      .insert(taskItems)
      .values({
        isCompleted: false,
        title: body.title,
      })
      .returning();

    const response = TaskResponseSchema.parse(task);

    updateTag("tasks");
    updateTag(`task-${response.id}`);

    return { success: true, task: response } as const;
  } catch (error) {
    console.error("タスク作成エラー:", error);
    return { error: "タスクの作成に失敗しました", success: false } as const;
  }
};
