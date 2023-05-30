import Cast from '../helper/cast'
import makePy from '../helper/local/chinese2py'
import { accMul } from '../helper/calc'
import Check from '../helper/check'

const cast = new Cast()

const check = new Check()

/**
 * Convert value to string
 *
 * @param {unknown} value The value to convert
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
 * @param {unknown} value The value to convert
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
 * @param {unknown} value The value to convert
 * @param {boolean} round Use Math.round? default is `false`
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
 * @param {unknown} value The value to convert
 * @param {number} decimal One or two decimal reserved, default is `2`
 * @param {boolean} round Use Math.round? default is `false`
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
 * @param {unknown} value The value to convert
 * @param {boolean} round Use Math.round? default is `false`
 * @param {boolean} reverse Cent to yuan, default is `false`
 * @param {number} decimal Decimal reserved, default is `2`
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
 * @param {unknown} value The value to convert
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
 * @param {unknown} value The value to convert
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
 * @param {unknown} value The value to convert
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
 * @param {unknown} value The value to convert
 *
 * @returns {undefined} Converted value
 */
export function to_undefined(value?: unknown): undefined {
  return cast.undef()
}

/**
 * Convert value to null
 *
 * @param {unknown} value The value to convert
 *
 * @returns {null} Converted value
 */
export function to_null(value?: unknown): null {
  return cast.nul()
}

/**
 * Convert value to pinyin
 *
 * @param {unknown} value The value to convert
 *
 * @returns {string[]} Converted value
 *
 * @example
 *
 * to_cn_pinyin('你好') // ['NH']
 */
export function to_cn_pinyin(value: unknown): string[] {
  let newValue = cast.str(value)

  return makePy(newValue) || []
}

/**
 * Convert value to original value
 *
 * @param {unknown} value The value to convert
 *
 * @returns {string[]} Converted value
 *
 * @example
 *
 * to_original('1') // 1
 * to_original('true') // true
 * to_original('null') // null
 * to_original('[{ "id": 1, "age": 12 }]') // [{ "id": 1, "age": 12 }]
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
 *
 * @example
 *
 * to_title('welcome') // 'Welcome'
 */
export function to_title(value: string): string {
  if (!value) return ''

  const val = cast.str(value).toLocaleLowerCase()

  if (!val.length) return ''

  return `${val[0].toLocaleUpperCase()}${val.slice(1)}`
}

/**
 * Convert value to percentage
 *
 * @param {unknown} value The value to convert
 * @param {number} decimal Decimal reserved, default is `0`
 * @param {boolean} keepSuffix Use '%', default is `false`
 *
 * @returns {string} Converted value
 *
 * @example
 *
 * to_percentage(0.1) // 10%
 * to_percentage(0.1, 1) // 10.0%
 * to_percentage(-0.1) // -10%
 * to_percentage('0.01', 3) // 1.000%
 * to_percentage(0, 0, false) // 0
 */
export function to_percentage(value: unknown, decimal: number = 0, keepSuffix: boolean = true): string {
  const newValue = +cast.num(value)
  decimal = Math.abs(cast.num(decimal))

  return `${(accMul(newValue, 100)).toFixed(decimal)}${keepSuffix ? '%' : ''}`
}

/**
 * Thousands format
 *
 * @param {unknown} value The value to format
 *
 * @returns {string} Formatted value
 *
 * @example
 *
 * to_thousands(1234567) // 1,234,567
 * to_thousands(12345.67) // 12,345.67
 * to_thousands(-12.34567) // -12.34567
 * to_thousands(-123456.7) // -123,456.7
 * to_thousands(0) // 0
 */
export function to_thousands(value: unknown): string {
  let newValue = +cast.num(value)
  let isNegative = false

  if (!newValue) return '0'

  if (newValue < 0) {
    newValue = Math.abs(newValue)
    isNegative = true
  }

  // 兼容小数
  const newValueStr = newValue.toString()
  const values = newValueStr.split('.')
  const integerPart = values[0]
  const decimalPart = newValueStr.slice(integerPart.length)

  let result = ''
  let counter = 0
  let i = integerPart.length - 1

  for (; i >= 0; i--) {
    counter++
    result = `${integerPart.charAt(i)}${result}`

    if (!(counter % 3) && i !== 0) {
      result = `,${result}`
    }
  }

  return `${!isNegative ? '' : '-'}${result}${decimalPart}`
}