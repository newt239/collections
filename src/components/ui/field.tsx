"use client";

import type { ComponentPropsWithoutRef } from "react";

import { Field } from "@ark-ui/react/field";

import { cx } from "styled-system/css";
import { field } from "styled-system/recipes";

const styles = field();

export const Label = ({ className, ...props }: ComponentPropsWithoutRef<typeof Field.Label>) => (
  <Field.Label className={cx(styles.label, className)} {...props} />
);

export const Description = ({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof Field.HelperText>) => (
  <Field.HelperText className={cx(styles.helperText, className)} {...props} />
);

export const FieldError = ({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof Field.ErrorText>) => (
  <Field.ErrorText className={cx(styles.errorText, className)} {...props} />
);
