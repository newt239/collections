import type { ComponentPropsWithoutRef } from "react";

import { css, cx } from "styled-system/css";

export const Text = ({ className, ...props }: ComponentPropsWithoutRef<"p">) => (
  <p
    data-slot="text"
    {...props}
    className={cx(css({ color: "fg.muted", textStyle: "sm" }), className)}
  />
);
