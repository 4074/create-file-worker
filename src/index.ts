import create from "./create"

if (typeof window !== undefined) {
  // eslint-disable-next-line no-restricted-globals
  const ctx: Worker = self as any

  // Respond to message from parent thread
  ctx.addEventListener('message', ({ data }) => {
    const { type, payload } = data
    if (type === 'cfw:create') {
      create(payload).then((data) => {
        ctx.postMessage({ type: 'cfw:success', payload: data }, data.map(item => item.buffer))
      })
    }
  })
}

export { }
