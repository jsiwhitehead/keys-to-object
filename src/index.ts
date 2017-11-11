export default function keysToObject<T, U = any>(
  keys: U[],
  valueMap: T | ((k: U, i: number) => T | undefined),
  keyMap?: (k: U, i: number) => string,
) {
  const valueFunc = typeof valueMap === 'function';
  return keys.reduce<{ [key: string]: T }>((res, k, i) => {
    const newValue = valueFunc
      ? (valueMap as ((k: U, i: number) => T | undefined))(k, i)
      : (valueMap as T);
    return newValue === undefined
      ? res
      : { ...res, [keyMap ? keyMap(k, i) : `${k}`]: newValue };
  }, {});
}
