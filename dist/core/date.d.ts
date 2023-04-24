import dayjs from 'dayjs';
import { UnitType } from 'dayjs';
export declare const d_day: typeof dayjs;
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
export declare function d_time(value?: string | number): number;
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
export declare function d_timestamp(value?: string | number): number;
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
export declare function d_format(value?: string | number, separator?: string): string;
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
export declare function d_format_YMD(value?: string | number, separator?: string): string;
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
export declare function d_diff(value1: string | number, value2: string | number, unit?: UnitType): number;
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
export declare function d_dates_in_month(value?: string | number, formatter?: string): string[];
/**
 * Get the countdown value
 *
 * @param {number} value Countdown time, in seconds
 *
 * @returns {object} Countdown object, { days: number, hours: number, minutes: number, seconds: number }
 *
 * @example
 *
 * d_countdown(60) // { days: 0, hours: 0, minutes: 1, seconds: 0 }
 * d_countdown(60 * 60 * 24) // { days: 1, hours: 0, minutes: 0, seconds: 0 }
 * d_countdown(12345) // { days: 0, hours: 3, minutes: 25, seconds: 45 }
 */
export declare function d_countdown(value: number): {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
};
