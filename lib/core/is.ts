import dayjs from 'dayjs'

import Check from '../helper/check'

const check = new Check()

const rint = /^-?\d+$/

const rposInt = /^\d+$/

const rdecimal = /^(-?\d+)([.]\d+){1}$/

const rposDecimal = /^\d+([.]\d+){1}$/

const rmobilephone = /^1[3456789][0-9]{9}$/

const remail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/

const rurl = /^(?=^.{3,255}$)(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/\w+\.\w+)*([\?&]\w+=\w*)*$/

const rcnIdCard = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/

/**
 * Checks if value is a string
 *
 * @param {unknown} value The value to check
 *
 * @returns {boolean} Return true if value is a string, otherwise false
 */
export function is_string(value: unknown): boolean {
  return check.str(value)
}

/**
 * Checks if value is a number
 *
 * @param {unknown} value The value to check
 *
 * @returns {boolean} Return true if value is a number, otherwise false
 */
export function is_number(value: unknown): boolean {
  return check.num(value)
}

/**
 * Checks if value is an integer
 *
 * @param {unknown} value The value to check
 *
 * @returns {boolean} Return true if value is an integer, otherwise false
 */
export function is_integer(value: unknown): boolean {
  return check.num(value) && rint.test(value + '')
}

/**
 * Checks if value is a positive integer
 *
 * @param {unknown} value The value to check
 *
 * @returns {boolean} Return true if value is a positive integer, otherwise false
 */
export function is_positive_integer(value: unknown): boolean {
  return check.num(value) && rposInt.test(value + '')
}

/**
 * Checks if value is a float
 *
 * @param {unknown} value The value to check
 *
 * @returns {boolean} Return true if value is a float, otherwise false
 */
export function is_float(value: unknown): boolean {
  return check.num(value) && rdecimal.test(value + '')
}

/**
 * Checks if value is a positive float
 *
 * @param {unknown} value The value to check
 *
 * @returns {boolean} Return true if value is a positive float, otherwise false
 */
export function is_positive_float(value: unknown): boolean {
  return check.num(value) && rposDecimal.test(value + '')
}

/**
 * Checks if value is a boolean
 *
 * @param {unknown} value The value to check
 *
 * @returns {boolean} Return true if value is a boolean, otherwise false
 */
export function is_boolean(value: unknown): boolean {
  return check.bool(value)
}

/**
 * Checks if value is an array
 *
 * @param {unknown} value The value to check
 *
 * @returns {boolean} Return true if value is an array, otherwise false
 */
export function is_array(value: unknown): boolean {
  return check.arr(value)
}

/**
 * Checks if value is an array-like
 *
 * @param {unknown} value The value to check
 *
 * @returns {boolean} Return true if value is an array-like, otherwise false
 */
export function is_array_like(value: unknown): boolean {
  return check.arrLike(value)
}

/**
 * Checks if value is an object
 *
 * @param {unknown} value The value to check
 *
 * @returns {boolean} Return true if value is an object, otherwise false
 */
export function is_object(value: unknown): boolean {
  return check.obj(value)
}

/**
 * Checks if value is an plain object
 *
 * @param {unknown} value The value to check
 *
 * @returns {boolean} Return true if value is an plain object, otherwise false
 */
export function is_plain_object(value: unknown): boolean {
  return check.plainObj(value)
}

/**
 * Checks if value is an object-like
 *
 * @param {unknown} value The value to check
 *
 * @returns {boolean} Return true if value is an object-like, otherwise false
 */
export function is_object_like(value: unknown): boolean {
  return check.objLike(value)
}

/**
 * Checks if value is a symbol
 *
 * @param {unknown} value The value to check
 *
 * @returns {boolean} Return true if value is a symbol, otherwise false
 */
export function is_symbol(value: unknown): boolean {
  return check.symbol(value)
}

/**
 * Checks if value is a function
 *
 * @param {unknown} value The value to check
 *
 * @returns {boolean} Return true if value is a function, otherwise false
 */
export function is_function(value: unknown): boolean {
  return check.fun(value)
}

/**
 * Checks if value is NaN
 *
 * @param {unknown} value The value to check
 *
 * @returns {boolean} Return true if value is NaN, otherwise false
 */
export function is_NaN(value: unknown): boolean {
  return check.nan(value)
}

/**
 * Checks if value is undefined
 *
 * @param {unknown} value The value to check
 *
 * @returns {boolean} Return true if value is undefined, otherwise false
 */
export function is_undefined(value: unknown): boolean {
  return check.undef(value)
}

/**
 * Checks if value is null
 *
 * @param {unknown} value The value to check
 *
 * @returns {boolean} Return true if value is null, otherwise false
 */
export function is_null(value: unknown): boolean {
  return check.nul(value)
}

