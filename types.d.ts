/* eslint-disable @typescript-eslint/member-ordering */
type FileItem = ZipFile | XlsxFile

interface ZipFile {
  type: 'zip'
  name: string
  files: FileItem[]
}

interface XlsxFile {
  type: 'xlsx'
  name: string
  data: XlsxFileSheet[]
}

interface XlsxFileSheet {
  name: string
  data: string[][]
}

interface FileBufferItem {
  name: string
  buffer: ArrayBuffer
}

interface CreateMessage {
  type: 'cfw:create'
  payload: FileItem | FileItem[]
}

interface CreateSuccessMessage {
  type: 'cfw:success'
  payload: FileBufferItem[]
}

declare class CreateFileWorker {
  public constructor();

  public postMessage: (message: CreateMessage) => void
  public onmessage: ((this: Worker, ev: MessageEvent<CreateSuccessMessage>) => any) | null
  public onmessageerror: ((this: Worker, ev: MessageEvent) => any) | null

  public terminate: () => void
}