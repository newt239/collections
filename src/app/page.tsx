import { css } from "styled-system/css";

import { Card, CardContent, CardHeader } from "#/components/ui/card";
import { Heading } from "#/components/ui/heading";
import { TaskForm } from "#/features/task/components/task-form";
import { TaskListFetcher } from "#/features/task/components/task-list/task-list-fetcher";

const HomePage = () => (
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
            Task App
          </Heading>
        </CardHeader>
        <CardContent
          className={css({ display: "flex", flexDirection: "column", gap: "8", pt: "6" })}
        >
          <TaskForm />
          <TaskListFetcher />
        </CardContent>
      </Card>
    </div>
  </main>
);

export default HomePage;
