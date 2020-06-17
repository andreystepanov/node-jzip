import pako from 'pako'

export function compress(data, options) {
  let string

  switch (typeof data) {
    case 'string':
      string = data
      break
    default:
      string = JSON.stringify(data)
      break
  }

  const compressed = pako.deflate(string, {
    // level: 9,
    ...options,
    to: 'string',
  })

  return Buffer.from(compressed).toString('base64')
}

export function decompress(data) {
  const binary = Buffer.from(data, 'base64').toString()
  const decompressed = pako.inflate(binary, { to: 'string' })

  try {
    const json = JSON.parse(decompressed)

    return json
  } catch (e) {
    return decompressed
  }
}
