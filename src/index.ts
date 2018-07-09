export interface Nested<T> {
  [key: string]: Nested<T> | T;
}

export default function keysToObject<T, U = any>(
  keys: U[],
  valueMap: T | ((k: U, i: number) => T),
  keyMap?: (k: U, i: number) => string,
  initial?: { [key: string]: T },
): { [key: string]: T };
export default function keysToObject<T, U = any>(
  keys: U[],
  valueMap: T | ((k: U, i: number) => T),
  keyMap?: (k: U, i: number) => string | string[],
  initial?: Nested<T>,
): Nested<T>;
export default function keysToObject<T, U = any>(
  keys: U[],
  valueMap: T | ((k: U, i: number) => T),
  keyMap?: (k: U, i: number) => string | string[],
  initial = {},
) {
  const valueFunc = typeof valueMap === 'function';
  return keys.reduce<Nested<T>>((res, key, i) => {
    const newValue = valueFunc
      ? (valueMap as ((k: U, i: number) => T))(key, i)
      : (valueMap as T);
    const newKey = keyMap
      ? keyMap(key, i)
      : Array.isArray(key)
        ? key.map(k => `${k}`)
        : `${key}`;
    if (typeof newKey === 'string') return { ...res, [newKey]: newValue };
    newKey.reduce<Nested<T> | T>((r, k, i) => {
      if (i === newKey.length - 1) r[k] = newValue;
      else r[k] = r[k] || {};
      return r[k];
    }, res);
    return res;
  }, initial);
}
