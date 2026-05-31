import { css } from "styled-system/css";

import { Card, CardContent } from "#/components/ui/card";
import { Text } from "#/components/ui/text";
import { TaskItem } from "#/features/task/components/task-item";

import type { Task } from "#/features/task/types/task";

type TaskListProps = {
  tasks: Task[];
};

export const TaskList = ({ tasks }: TaskListProps) => (
  <div className={css({ display: "flex", flexDirection: "column", gap: "4" })}>
    {tasks.length === 0 ? (
      <Card className={css({ bg: "bg.subtle", borderColor: "border.subtle" })}>
        <CardContent className={css({ py: "8", textAlign: "center" })}>
          <Text>タスクがありません。新しいタスクを追加してください。</Text>
        </CardContent>
      </Card>
    ) : (
      tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          formattedCreatedAt={task.createdAt.toLocaleString("ja-JP")}
        />
      ))
    )}
  </div>
);
