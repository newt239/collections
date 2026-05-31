import type { HTMLAttributes } from "react";

import { cx } from "styled-system/css";
import { card } from "styled-system/recipes";

const styles = card();

const Card = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div data-slot="card" className={cx(styles.root, className)} {...props} />
);

const CardHeader = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div data-slot="card-header" className={cx(styles.header, className)} {...props} />
);

const CardTitle = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div data-slot="card-title" className={cx(styles.title, className)} {...props} />
);

const CardDescription = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div data-slot="card-description" className={cx(styles.description, className)} {...props} />
);

const CardContent = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div data-slot="card-content" className={cx(styles.body, className)} {...props} />
);

const CardFooter = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div data-slot="card-footer" className={cx(styles.footer, className)} {...props} />
);

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };
