import dayjs from 'dayjs'
import { UnitType } from 'dayjs'

import Check from '../helper/check'

const check = new Check()

// fix ios
// new Date('2022-12-12') Null
// new Date('2022/12/12') ok
function fixIos(value: string | number) {
  if (value && check.str(value)) {
    return (value as string).replace(/-/g, '/')
  }

  return value
}

export const d_day = dayjs

/**
 * Get timestamp
 *
 * @param {string|number|undefined} value Timestamp or date
 *
 * @returns {number} Timestamp
 *
 * @example
 *
 * d_time() // 1656819176086
 */
export function d_time(value?: string | number): number {
  if (!value) return +Date.now()

  value = fixIos(value)

  return +new Date(value)
}

/**
 * Get timestamp
 *
 * @param {string|number|undefined} value Timestamp or date
 *
 * @returns {number} Timestamp
 *
 * @example
 *
 * d_time() // 1656819176086
 */
export function d_timestamp(value?: string | number): number {
  return d_time(value)
}

/**
 * Get formatted date
 *
 * @param {string|number|undefined} value Timestamp or date
 * @param {string} separator
 *
 * @returns {string} Formatted date
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

  value = fixIos(value)

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
 * Get formatted date
 *
 * @param {string|number|undefined} value Timestamp or date
 * @param {string} separator
 *
 * @returns {string} Formatted date, including only the year, month and day
 *
 * @example
 *
 * d_format_YMD() // '2022-07-03'
 * d_format_YMD(1656819176086) // '2022-07-03'
 */
export function d_format_YMD(value?: string | number, separator: string = '-'): string {
  return d_format(value, separator).split(' ')[0]
}

/**
 * Get the difference between two dates
 *
 * see: https://dayjs.fenxianglu.cn/category/display.html#%E6%97%A5%E5%8E%86%E6%97%B6%E9%97%B4
 *
 * @param {string|number} value1 Timestamp or date
 * @param {string|number} value2 Timestamp or date
 * @param {UnitType} unit The specified unit
 *
 * @returns {string} Formatted date, including only the year, month and day
 *
 * @example
 *
 * d_diff('2022-07-10', '2022-07-03') // 7
 */
export function d_diff(value1: string | number, value2: string | number, unit: UnitType = 'day') {
  const date1 = dayjs(value1)

  return date1.diff(value2, unit)
}

/**
 * Get the dates in month
 *
 * @param {string|number} value Timestamp or date
 * @param {UnitType} formatter Value formatter, same as dayjs formatter
 *
 * @returns {string} Formatted dates in month
 *
 * @example
 *
 * d_dates_in_month() // ['2023-03-01T16:50:26+08:00', '2023-03-02T16:50:26+08:00', '2023-03-03T16:50:26+08:00', '2023-03-04T16:50:26+08:00', ..., '2023-03-31T16:51:15+08:00']
 */
export function d_dates_in_month(value?: string | number, formatter?: string) {
  const days = dayjs(value).daysInMonth()
  const dates: string[] = []
  let i = 1

  while (i <= days) {
    dates.push(dayjs(value).date(i).format(formatter))

    i++
  }

  return dates
}