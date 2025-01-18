export type ChangePropsValueType<T, K extends keyof T, V = any> = Omit<T, K> & {
  [P in K]: V;
};
