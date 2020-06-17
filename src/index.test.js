import { compress, decompress } from './'
import raw from '../sample.json'

const json = JSON.stringify(raw)
const jsonSize = json.length

describe('compress', () => {
  test('defined', () => {
    expect(compress).toBeDefined()
  })

  test('compresses JSON correctly', () => {
    const compressed = compress(raw)

    // console.log('Original: ', jsonSize)
    // console.log('Compressed: ', compress(raw, { level: 8 }).length)

    expect(compressed).toMatchSnapshot()
  })

  test('compresses string correctly', () => {
    const compressed = compress(json)
    expect(compressed).toMatchSnapshot()
  })

  test('compresses array correctly', () => {
    const compressed = compress(raw.activities)
    expect(compressed).toMatchSnapshot()
  })
})

describe('decompress', () => {
  test('defined', () => {
    expect(decompress).toBeDefined()
  })

  test('decompresses back into JSON', () => {
    const compressed = compress(raw)
    const decompressed = decompress(compressed)

    expect(decompressed).toStrictEqual(raw)
  })

  test('decompresses back into string', () => {
    const sample = 'Example string'
    const compressed = compress(sample)
    const decompressed = decompress(compressed)

    expect(decompressed).toStrictEqual(sample)
  })

  test('decompresses back into array', () => {
    const compressed = compress(raw.activities)
    const decompressed = decompress(compressed)

    expect(decompressed).toStrictEqual(raw.activities)
  })
})
