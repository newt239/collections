import { defineConfig } from "@pandacss/dev";
import { createPreset } from "@park-ui/panda-preset";
import neutral from "@park-ui/panda-preset/colors/neutral";

export default defineConfig({
  // Tailwind の preflight に相当する CSS リセットを Panda 側で行う
  preflight: true,
  // Styled-system/jsx の styled() などを React 向けに生成
  jsxFramework: "react",
  // スタイル抽出の対象
  include: ["./src/**/*.{ts,tsx,js,jsx}"],
  exclude: [],
  // 生成物の出力先（git 管理しない。prepare スクリプトで生成）
  outdir: "styled-system",
  presets: [
    createPreset({
      // 現状のモノクロ基調を維持するため accent / gray ともに neutral
      accentColor: neutral,
      grayColor: neutral,
      radius: "lg",
    }),
  ],
  plugins: [
    {
      // Park UI のカラー体系と衝突しないよう Panda 既定のカラートークンを除去する
      name: "Remove Panda Preset Colors",
      hooks: {
        "preset:resolved": ({ utils, preset, name }) =>
          name === "@pandacss/preset-panda"
            ? utils.omit(preset, ["theme.tokens.colors", "theme.semanticTokens.colors"])
            : preset,
      },
    },
  ],
  // 旧 globals.css の @layer base から移植したグローバルスタイル
  // （body の背景色・文字色・border 色・placeholder は Park UI preset 側で設定済み）
  globalCss: {
    "::-webkit-scrollbar": {
      width: "4px",
    },
    "::-webkit-scrollbar-thumb": {
      background: "border.subtle",
      borderRadius: "sm",
    },
    "::-webkit-scrollbar-track": {
      background: "transparent",
    },
    body: {
      MozOsxFontSmoothing: "grayscale",
      WebkitFontSmoothing: "antialiased",
      minHeight: "100vh",
    },
    html: {
      WebkitTapHighlightColor: "transparent",
      fontFamily: "sans",
      scrollbarColor: "token(colors.border.subtle) transparent",
      scrollbarWidth: "thin",
    },
  },
});
