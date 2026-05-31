"use client";

import { useTransition } from "react";

import { Check, X } from "lucide-react";
import Link from "next/link";
import { css } from "styled-system/css";

import { Button } from "#/components/ui/button";
import { Card, CardContent, CardTitle } from "#/components/ui/card";
import { Text } from "#/components/ui/text";
import { deleteTask } from "#/features/task/actions/delete-task";
import { updateTask } from "#/features/task/actions/update-task";

import type { Task } from "#/features/task/types/task";

type TaskItemProps = {
  task: Task;
  formattedCreatedAt: string;
};

export const TaskItem = ({ task, formattedCreatedAt }: TaskItemProps) => {
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    startTransition(async () => {
      try {
        const result = await updateTask(task.id, { isCompleted: !task.isCompleted });

        if (result.success) {
          window.location.reload();
        } else {
          console.error("タスクの更新に失敗しました:", result.error);
        }
      } catch (error) {
        console.error("タスクの更新に失敗しました:", error);
      }
    });
  };

  const handleDelete = () => {
    if (!confirm("このタスクを削除しますか？")) {
      return;
    }

    startTransition(async () => {
      try {
        const result = await deleteTask(task.id);

        if (result.success) {
          window.location.reload();
        } else {
          console.error("タスクの削除に失敗しました:", result.error);
        }
      } catch (error) {
        console.error("タスクの削除に失敗しました:", error);
      }
    });
  };

  return (
    <Card className={task.isCompleted ? css({ opacity: "0.7" }) : undefined}>
      <CardContent className={css({ alignItems: "center", display: "flex", gap: "3", py: "4" })}>
        <Button
          type="button"
          intent="outline"
          size="sq-sm"
          onClick={handleToggle}
          disabled={isPending}
          aria-label={task.isCompleted ? "未完了にマーク" : "完了にマーク"}
          className={css({ flexShrink: "0" })}
        >
          {task.isCompleted ? <Check size={16} aria-hidden /> : null}
        </Button>
        <div className={css({ flex: "1", minWidth: "0" })}>
          <CardTitle
            className={
              task.isCompleted
                ? css({ color: "fg.muted", fontWeight: "normal", textDecoration: "line-through" })
                : undefined
            }
          >
            <Link
              href={`/tasks/${task.id}`}
              className={css({ _hover: { textDecoration: "underline" } })}
            >
              {task.title}
            </Link>
          </CardTitle>
          <Text className={css({ fontSize: "sm", marginTop: "1" })}>{formattedCreatedAt}</Text>
        </div>
        <Button
          type="button"
          intent="danger"
          size="sq-sm"
          onClick={handleDelete}
          disabled={isPending}
          aria-label="削除"
          className={css({ flexShrink: "0" })}
        >
          <X size={16} aria-hidden />
        </Button>
      </CardContent>
    </Card>
  );
};
