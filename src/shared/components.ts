import type { ReactNode } from "react";

// 基础类型
export type BooleanLike = boolean | string | number | null | undefined;

// 通用的 Props 类型，支持函数式 children
export type CustomPropsWithChildren<P = object> = P & {
  children?: ReactNode | ((...args: unknown[]) => ReactNode);
};

// Show 组件类型
export interface ShowProps<T> {
  children: ReactNode;
  when: T | null | undefined;
  fallback?: ReactNode;
}

// Match 组件类型
export interface MatchProps<T> {
  children: ReactNode;
  when: T | undefined | null | false;
  fallback?: ReactNode;
}

// For 组件类型
export interface ForProps<T> {
  each: T[];
  children: (item: T, index: number) => ReactNode;
}
