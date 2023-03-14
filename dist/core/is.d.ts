/**
 * Checks if value is a string
 *
 * @param {unknown} value The value to check
 *
 * @returns {boolean} Return true if value is a string, otherwise false
 */
export declare function is_string(value: unknown): boolean;
/**
 * Checks if value is a number
 *
 * @param {unknown} value The value to check
 *
 * @returns {boolean} Return true if value is a number, otherwise false
 */
export declare function is_number(value: unknown): boolean;
/**
 * Checks if value is an integer
 *
 * @param {unknown} value The value to check
 *
 * @returns {boolean} Return true if value is an integer, otherwise false
 */
export declare function is_integer(value: unknown): boolean;
/**
 * Checks if value is a positive integer
 *
 * @param {unknown} value The value to check
 *
 * @returns {boolean} Return true if value is a positive integer, otherwise false
 */
export declare function is_positive_integer(value: unknown): boolean;
/**
 * Checks if value is a float
 *
 * @param {unknown} value The value to check
 *
 * @returns {boolean} Return true if value is a float, otherwise false
 */
export declare function is_float(value: unknown): boolean;
/**
 * Checks if value is a positive float
 *
 * @param {unknown} value The value to check
 *
 * @returns {boolean} Return true if value is a positive float, otherwise false
 */
export declare function is_positive_float(value: unknown): boolean;
/**
 * Checks if value is a boolean
 *
 * @param {unknown} value The value to check
 *
 * @returns {boolean} Return true if value is a boolean, otherwise false
 */
export declare function is_boolean(value: unknown): boolean;
/**
 * Checks if value is an array
 *
 * @param {unknown} value The value to check
 *
 * @returns {boolean} Return true if value is an array, otherwise false
 */
export declare function is_array(value: unknown): boolean;
/**
 * Checks if value is an array-like
 *
 * @param {unknown} value The value to check
 *
 * @returns {boolean} Return true if value is an array-like, otherwise false
 */
export declare function is_array_like(value: unknown): boolean;
/**
 * Checks if value is an object
 *
 * @param {unknown} value The value to check
 *
 * @returns {boolean} Return true if value is an object, otherwise false
 */
export declare function is_object(value: unknown): boolean;
/**
 * Checks if value is an plain object
 *
 * @param {unknown} value The value to check
 *
 * @returns {boolean} Return true if value is an plain object, otherwise false
 */
export declare function is_plain_object(value: unknown): boolean;
/**
 * Checks if value is an object-like
 *
 * @param {unknown} value The value to check
 *
 * @returns {boolean} Return true if value is an object-like, otherwise false
 */
export declare function is_object_like(value: unknown): boolean;
/**
 * Checks if value is a symbol
 *
 * @param {unknown} value The value to check
 *
 * @returns {boolean} Return true if value is a symbol, otherwise false
 */
export declare function is_symbol(value: unknown): boolean;
/**
 * Checks if value is a function
 *
 * @param {unknown} value The value to check
 *
 * @returns {boolean} Return true if value is a function, otherwise false
 */
export declare function is_function(value: unknown): boolean;
/**
 * Checks if value is NaN
 *
 * @param {unknown} value The value to check
 *
 * @returns {boolean} Return true if value is NaN, otherwise false
 */
export declare function is_NaN(value: unknown): boolean;
/**
 * Checks if value is undefined
 *
 * @param {unknown} value The value to check
 *
 * @returns {boolean} Return true if value is undefined, otherwise false
 */
export declare function is_undefined(value: unknown): boolean;
/**
 * Checks if value is null
 *
 * @param {unknown} value The value to check
 *
 * @returns {boolean} Return true if value is null, otherwise false
 */
export declare function is_null(value: unknown): boolean;
/**
 * Checks if value has length attribute
 *
 * @param {unknown} value The value to check
 *
 * @returns {boolean} Return true if value has length attribute, otherwise false
 */
export declare function is_length(value: unknown): boolean;
/**
 * Checks if value is an arguments
 *
 * @param {unknown} value The value to check
 *
 * @returns {boolean} Return true if value is an arguments, otherwise false
 */
export declare function is_arguments(value: unknown): boolean;
/**
 * Checks if value is an error
 *
 * @param {unknown} value The value to check
 *
 * @returns {boolean} Return true if value is an error, otherwise false
 */
export declare function is_error(value: unknown): boolean;
/**
 * Checks if value is leap year
 *
 * @param {number} value The value to check
 *
 * @returns {boolean} Return true if value is leap year, otherwise false
 */
export declare function is_leap_year(value: number): boolean;
/**
 * Checks if value is email
 *
 * @param {unknown} value The value to check
 *
 * @returns {boolean} Return true if value is email, otherwise false
 */
export declare function is_email(value: unknown): boolean;
/**
 * Checks if value is url
 *
 * @param {unknown} value The value to check
 *
 * @returns {boolean} Return true if value is url, otherwise false
 */
export declare function is_url(value: unknown): boolean;
/**
 * Checks if value is phone number
 *
 * @param {unknown} value The value to check
 *
 * @returns {boolean} Return true if value is phone number, otherwise false
 */
export declare function is_cn_phone_number(value: unknown): boolean;
/**
 * Checks if value is id card
 *
 * @param {unknown} value The value to check
 *
 * @returns {boolean} Return true if value is id card, otherwise false
 */
export declare function is_cn_id_card(value: unknown): boolean;
/**
 * Checks if value is falsy
 *
 * @param {any} value The value to check
 *
 * @returns {boolean} Return true if value is falsy, otherwise false
 */
export declare function is_falsy(value: any): boolean;
/**
 * Checks if date is today
 *
 * @param {string|number} value The date to check
 *
 * @returns {boolean} Return true if date is today, otherwise false
 */
export declare function is_today(value?: string | number): boolean;
/**
 * Checks if date is before today
 *
 * @param {string|number} value The date to check
 *
 * @returns {boolean} Return true if date is before today, otherwise false
 */
export declare function is_today_before(value?: string | number): boolean;
/**
 * Checks if date is after today
 *
 * @param {string|number} value The date to check
 *
 * @returns {boolean} Return true if date is after today, otherwise false
 */
export declare function is_today_after(value?: string | number): boolean;
/**
 * Checks if value1 equal value2
 *
 * @param {any} value1 The value to check
 * @param {any} value2 The value to check
 * @param {boolean} strict Use strict mode for value comparison
 *
 * @returns {boolean} Return true if value1 equal value2, otherwise false
 */
export declare function is_equal(value1?: any, value2?: any, strict?: boolean): boolean;
