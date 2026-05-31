import { notFound } from "next/navigation";
import { css } from "styled-system/css";

import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import { Heading } from "#/components/ui/heading";
import { Text } from "#/components/ui/text";
import { getTaskById } from "#/features/task/actions/get-task";
import { TaskIdParamsSchema } from "#/features/task/schemas/task";

type TaskDetailProps = {
  params: Promise<{ id: string }>;
};

export const TaskDetail = async ({ params }: Readonly<TaskDetailProps>) => {
  const resolvedParams = await params;
  const parsedParams = TaskIdParamsSchema.safeParse(resolvedParams);

  if (!parsedParams.success) {
    notFound();
  }

  const id = Number(parsedParams.data.id);
  const task = await getTaskById(id);

  if (!task) {
    notFound();
  }

  return (
    <main
      className={css({
        bg: "bg.canvas",
        minHeight: "100vh",
        px: { base: "4", sm: "6" },
        py: { base: "12", sm: "16" },
      })}
    >
      <div className={css({ maxW: "2xl", mx: "auto" })}>
        <Card className={css({ borderColor: "border.default" })}>
          <CardHeader
            className={css({ borderBottomWidth: "1px", borderColor: "border.subtle", pb: "4" })}
          >
            <Heading level={1} className={css({ textAlign: "center" })}>
              タスク詳細
            </Heading>
          </CardHeader>
          <CardContent
            className={css({ display: "flex", flexDirection: "column", gap: "4", pt: "6" })}
          >
            <CardTitle
              className={
                task.isCompleted
                  ? css({ color: "fg.muted", textDecoration: "line-through" })
                  : undefined
              }
            >
              {task.title}
            </CardTitle>
            <Text className={css({ fontSize: "sm" })}>
              作成日時: {task.createdAt.toLocaleString("ja-JP")}
            </Text>
            <Text className={css({ fontSize: "sm" })}>
              ステータス: {task.isCompleted ? "完了" : "未完了"}
            </Text>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};
