"use client";

import { useState, useTransition } from "react";

import { css } from "styled-system/css";

import { Button } from "#/components/ui/button";
import { Label } from "#/components/ui/field";
import { Input } from "#/components/ui/input";
import { TextField } from "#/components/ui/text-field";
import { createTask } from "#/features/task/actions/create-task";

export const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim()) {
      return;
    }

    startTransition(async () => {
      try {
        const result = await createTask({ title: title.trim() });

        if (result.success) {
          setTitle("");
          window.location.reload();
        } else {
          console.error("タスクの作成に失敗しました:", result.error);
        }
      } catch (error) {
        console.error("タスクの作成に失敗しました:", error);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        className={css({
          display: "flex",
          flexDirection: "column",
          gap: "4",
          sm: { alignItems: "flex-end", flexDirection: "row" },
        })}
      >
        <TextField className={css({ flex: "1", minWidth: "0" })}>
          <Label>新しいタスク</Label>
          <Input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder="新しいタスクを入力してください"
            disabled={isPending}
          />
        </TextField>
        <Button
          type="submit"
          disabled={isPending || !title.trim()}
          className={css({ flexShrink: "0" })}
        >
          {isPending ? "追加中..." : "追加"}
        </Button>
      </div>
    </form>
  );
};
