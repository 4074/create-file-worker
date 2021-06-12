# create-file-worker

[![npm version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![coverage][codecov-image]][codecov-url]

Create file with web worker, supports `xlsx` and `zip` file.

Advantages:

- The create file processing will not block the page rendering. It is useful for big file.
- The code of `xlsx`/`zip` will bundle in the worker chunk, which will be loaded async.

Browser Compatibility:

- Chrome >= 4
- Edge >= 12
- Firefox >= 3.5
- Internet Explorer >= 10

https://developer.mozilla.org/zh-CN/docs/Web/API/Worker

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

// Listen the `success` event, and save it to user file system in main thread.
worker.onmessage = ({ data }) => {
  const { type, payload } = data
  if (type === 'cfw:success') {
    for (const item of payload) {
      const blob = new Blob([item.buffer])
      saveAs(blob, item.name)
    }
  }
}

// Pass data to worker.
worker.postMessage({type: 'cfw:create', payload: {
  type: 'xlsx',
  name: 'example.xlsx',
  data: [{name: 'sheet1', [['1', '2'], ['a', 'b']]}]
}})

// Close the worker, maybe before component unmount.
worker.terminate()
```

You must use worker loader for this package.

1. Install `work-loader`.
2. Change your config file.

For webpack config:

```js
// webpack.config.js
{
//...
  rules: [
    test: /\.worker.(j|t)s$/,
    loader: 'worker-loader',
  ]
//...
}
```

For create-react-app, using craco:

```js
// craco.config.js
module.exports = {
  typescript: {
    enableTypeChecking: false,
  },
  webpack: {
    configure: (source) => {
      source.module.rules[1].oneOf.unshift({
        test: /\.worker.(j|t)s$/,
        loader: 'worker-loader',
      })
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
