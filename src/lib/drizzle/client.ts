import "server-only";
import { cache } from "react";

import { getCloudflareContext } from "@opennextjs/cloudflare";
import { drizzle } from "drizzle-orm/d1";

import * as schema from "./schema/index";

// 動的レンダリング（Server Actions など）から D1 バインディングを取得する
export const getDb = cache(() => {
  const { env } = getCloudflareContext();
  return drizzle(env.DB, { schema });
});

// "use cache" や静的レンダリング（ISR/SSG）から D1 バインディングを取得する
export const getDbAsync = cache(async () => {
  const { env } = await getCloudflareContext({ async: true });
  return drizzle(env.DB, { schema });
});

export * from "./schema";
