/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs')
const path = require('path')

const index = `
export default CreateFileWorker;
`

const create = `
export default function create(source: FileItem | FileItem[]): Promise<{
  name: string;
  buffer: ArrayBuffer;
}[]>;
`

const source = fs.readFileSync(path.join(__dirname, 'types.d.ts')).toString()
fs.writeFileSync(path.join(__dirname, './dist/index.worker.d.ts'), source + '\n' + index)
fs.writeFileSync(path.join(__dirname, './dist/create.d.ts'), source + '\n' + create)