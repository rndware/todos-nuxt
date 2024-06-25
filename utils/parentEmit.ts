/**
 * Vue3 does not allow bubbling up of custom events.
 * "parentEmit" allows emitting to parent without specifying specific additional arguments
 * @param emit custom vue3 emit function
 * @param action custom event name
 */
export const parentEmit =
  (emit: any, action: string) =>
  (...args: any) =>
    emit(action, ...args);
