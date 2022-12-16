import Check from '../helper/check'

const check = new Check()

/**
 * Get now timestamp.
 *
 * @returns {number} Timestamp.
 *
 * @example
 *
 * d_time() // 1656819176086
 */
export function d_time(): number {
  return +Date.now()
}

/**
 * Get formatted date.
 *
 * @param {string|number|undefined} value Timestamp or date.
 * @param {string} separator
 *
 * @returns {string} Formatted date.
 *
 * @example
 *
 * d_format() // '2022-07-03 11:33:44'
 * d_format(1656819176086) // '2022-07-03 11:32:56'
 */
export function d_format(value?: string | number, separator: string = '-'): string {
  if (!value) {
    value = d_time()
  }

  separator = separator.trim()

  // fix ios
  // new Date('2022-12-12') Null
  // new Date('2022/12/12') ok
  if (value && check.str(value)) {
    value = (value as string).replace(/-/g, '/')
  }

  let date = new Date(+new Date(value))

  let Y = date.getFullYear() + separator
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + separator
  let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
  let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
  let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
  let s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())

  return Y + M + D + h + m + s
}

/**
 * Get formatted date.
 *
 * @param {string|number|undefined} value Timestamp or date.
 * @param {string} separator
 *
 * @returns {string} Formatted date, including only the year, month and day.
 *
 * @example
 *
 * d_format_YMD() // '2022-07-03'
 * d_format_YMD(1656819176086) // '2022-07-03'
 */
export function d_format_YMD(value?: string | number, separator: string = '-'): string {
  return d_format(value, separator).split(' ')[0]
}