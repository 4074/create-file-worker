import JSZip from 'jszip'
import iconv from 'iconv-lite'
import XLSX from 'xlsx'

export default async function create(source: FileItem | FileItem[]) {
  const list = Array.isArray(source) ? source : [source]
  const result: FileBufferItem[] = []
  for (const item of list) {
    const res = await buildBuffer(item)
    result.push(res)
  }

  return result
}

async function buildBuffer(source: FileItem): Promise<FileBufferItem> {
  let buffer = new ArrayBuffer(0)
  if (source.type === 'zip') {
    const zip = new JSZip()
    for (const item of source.files) {
      const { name, buffer } = await buildBuffer(item)
      zip.file(name, buffer)
    }

    buffer = await zip.generateAsync({
      type: 'arraybuffer',
      encodeFileName: (n) => {
        return iconv.encode(n, 'GBK').toString()
      }
    })

  } else if (source.type === 'xlsx') {
    const SheetNames = []
    const Sheets: Record<string, XLSX.WorkSheet> = {}
    for (const { name, data } of source.data) {
      const wb = XLSX.utils.aoa_to_sheet(data)
      SheetNames.push(name)
      Sheets[name] = wb
    }

    buffer = XLSX.write(
      { SheetNames, Sheets },
      { bookType: 'xlsx', bookSST: false, type: 'array' }
    )
  }

  return {
    name: source.name,
    buffer
  }
}
