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
 * Checks if value is a String.
 *
 * @param {Object} value The value to check.
 *
 * @returns {boolean} Return true if value is a String, otherwise false.
 */
export function is_string(value: unknown): boolean {
  return check.str(value)
}

/**
 * Checks if value is a Number.
 *
 * @param {Object} value The value to check.
 *
 * @returns {boolean} Return true if value is a Number, otherwise false.
 */
export function is_number(value: unknown): boolean {
  return check.num(value)
}

/**
 * Checks if value is an integer.
 *
 * @param {Object} value The value to check.
 *
 * @returns {boolean} Return true if value is an Integer, otherwise false.
 */
export function is_integer(value: unknown): boolean {
  return check.num(value) && rint.test(value + '')
}

/**
 * Checks if value is a positive integer.
 *
 * @param {Object} value The value to check.
 *
 * @returns {boolean} Return true if value is a positive integer, otherwise false.
 */
export function is_positive_integer(value: unknown): boolean {
  return check.num(value) && rposInt.test(value + '')
}

/**
 * Checks if value is a float.
 *
 * @param {Object} value The value to check.
 *
 * @returns {boolean} Return true if value is a float, otherwise false.
 */
export function is_float(value: unknown): boolean {
  return check.num(value) && rdecimal.test(value + '')
}

/**
 * Checks if value is a positive float.
 *
 * @param {Object} value The value to check.
 *
 * @returns {boolean} Return true if value is a positive float, otherwise false.
 */
export function is_positive_float(value: unknown): boolean {
  return check.num(value) && rposDecimal.test(value + '')
}

/**
 * Checks if value is a Boolean.
 *
 * @param {Object} value The value to check.
 *
 * @returns {boolean} Return true if value is a Boolean, otherwise false.
 */
export function is_boolean(value: unknown): boolean {
  return check.bool(value)
}

/**
 * Checks if value is an Array.
 *
 * @param {Object} value The value to check.
 *
 * @returns {boolean} Return true if value is an Array, otherwise false.
 */
export function is_array(value: unknown): boolean {
  return check.arr(value)
}

/**
 * Checks if value is an Array like.
 *
 * @param {Object} value The value to check.
 *
 * @returns {boolean} Return true if value is an Array like, otherwise false.
 */
export function is_array_like(value: unknown): boolean {
  return check.arrLike(value)
}

/**
 * Checks if value is an Object.
 *
 * @param {Object} value The value to check.
 *
 * @returns {boolean} Return true if value is an Object, otherwise false.
 */
export function is_object(value: unknown): boolean {
  return check.obj(value)
}

/**
 * Checks if value is an plain Object.
 *
 * @param {Object} value The value to check.
 *
 * @returns {boolean} Return true if value is an plain Object, otherwise false.
 */
export function is_plain_object(value: unknown): boolean {
  return check.plainObj(value)
}

/**
 * Checks if value is an Object like.
 *
 * @param {Object} value The value to check.
 *
 * @returns {boolean} Return true if value is an Object like, otherwise false.
 */
export function is_object_like(value: unknown): boolean {
  return check.objLike(value)
}

/**
 * Checks if value is an Symbol.
 *
 * @param {Object} value The value to check.
 *
 * @returns {boolean} Return true if value is an Symbol, otherwise false.
 */
export function is_symbol(value: unknown): boolean {
  return check.symbol(value)
}

/**
 * Checks if value is an Function.
 *
 * @param {Object} value The value to check.
 *
 * @returns {boolean} Return true if value is an Function, otherwise false.
 */
export function is_function(value: unknown): boolean {
  return check.fun(value)
}

/**
 * Checks if value is NaN.
 *
 * @param {Object} value The value to check.
 *
 * @returns {boolean} Return true if value is NaN, otherwise false.
 */
export function is_NaN(value: unknown): boolean {
  return check.nan(value)
}

/**
 * Checks if value is undefined.
 *
 * @param {Object} value The value to check.
 *
 * @returns {boolean} Return true if value is undefined, otherwise false.
 */
export function is_undefined(value: unknown): boolean {
  return check.undef(value)
}

/**
 * Checks if value is null.
 *
 * @param {Object} value The value to check.
 *
 * @returns {boolean} Return true if value is null, otherwise false.
 */
export function is_null(value: unknown): boolean {
  return check.nul(value)
}

/**
 * Checks if value has length attribute.
 *
 * @param {Object} value The value to check.
 *
 * @returns {boolean} Return true if value has length attribute, otherwise false.
 */
export function is_length(value: unknown): boolean {
  return check.len(value)
}

/**
 * Checks if value is an Arguments.
 *
 * @param {Object} value The value to check.
 *
 * @returns {boolean} Return true if value is an Arguments, otherwise false.
 */
export function is_arguments(value: unknown): boolean {
  return check.args(value)
}

/**
 * Checks if value is an Error.
 *
 * @param {Object} value The value to check.
 *
 * @returns {boolean} Return true if value is an Error, otherwise false.
 */
export function is_error(value: unknown): boolean {
  return check.err(value)
}

/**
 * Checks if value is leap year.
 *
 * @param {Object} value The value to check.
 *
 * @returns {boolean} Return true if value is leap year, otherwise false.
 */
export function is_leap_year(value: number): boolean {
  if (!check.num(value)) {
    return false
  }

  return ((value % 4 === 0) && (value % 100 !== 0)) || (value % 400 === 0)
}

/**
 * Checks if value is email.
 *
 * @param {Object} value The value to check.
 *
 * @returns {boolean} Return true if value is email, otherwise false.
 */
export function is_email(value: unknown): boolean {
  if (!check.str(value)) {
    return false
  }

  return remail.test(value + '')
}

/**
 * Checks if value is url.
 *
 * @param {Object} value The value to check.
 *
 * @returns {boolean} Return true if value is url, otherwise false.
 */
export function is_url(value: unknown): boolean {
  if (!check.str(value)) {
    return false
  }

  return rurl.test(value + '')
}

/**
 * Checks if value is phone number.
 *
 * @param {Object} value The value to check.
 *
 * @returns {boolean} Return true if value is phone number, otherwise false.
 */
export function is_cn_phone_number(value: unknown): boolean {
  return rmobilephone.test(value + '')
}

/**
 * Checks if value is id card.
 *
 * @param {Object} value The value to check.
 *
 * @returns {boolean} Return true if value is id card, otherwise false.
 */
export function is_cn_id_card(value: unknown): boolean {
  return rcnIdCard.test(value + '')
}

/**
 * Checks if value is falsy.
 *
 * @param {Object} value The value to check.
 *
 * @returns {boolean} Return true if value is falsy, otherwise false.
 */
export function is_falsy(value: any): boolean {
  return [false, '', 0, -0, undefined, null, NaN].includes(value)
}