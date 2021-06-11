import create from '../src/create'

function buildData(rows = 1000) {
  const result = []
  for (let i = 0; i < rows; i += 1) {
    const row = []
    for (let j = 0; j < 10; j += 1) {
      row.push(i + j)
    }
    result.push(row)
  }
  return result
}

describe('create', () => {
  it('create a xlsx', async () => {
    const data = buildData(100)
    const [a] = await create({
      type: 'xlsx',
      name: 'example.xlsx',
      data: [{ name: 'sheet1', data }]
    })

    expect(a.name).toEqual('example.xlsx')
    expect(typeof a.buffer).toEqual('object')
  })

  it('create a zip', async () => {
    const data = buildData(100)
    const [b] = await create([{
      type: 'zip',
      name: 'example.zip',
      files: [
        {
          type: 'xlsx',
          name: '1.xlsx',
          data: [{ name: 'sheet1', data }, { name: 'shee2', data }]
        },
        {
          type: 'xlsx',
          name: '2.xlsx',
          data: [{ name: 'sheet1', data }]
        }
      ]
    }])

    expect(b.name).toEqual('example.zip')
    expect(typeof b.buffer).toEqual('object')
  })
})
