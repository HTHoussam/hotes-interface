declare namespace Helper {
  export type TypeOrCallbackValue<T, TDefaultValues = T> = T | ((initialValue: TDefaultValues) => T);
}
