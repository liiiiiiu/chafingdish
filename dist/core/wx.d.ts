/**
 * Deep clone value
 *
 * @param {any} value The value to clone
 *
 * @returns {any} The copied value
 */
export declare function wx_clone_deep(value: any): any;
/**
 * Parse the dataset in `event` parameter
 *
 * @param {Object} e `event` parameter after button clicked
 *
 * @returns {any} `e.currentTarget.dataset`
 */
export declare function wx_dataset(e: any, key?: string | number): any;
/**
 * Make weapp API promisify
 *
 * @param {Function} fn Weapp API
 *
 * @returns {Function} Promisify API
 */
export declare function wx_promisify(fn: any): any;
/**
 * Get the window width
 *
 * @returns {number} Window width
 */
export declare function wx_window_width(): number;
/**
 * Get the window height
 *
 * @returns {number} Window height
 */
export declare function wx_window_height(): number;
/**
 * Get the window pixel ratio
 *
 * @returns {number} Window pixel ratio
 */
export declare function wx_window_pixel_ratio(): number;
/**
 * Get the image info sync
 *
 * @returns {Object} Image info { width: number, height: number, path: string, orientation: stirng, type: string }
 */
export declare function wx_image_info_sync(path: string): any;
/**
 * Get the file info sync
 *
 * @returns {Object} File info { size: number }
 */
export declare function wx_file_info_sync(path: string): any;
/**
 * Synchronous refresh multi-page data
 *
 * @param {String|Function} handler Function name or object
 * @param {Object} config Config params
 */
export declare function wx_refresh_data(handler: string | {
    data: string;
    value: any;
    compare?: {
        [key: string]: any;
    };
}, config?: {
    show_loading?: boolean;
    loading_title?: string;
    loading_mask?: boolean;
    back?: boolean;
    delta?: number;
    sync?: boolean;
    exclude?: number[];
}): Promise<any>;
