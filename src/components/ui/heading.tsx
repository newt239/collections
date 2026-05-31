import type { ComponentPropsWithoutRef } from "react";

import { css, cx } from "styled-system/css";

type Level = 1 | 2 | 3 | 4;

type HeadingProps = {
  level?: Level;
  className?: string | undefined;
} & ComponentPropsWithoutRef<"h1" | "h2" | "h3" | "h4">;

const textStyleByLevel: Record<Level, "2xl" | "xl" | "lg" | "md"> = {
  1: "2xl",
  2: "xl",
  3: "lg",
  4: "md",
};

const Heading = ({ className, level = 1, ...props }: HeadingProps) => {
  const Element: `h${Level}` = `h${level}`;

  return (
    <Element
      className={cx(
        css({
          color: "fg.default",
          fontWeight: "semibold",
          letterSpacing: "tight",
          textStyle: textStyleByLevel[level],
        }),
        className,
      )}
      {...props}
    />
  );
};

export type { HeadingProps };
export { Heading };
