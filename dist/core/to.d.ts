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
export declare function to_string(value: unknown): string;
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
export declare function to_number(value: unknown): number;
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
export declare function to_integer(value: unknown, round?: boolean): number;
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
export declare function to_float(value: unknown, decimal?: 1 | 2, round?: boolean): number;
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
export declare function to_cn_cent(value: unknown, round?: boolean, reverse?: boolean, decimal?: 0 | 1 | 2): number | string;
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
export declare function to_boolean(value: unknown): boolean;
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
export declare function to_array(value: unknown): any[];
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
export declare function to_symbol(value: unknown): Symbol;
/**
 * Convert value to undefined
 *
 * @param {Object} value The value to convert
 *
 * @returns {undefined} Converted value
 */
export declare function to_undefined(value?: unknown): undefined;
/**
 * Convert value to null
 *
 * @param {Object} value The value to convert
 *
 * @returns {null} Converted value
 */
export declare function to_null(value?: unknown): null;
/**
 * Convert value to pinyin
 *
 * Only for cn
 *
 * @param {Object} value The value to convert
 *
 * @returns {string[]} Converted value
 */
export declare function to_cn_pinyin(value: unknown): string[];
/**
 * Convert value to original value
 *
 * @param {Object} value The value to convert
 *
 * @returns {string[]} Converted value
 */
export declare function to_original(value: unknown): any;
