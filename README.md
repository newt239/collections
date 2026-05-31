# Next.js Template

- TypeScript
- Next.js App Router
- [Panda CSS](https://panda-css.com/)
- [Park UI](https://park-ui.com/)（[Ark UI](https://ark-ui.com/) ベース）
- [Lucide React](https://lucide.dev/)（アイコン）
- [next-themes](https://github.com/pacocoursey/next-themes)（ダークモード）
- Oxlint
- Oxfmt
- Cloudflare Workers（[OpenNext](https://opennext.js.org/cloudflare)）
- Cloudflare D1 (SQLite)
- Drizzle

## Development

### 1. 依存関係のインストール

```bash
pnpm install
```

> `pnpm install` 時に `prepare` スクリプトが実行され、Panda CSS の `styled-system/` と Cloudflare 環境型 `cloudflare-env.d.ts` が自動生成されます（いずれも git 管理対象外）。

### 2. ローカル D1 データベースの構築

`wrangler.jsonc` の `d1_databases` バインディング（`binding: "DB"`）に対して、ローカルの D1（SQLite）へマイグレーションを適用します。Cloudflare へのログインは不要で、完全にオフラインで動作します。

```bash
# スキーマから SQL マイグレーションを生成（スキーマを変更したときのみ）
pnpm run db:generate

# ローカル D1 にマイグレーションを適用
pnpm run db:migrate:local
```

ローカル D1 の実体は `.wrangler/state/` 配下に作成されます。

### 3. 開発サーバーの起動

```bash
pnpm run dev
```

`next.config.ts` の `initOpenNextCloudflareForDev()` により、`next dev` から D1 などの Cloudflare バインディングへアクセスできます。

## 環境変数

ローカル開発（`wrangler --local` の D1）では環境変数は不要です。データベース接続は `wrangler.jsonc` の D1 バインディングで設定します。

リモートの Cloudflare D1 やデプロイで使う場合のみ、`.env.example` を基に値を設定してください。

## Drizzle / D1

- スキーマは `src/lib/drizzle/schema/index.ts` で管理します。
- スキーマ変更を SQL マイグレーションとして生成: `pnpm run db:generate`
- ローカル D1 へマイグレーション適用: `pnpm run db:migrate:local`
- リモート D1 へマイグレーション適用: `pnpm exec wrangler d1 migrations apply DB --remote`（要 `wrangler login`）
- アプリからの D1 アクセスは `src/lib/drizzle/client.ts` の `getDb()` / `getDbAsync()` を使用します。
  - `getDb()`: Server Actions など動的レンダリング向け（同期）
  - `getDbAsync()`: `"use cache"` や静的レンダリング（ISR/SSG）向け（非同期）

## Cloudflare へのデプロイ

OpenNext（`@opennextjs/cloudflare`）を使って Cloudflare Workers にデプロイします。

```bash
# Cloudflare 環境型の生成（wrangler.jsonc を変更したとき）
pnpm run cf-typegen

# ローカルでビルド結果をプレビュー
pnpm run preview

# Cloudflare へデプロイ（要 wrangler login）
pnpm run deploy
```

リモート D1 を使う場合は、`wrangler d1 create collections-db` で取得した `database_id` を `wrangler.jsonc` に設定してください（初期値はローカル用のプレースホルダです）。

## 品質チェック

```bash
# 型チェック / Lint / フォーマット / 未使用検出をまとめて実行
pnpm run codecheck

# 単体テスト（Vitest）
pnpm run test

# E2E テスト（Playwright）
pnpm run test:e2e
```
