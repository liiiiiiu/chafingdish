/**
 * Get now timestamp.
 *
 * @returns {number} Timestamp.
 *
 * @example
 *
 * d_time() // 1656819176086
 */
export declare function d_time(): number;
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
export declare function d_format(value?: string | number, separator?: string): string;
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
export declare function d_format_YMD(value?: string | number, separator?: string): string;
