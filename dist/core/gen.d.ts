/**
 * Generate UUID
 *
 * @returns {string} UUID
 *
 * @example
 *
 * gen_uuid() // '3e3e6bbb-ecb7-4289-8a05-a64647d82604'
 */
export declare function gen_uuid(): string;
/**
 * Generate random integer between two numbers
 *
 * @param {number|undefined} start Minimum value between two numbers
 * @param {number|undefined} end Maximum value between two numbers, not contain this value
 *
 * @returns {number} Random integer between two numbers
 *
 * @exapmle
 *
 * gen_random_integer() // 3
 *
 * gen_random_integer(10, 100) // 12
 */
export declare function gen_random_integer(start?: number, end?: number): number;
/**
 * Generate HTTP content-type
 */
export declare const gen_http_content_type: {
    none: '';
    html: 'text/html';
    plain: 'text/plain';
    xml: 'text/xml';
    gif: 'image/gif';
    jpeg: 'image/jpeg';
    png: 'image/png';
    mpeg: 'video/mpeg';
    quicktime: 'video/quicktime';
    xhtml: 'application/xhtml+xml';
    atom: 'application/atom+xml';
    json: 'application/json';
    pdf: 'application/pdf';
    msword: 'application/msword';
    stream: 'application/octet-stream';
    formUrlencoded: 'application/x-www-form-urlencoded';
    formData: 'multipart/form-data';
};
