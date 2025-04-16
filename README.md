# obj-merge

> Recursively merge plain objects. Immutable — does not modify inputs.

## Install

```sh
npm install obj-merge
```

## Usage

```js
const { merge } = require('obj-merge');

const a = { x: 1, y: { z: 2 } };
const b = { y: { w: 3 }, v: 4 };

console.log(merge(a, b));
//=> { x: 1, y: { z: 2, w: 3 }, v: 4 }
```

Multiple sources are merged left to right:

```js
merge({ a: 1 }, { b: 2 }, { c: 3 });
//=> { a: 1, b: 2, c: 3 }
```

Non-plain values (arrays, class instances, Dates) are assigned by reference, not recursively merged.

## API

### `merge(...sources)`

Merges any number of plain objects into a new object. Sources are processed left to right; later sources win on key conflicts.

**Returns** a new plain object. Inputs are never mutated.

## License

MIT
