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
export declare function to_string(value: unknown): string;
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
export declare function to_number(value: unknown): number;
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
export declare function to_integer(value: unknown, round?: boolean): number;
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
export declare function to_float(value: unknown, decimal?: 1 | 2, round?: boolean): number;
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
export declare function to_cn_cent(value: unknown, round?: boolean, reverse?: boolean, decimal?: 0 | 1 | 2): number | string;
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
export declare function to_boolean(value: unknown): boolean;
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
export declare function to_array(value: unknown): any[];
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
export declare function to_symbol(value: unknown): Symbol;
/**
 * Convert value to undefined
 *
 * @param {unknown} value The value to convert
 *
 * @returns {undefined} Converted value
 */
export declare function to_undefined(value?: unknown): undefined;
/**
 * Convert value to null
 *
 * @param {unknown} value The value to convert
 *
 * @returns {null} Converted value
 */
export declare function to_null(value?: unknown): null;
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
export declare function to_cn_pinyin(value: unknown): string[];
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
export declare function to_original(value: unknown): any;
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
export declare function to_title(value: string): string;
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
export declare function to_percentage(value: unknown, decimal?: number, keepSuffix?: boolean): string;
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
export declare function to_thousands(value: unknown): string;