/**
 * Checks if value has length attribute
 *
 * @param {unknown} value The value to check
 *
 * @returns {boolean} Return true if value has length attribute, otherwise false
 */
export function is_length(value: unknown): boolean {
  return check.len(value)
}

/**
 * Checks if value is an arguments
 *
 * @param {unknown} value The value to check
 *
 * @returns {boolean} Return true if value is an arguments, otherwise false
 */
export function is_arguments(value: unknown): boolean {
  return check.args(value)
}

/**
 * Checks if value is an error
 *
 * @param {unknown} value The value to check
 *
 * @returns {boolean} Return true if value is an error, otherwise false
 */
export function is_error(value: unknown): boolean {
  return check.err(value)
}

/**
 * Checks if value is leap year
 *
 * @param {number} value The value to check
 *
 * @returns {boolean} Return true if value is leap year, otherwise false
 */
export function is_leap_year(value: number): boolean {
  if (!check.num(value)) {
    return false
  }

  return ((value % 4 === 0) && (value % 100 !== 0)) || (value % 400 === 0)
}

/**
 * Checks if value is email
 *
 * @param {unknown} value The value to check
 *
 * @returns {boolean} Return true if value is email, otherwise false
 */
export function is_email(value: unknown): boolean {
  if (!check.str(value)) {
    return false
  }

  return remail.test(value + '')
}

/**
 * Checks if value is url
 *
 * @param {unknown} value The value to check
 *
 * @returns {boolean} Return true if value is url, otherwise false
 */
export function is_url(value: unknown): boolean {
  if (!check.str(value)) {
    return false
  }

  return rurl.test(value + '')
}

/**
 * Checks if value is phone number
 *
 * @param {unknown} value The value to check
 *
 * @returns {boolean} Return true if value is phone number, otherwise false
 */
export function is_cn_phone_number(value: unknown): boolean {
  return rmobilephone.test(value + '')
}

/**
 * Checks if value is id card
 *
 * @param {unknown} value The value to check
 *
 * @returns {boolean} Return true if value is id card, otherwise false
 */
export function is_cn_id_card(value: unknown): boolean {
  return rcnIdCard.test(value + '')
}

/**
 * Checks if value is falsy
 *
 * @param {any} value The value to check
 *
 * @returns {boolean} Return true if value is falsy, otherwise false
 */
export function is_falsy(value: any): boolean {
  return [false, '', 0, -0, undefined, null, NaN].includes(value)
}

/**
 * Checks if date is today
 *
 * @param {string|number} value The date to check
 *
 * @returns {boolean} Return true if date is today, otherwise false
 */
export function is_today(value?: string | number): boolean {
  try {
    return dayjs().format('YYYY-MM-DD') === dayjs(value).format('YYYY-MM-DD')
  } catch (error) {
    return false
  }
}

/**
 * Checks if date is before today
 *
 * @param {string|number} value The date to check
 *
 * @returns {boolean} Return true if date is before today, otherwise false
 */
export function is_today_before(value?: string | number): boolean {
  try {
    return dayjs(dayjs(value).format('YYYY-MM-DD')).diff(dayjs().format('YYYY-MM-DD'), 'day') < 0
  } catch (error) {
    return false
  }
}

/**
 * Checks if date is after today
 *
 * @param {string|number} value The date to check
 *
 * @returns {boolean} Return true if date is after today, otherwise false
 */
export function is_today_after(value?: string | number): boolean {
  try {
    return dayjs(dayjs(value).format('YYYY-MM-DD')).diff(dayjs().format('YYYY-MM-DD'), 'day') > 0
  } catch (error) {
    return false
  }
}

/**
 * Checks if value1 equal value2
 *
 * @param {any} value1 The value to check
 * @param {any} value2 The value to check
 * @param {boolean} strict Use strict mode for value comparison
 *
 * @returns {boolean} Return true if value1 equal value2, otherwise false
 */
export function is_equal(value1?: any, value2?: any, strict: boolean = true) {
  let isEqual = true

  const equal = (val1: any, val2: any) => {
    if (!isEqual) return

    if (check.arr(val1) && check.arr(val2)) {
      if (val1.length !== val2.length) {
        isEqual = false
        return
      }

      for (let i = 0; i < val1.length; i++) {
        equal(val1[i], val2[i])
      }
    } else if (check.plainObj(val1) && check.plainObj(val2)) {
      const keys1 = Object.keys(val1)
      const keys2 = Object.keys(val2)

      if (keys1.length !== keys2.length) {
        isEqual = false
        return
      }

      for (let i = 0; i < keys1.length; i++) {
        if (!Object.prototype.hasOwnProperty.call(val2, keys1[i])) {
          isEqual = false
          return
        }

        equal(val1[keys1[i]], val2[keys1[i]])
      }
    } else {
      isEqual = strict ? val1 === val2 : val1 == val2
    }
  }

  equal(value1, value2)

  return isEqual
}