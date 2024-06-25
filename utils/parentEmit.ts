export const parentEmit =
  (emit: any, action: string) =>
  (...args: any) =>
    emit(action, ...args);
