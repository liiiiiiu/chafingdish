/**
 * Generate UUID.
 *
 * @returns {string} UUID.
 *
 * @example
 *
 * gen_uuid() // '3e3e6bbb-ecb7-4289-8a05-a64647d82604'
 */
export function gen_uuid(): string {
  const s = []
  const hexDigits = '0123456789abcdef'

  for (let i = 0; i < 36; i++) {
    let start = Math.floor(Math.random() * 0x10)
    s[i] = hexDigits.substring(start, start + 1)
  }

  s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
  let start = (+s[19] & 0x3) | 0x8
  s[19] = hexDigits.substring(start, start + 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = '-'

  const uuid = s.join('')

  return uuid
}

/**
 * Generate random integer between two numbers.
 *
 * @param {number|undefined} start Minimum value between two numbers.
 * @param {number|undefined} end Maximum value between two numbers, not contain this value.
 *
 * @returns {number} Random integer between two numbers.
 *
 * @exapmle
 *
 * gen_random_integer(10, 100) // 12
 */
export function gen_random_integer(start?: number, end?: number): number {
  start = (start && +start) ? +start : 0
  end = (end && +end) ? +end : 10

  if (end < start) {
    [start, end] = [end, start]
  }

  return Math.floor(Math.random() * (end - start)) + Math.min(start, end)
}