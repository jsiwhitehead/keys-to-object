# keys-to-object

Map an array of keys into a new object.

## Installation

```
yarn add keys-to-object
```

## API

Takes an array of keys and a map to generate corresponding values, and builds a new object from them.

If the key values themselves are arrays, the created object will be nested.

```typescript
keysToObject<K, V>(
  keys: K[],
  valueMap: V | (key: K, index: number) => V,
  keyMap?: (key: K, index: number) => string | string[],
  initial?: object
): object
```

#### `keys: K[]`

The array of keys to map.

#### `valueMap: V | (key: K, index: number) => V`

The value generated for each key, either a constant or a function of the key and index.

#### `keyMap?: (key: K, index: number) => string | string[]`

(Optional) A map to modify the keys of the result object.

#### `initial?: object`

(Optional) The object the new keys and values will be assigned to. Defaults to a new empty object.
