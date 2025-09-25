import type { ForProps, MatchProps, ShowProps } from "@/shared/components";
import React, { Fragment, type ReactNode } from "react";

// Show组件 - 条件渲染
export function Show<T>({
  children,
  when,
  fallback,
}: ShowProps<T>): React.ReactElement | ReactNode | null {
  function isNotNullOrUndefined(value: T | null | undefined): value is T {
    return value !== null && value !== undefined;
  }

  if (!isNotNullOrUndefined(when) || !when) return fallback ?? null;
  return <>{children}</>;
}

// Match组件 - 多条件匹配渲染
export function Match<T>({ children, when, fallback }: MatchProps<T>) {
  return <>{when ? children : fallback}</>;
}

// For组件 - 循环渲染
export function For<T>({ each, children }: ForProps<T>): React.ReactElement {
  return (
    <>
      {each.map((item, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <Fragment key={index}>{children(item, index)}</Fragment>
      ))}
    </>
  );
}
