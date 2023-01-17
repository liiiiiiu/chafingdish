import { describe, expect, test } from '@jest/globals'

import {
  is_string
} from '../lib/core/is'

describe('is', () => {
  test('is_string 传入 1, null, undefined, false 返回 false', () => {
    Array.from([1, null, undefined, false, NaN, [], {}, () => { }, Infinity], value => { expect(is_string(value)).toBe(false) })
  })
  test("is_string 传入 '', '0', 'a' 返回 true", () => {
    Array.from(['', '0', 'a'], value => { expect(is_string(value)).toBe(true) })
  })
})