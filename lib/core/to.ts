import Cast from '../helper/cast'
import makePy from '../helper/local/chinese2py'
import { accMul } from '../helper/calc'
import Check from '../helper/check'

const cast = new Cast()

const check = new Check()

/**
 * Convert value to string
 *
 * @param {Object} value The value to convert
 *
 * @returns {string} Converted value
 *
 * @example
 *
 * to_string(1) // '1'
 * to_string([1, 2, 3]) // '1,2,3'
 */
export function to_string(value: unknown): string {
  return cast.str(value)
}

/**
 * Convert value to number
 *
 * @param {Object} value The value to convert
 *
 * @returns {number} Converted value
 *
 * @example
 *
 * to_number('1') // 1
 * to_number('a') // 0
 * to_number('true') // 1
 * to_number(false) // 0
 * to_number([1]) // 0
 */
export function to_number(value: unknown): number {
  return cast.num(value)
}

/**
 * Convert value to integer
 *
 * @param {Object} value The value to convert
 * @param {boolean} round Use Math.round?
 *
 * @returns {number} Converted value
 *
 * @example
 *
 * to_integer(1.5) // 1
 * to_integer(1.5, true) // 2
 */
export function to_integer(value: unknown, round: boolean = false): number {
  let newValue = cast.num(value)

  return !round ? parseInt(newValue + '') : Math.round(newValue)
}

/**
 * Convert value to float
 *
 * @param {Object} value The value to convert
 * @param {1|2} decimal One or two decimal reserved
 * @param {boolean} round Use Math.round?
 *
 * @returns {number} Converted value
 *
 * @example
 *
 * to_float(1.567) // 1.56
 * to_float(1.567, 1) // 1.5
 * to_float(1.567, 2) // 1.56
 * to_float(1.567, 2, true) // 1.57
 */
export function to_float(value: unknown, decimal: 1 | 2 = 2, round: boolean = false): number {
  let newValue = cast.num(value)

  if (round) {
    return +(+newValue).toFixed(decimal)
  }

  if (decimal > 2) decimal = 2
  if (decimal < 1) decimal = 1

  let strValue = newValue + ''
  let index = strValue.indexOf('.')
  if (index > -1) {
    strValue = strValue.substring(0, decimal + index + 1)
  } else {
    strValue += (decimal === 2 ? '.00' : '.0')
  }

  return +strValue
}

/**
 * Convert value to cent
 *
 * Usual, store `price` field (use `cent`) to database
 *
 * Only for RMB!
 *
 * @param {Object} value The value to convert
 * @param {boolean} round Use Math.round?
 * @param {boolean} reverse Cent to yuan
 * @param {0|1|2} decimal Decimal reserved
 *
 * @returns {number|string} Converted value
 *
 * @example
 *
 * to_cn_cent(1.567) // 156
 * to_cn_cent(1.567, true) // 157
 * to_cn_cent(156, false, true) // '1.56'
 * to_cn_cent(156, false, true, 2) // '1.56'
 * to_cn_cent(156, false, true, 1) // '1.6'
 * to_cn_cent(156, false, true, 0) // 1.56
 */
export function to_cn_cent(value: unknown, round: boolean = false, reverse: boolean = false, decimal: 0 | 1 | 2 = 2): number | string {
  let newValue

  if (!reverse) {
    newValue = +to_float(value, 2, round) || 0

    return parseInt(accMul(newValue, 100) + '') || 0
  }

  newValue = to_integer(value)

  const yuan = newValue / 100

  return !decimal ? yuan : yuan.toFixed(decimal)
}

/**
 * Convert value to boolean
 *
 * @param {Object} value The value to convert
 *
 * @returns {boolean} Converted value
 *
 * @example
 *
 * to_boolean('1') // true
 */
export function to_boolean(value: unknown): boolean {
  return cast.bool(value)
}

/**
 * Convert value to array
 *
 * @param {Object} value The value to convert
 *
 * @returns {any[]} Converted value
 *
 * @example
 *
 * to_array(0) // [0]
 * to_array('1, 2, 3') // ['1', ' 2', ' 3']
 *
 */
export function to_array(value: unknown): any[] {
  return cast.arr(value)
}

/**
 * Convert value to symbol
 *
 * @param {Object} value The value to convert
 *
 * @returns {Symbol} Converted value
 *
 * @example
 *
 * to_symbol(0) //Symbol(0)
 */
export function to_symbol(value: unknown): Symbol {
  return cast.symbol(value)
}

/**
 * Convert value to undefined
 *
 * @param {Object} value The value to convert
 *
 * @returns {undefined} Converted value
 */
export function to_undefined(value?: unknown): undefined {
  return cast.undef()
}

/**
 * Convert value to null
 *
 * @param {Object} value The value to convert
 *
 * @returns {null} Converted value
 */
export function to_null(value?: unknown): null {
  return cast.nul()
}

/**
 * Convert value to pinyin
 *
 * Only for cn
 *
 * @param {Object} value The value to convert
 *
 * @returns {string[]} Converted value
 */
export function to_cn_pinyin(value: unknown): string[] {
  let newValue = cast.str(value)

  return makePy(newValue) || []
}

/**
 * Convert value to original value
 *
 * @param {Object} value The value to convert
 *
 * @returns {string[]} Converted value
 */
export function to_original(value: unknown): any {
  return cast.unwrap(value)
}

/**
 * Capitalize the first letter of value
 *
 * @param {string} value The value to capitalize
 *
 * @returns {string} Capitalized value
 */
export function to_title(value: string): string {
  if (!value) return ''

  const val = cast.str(value).toLocaleLowerCase()

  if (!val.length) return ''

  return `${val[0].toLocaleUpperCase()}${val.slice(1)}`
}