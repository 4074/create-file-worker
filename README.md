# create-file-worker

[![npm version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![coverage][codecov-image]][codecov-url]

Create file with web worker, supports `xlsx` and `zip` file. Then, you can save files in main thread.

## Install

```sh
# yarn
yarn add create-file-worker

# npm
npm i create-file-worker
```

## Usage

```ts
import { saveAs } from 'file-saver'
import CreateFileWorker from 'create-file-worker'

const worker = new CreateFileWorker()

worker.onmessage = ({ data }) => {
  const { type, payload } = data
  if (type === 'cfw:success') {
    for (const item of payload) {
      const blob = new Blob([item.buffer])
      saveAs(blob, item.name)
    }
  }
}

worker.postMessage({type: 'cfw:create', payload: {
  type: 'xlsx',
  name: 'example.xlsx',
  data: [{name: 'sheet1', [['1', '2'], ['a', 'b']]}]
}})
```

Should using worker for this package.

```js
// craco.config.js
module.exports = {
  typescript: {
    enableTypeChecking: false,
  },
  webpack: {
    configure: (source) => {
      const arr = source.module.rules[1].oneOf
      const workerReg = /create-file-worker\\dist\\index.js/

      const workerRule = {
        test: workerReg,
        loader: require.resolve('worker-loader'),
      }

      arr.unshift(workerRule)
      return source
    },
  },
}
```

[npm-image]: https://img.shields.io/npm/v/create-file-worker?style=flat-square
[npm-url]: https://www.npmjs.com/package/create-file-worker
[travis-image]: https://img.shields.io/travis/com/4074/create-file-worker?style=flat-square
[travis-url]: https://travis-ci.com/4074/create-file-worker
[codecov-image]: https://img.shields.io/codecov/c/github/4074/create-file-worker.svg?style=flat-square
[codecov-url]: https://app.codecov.io/gh/4074/create-file-worker?branch=main
