"use client";

import type { ComponentProps, Ref } from "react";

import { Field } from "@ark-ui/react/field";

import { cx } from "styled-system/css";
import { input } from "styled-system/recipes";

type InputProps = ComponentProps<"input"> & {
  ref?: Ref<HTMLInputElement>;
};

export const Input = ({ className, ref, ...props }: InputProps) => (
  <Field.Input ref={ref} data-slot="control" className={cx(input(), className)} {...props} />
);
