import Link from "next/link";
import { css } from "styled-system/css";

import { Button } from "#/components/ui/button";
import { Card, CardContent, CardHeader } from "#/components/ui/card";
import { Heading } from "#/components/ui/heading";
import { Text } from "#/components/ui/text";

const NotFoundPage = () => (
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
            ページが見つかりません
          </Heading>
        </CardHeader>
        <CardContent
          className={css({
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            gap: "4",
            pt: "6",
          })}
        >
          <Text className={css({ fontSize: "sm" })}>
            お探しのページは存在しないか、削除された可能性があります。
          </Text>
          <Button intent="primary" size="md">
            <Link href="/">ホームに戻る</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  </main>
);

export default NotFoundPage;
