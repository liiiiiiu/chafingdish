/**
 * Checks if value is a String.
 *
 * @param {Object} value The value to check.
 *
 * @returns {boolean} Return true if value is a String, otherwise false.
 */
export declare function is_string(value: unknown): boolean;
/**
 * Checks if value is a Number.
 *
 * @param {Object} value The value to check.
 *
 * @returns {boolean} Return true if value is a Number, otherwise false.
 */
export declare function is_number(value: unknown): boolean;
/**
 * Checks if value is an integer.
 *
 * @param {Object} value The value to check.
 *
 * @returns {boolean} Return true if value is an Integer, otherwise false.
 */
export declare function is_integer(value: unknown): boolean;
/**
 * Checks if value is a positive integer.
 *
 * @param {Object} value The value to check.
 *
 * @returns {boolean} Return true if value is a positive integer, otherwise false.
 */
export declare function is_positive_integer(value: unknown): boolean;
/**
 * Checks if value is a float.
 *
 * @param {Object} value The value to check.
 *
 * @returns {boolean} Return true if value is a float, otherwise false.
 */
export declare function is_float(value: unknown): boolean;
/**
 * Checks if value is a positive float.
 *
 * @param {Object} value The value to check.
 *
 * @returns {boolean} Return true if value is a positive float, otherwise false.
 */
export declare function is_positive_float(value: unknown): boolean;
/**
 * Checks if value is a Boolean.
 *
 * @param {Object} value The value to check.
 *
 * @returns {boolean} Return true if value is a Boolean, otherwise false.
 */
export declare function is_boolean(value: unknown): boolean;
/**
 * Checks if value is an Array.
 *
 * @param {Object} value The value to check.
 *
 * @returns {boolean} Return true if value is an Array, otherwise false.
 */
export declare function is_array(value: unknown): boolean;
/**
 * Checks if value is an Array like.
 *
 * @param {Object} value The value to check.
 *
 * @returns {boolean} Return true if value is an Array like, otherwise false.
 */
export declare function is_array_like(value: unknown): boolean;
/**
 * Checks if value is an Object.
 *
 * @param {Object} value The value to check.
 *
 * @returns {boolean} Return true if value is an Object, otherwise false.
 */
export declare function is_object(value: unknown): boolean;
/**
 * Checks if value is an plain Object.
 *
 * @param {Object} value The value to check.
 *
 * @returns {boolean} Return true if value is an plain Object, otherwise false.
 */
export declare function is_plain_object(value: unknown): boolean;
/**
 * Checks if value is an Object like.
 *
 * @param {Object} value The value to check.
 *
 * @returns {boolean} Return true if value is an Object like, otherwise false.
 */
export declare function is_object_like(value: unknown): boolean;
/**
 * Checks if value is an Symbol.
 *
 * @param {Object} value The value to check.
 *
 * @returns {boolean} Return true if value is an Symbol, otherwise false.
 */
export declare function is_symbol(value: unknown): boolean;
/**
 * Checks if value is an Function.
 *
 * @param {Object} value The value to check.
 *
 * @returns {boolean} Return true if value is an Function, otherwise false.
 */
export declare function is_function(value: unknown): boolean;
/**
 * Checks if value is NaN.
 *
 * @param {Object} value The value to check.
 *
 * @returns {boolean} Return true if value is NaN, otherwise false.
 */
export declare function is_NaN(value: unknown): boolean;
/**
 * Checks if value is undefined.
 *
 * @param {Object} value The value to check.
 *
 * @returns {boolean} Return true if value is undefined, otherwise false.
 */
export declare function is_undefined(value: unknown): boolean;
/**
 * Checks if value is null.
 *
 * @param {Object} value The value to check.
 *
 * @returns {boolean} Return true if value is null, otherwise false.
 */
export declare function is_null(value: unknown): boolean;
/**
 * Checks if value has length attribute.
 *
 * @param {Object} value The value to check.
 *
 * @returns {boolean} Return true if value has length attribute, otherwise false.
 */
export declare function is_length(value: unknown): boolean;
/**
 * Checks if value is an Arguments.
 *
 * @param {Object} value The value to check.
 *
 * @returns {boolean} Return true if value is an Arguments, otherwise false.
 */
export declare function is_arguments(value: unknown): boolean;
/**
 * Checks if value is an Error.
 *
 * @param {Object} value The value to check.
 *
 * @returns {boolean} Return true if value is an Error, otherwise false.
 */
export declare function is_error(value: unknown): boolean;
/**
 * Checks if value is leap year.
 *
 * @param {Object} value The value to check.
 *
 * @returns {boolean} Return true if value is leap year, otherwise false.
 */
export declare function is_leap_year(value: number): boolean;
/**
 * Checks if value is email.
 *
 * @param {Object} value The value to check.
 *
 * @returns {boolean} Return true if value is email, otherwise false.
 */
export declare function is_email(value: unknown): boolean;
/**
 * Checks if value is url.
 *
 * @param {Object} value The value to check.
 *
 * @returns {boolean} Return true if value is url, otherwise false.
 */
export declare function is_url(value: unknown): boolean;
/**
 * Checks if value is phone number.
 *
 * @param {Object} value The value to check.
 *
 * @returns {boolean} Return true if value is phone number, otherwise false.
 */
export declare function is_cn_phone_number(value: unknown): boolean;
/**
 * Checks if value is id card.
 *
 * @param {Object} value The value to check.
 *
 * @returns {boolean} Return true if value is id card, otherwise false.
 */
export declare function is_cn_id_card(value: unknown): boolean;
/**
 * Checks if value is falsy.
 *
 * @param {Object} value The value to check.
 *
 * @returns {boolean} Return true if value is falsy, otherwise false.
 */
export declare function is_falsy(value: any): boolean;
/**
 * Checks if date is today.
 *
 * @param {Object} value The date to check.
 *
 * @returns {boolean} Return true if date is today, otherwise false.
 */
export declare function is_today(value?: string | number): boolean;
/**
 * Checks if date is before today.
 *
 * @param {Object} value The date to check.
 *
 * @returns {boolean} Return true if date is before today, otherwise false.
 */
export declare function is_today_before(value?: string | number): boolean;
/**
 * Checks if date is after today.
 *
 * @param {Object} value The date to check.
 *
 * @returns {boolean} Return true if date is after today, otherwise false.
 */
export declare function is_today_after(value?: string | number): boolean;
