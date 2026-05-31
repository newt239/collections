"use client";

import type { ComponentPropsWithoutRef } from "react";

import { Field } from "@ark-ui/react/field";

import { cx } from "styled-system/css";
import { field } from "styled-system/recipes";

const styles = field();

export const TextField = ({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof Field.Root>) => (
  <Field.Root className={cx(styles.root, className)} {...props} />
);
