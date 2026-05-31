import type { ButtonHTMLAttributes, Ref } from "react";

import { css, cx } from "styled-system/css";
import { button } from "styled-system/recipes";

type Intent = "primary" | "secondary" | "outline" | "plain" | "danger" | "warning";
type ButtonSize = "xs" | "sm" | "md" | "lg" | "sq-xs" | "sq-sm" | "sq-md" | "sq-lg";
type RecipeVariant = "solid" | "outline" | "ghost" | "subtle";

// 旧 intent を Park UI button recipe の variant / colorPalette へ変換する
const intentToRecipe: Record<Intent, { variant: RecipeVariant; colorPalette?: "red" }> = {
  danger: { variant: "solid", colorPalette: "red" },
  // amber トークンは未生成のため、警告系も red で代替する
  outline: { variant: "outline" },
  plain: { variant: "ghost" },
  primary: { variant: "solid" },
  secondary: { variant: "subtle" },
  warning: { variant: "solid", colorPalette: "red" },
};

// 正方形（アイコン）ボタンの寸法と、対応する Park UI の基準サイズ
const squareSizes = {
  "sq-lg": { base: "lg", box: "12" },
  "sq-md": { base: "md", box: "11" },
  "sq-sm": { base: "sm", box: "10" },
  "sq-xs": { base: "xs", box: "8" },
} as const;

const isSquareSize = (size: ButtonSize): size is keyof typeof squareSizes => size in squareSizes;

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  intent?: Intent;
  size?: ButtonSize;
  isCircle?: boolean;
  ref?: Ref<HTMLButtonElement>;
};

export const Button = ({
  className,
  intent = "primary",
  size = "md",
  isCircle = false,
  type = "button",
  ref,
  ...props
}: ButtonProps) => {
  const { variant, colorPalette } = intentToRecipe[intent];
  const square = isSquareSize(size) ? squareSizes[size] : null;
  // 正方形サイズのときは Park UI の基準サイズ、それ以外は size をそのまま使う
  const recipeSize = isSquareSize(size) ? squareSizes[size].base : size;

  return (
    <button
      ref={ref}
      type={type}
      className={cx(
        button({ size: recipeSize, variant }),
        css({
          ...(colorPalette ? { colorPalette } : {}),
          ...(isCircle ? { borderRadius: "full" } : {}),
          ...(square
            ? {
                // 正方形にし、44px の最小タップ領域を擬似要素で確保する
                _before: {
                  content: '""',
                  height: "100%",
                  left: "50%",
                  minHeight: "44px",
                  minWidth: "44px",
                  position: "absolute",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "100%",
                },
                height: square.box,
                minWidth: square.box,
                position: "relative",
                px: "0",
                width: square.box,
              }
            : {}),
        }),
        className,
      )}
      {...props}
    />
  );
};
