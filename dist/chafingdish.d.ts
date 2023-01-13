import * as wow from './core/wow';
import * as is from './core/is';
import * as to from './core/to';
import * as gen from './core/gen';
import * as date from './core/date';
import * as wx from './core/wx';
import * as wxResponsiveView from './core/wx-responsive-view';
export declare const wow_array: typeof wow.wow_array;
export declare const is_string: typeof is.is_string, is_number: typeof is.is_number, is_integer: typeof is.is_integer, is_positive_integer: typeof is.is_positive_integer, is_float: typeof is.is_float, is_positive_float: typeof is.is_positive_float, is_boolean: typeof is.is_boolean, is_array: typeof is.is_array, is_array_like: typeof is.is_array_like, is_object: typeof is.is_object, is_plain_object: typeof is.is_plain_object, is_object_like: typeof is.is_object_like, is_symbol: typeof is.is_symbol, is_function: typeof is.is_function, is_NaN: typeof is.is_NaN, is_undefined: typeof is.is_undefined, is_null: typeof is.is_null, is_length: typeof is.is_length, is_arguments: typeof is.is_arguments, is_error: typeof is.is_error, is_leap_year: typeof is.is_leap_year, is_email: typeof is.is_email, is_url: typeof is.is_url, is_cn_phone_number: typeof is.is_cn_phone_number, is_cn_id_card: typeof is.is_cn_id_card;
export declare const to_string: typeof to.to_string, to_number: typeof to.to_number, to_integer: typeof to.to_integer, to_float: typeof to.to_float, to_boolean: typeof to.to_boolean, to_array: typeof to.to_array, to_symbol: typeof to.to_symbol, to_undefined: typeof to.to_undefined, to_null: typeof to.to_null, to_cn_cent: typeof to.to_cn_cent, to_cn_pinyin: typeof to.to_cn_pinyin;
export declare const gen_uuid: typeof gen.gen_uuid, gen_random_integer: typeof gen.gen_random_integer;
export declare const d_day: typeof import("dayjs"), d_time: typeof date.d_time, d_timestamp: typeof date.d_timestamp, d_format: typeof date.d_format, d_format_YMD: typeof date.d_format_YMD, d_diff: typeof date.d_diff;
export declare const wx_clone_deep: typeof wx.wx_clone_deep, wx_dataset: typeof wx.wx_dataset, wx_promisify: typeof wx.wx_promisify, wx_window_width: typeof wx.wx_window_width, wx_window_height: typeof wx.wx_window_height, wx_window_pixel_ratio: typeof wx.wx_window_pixel_ratio, wx_image_info_sync: typeof wx.wx_image_info_sync, wx_file_info_sync: typeof wx.wx_file_info_sync;
export declare const wx_router: {
    routes: {
        [key: string]: string;
    };
    route: {
        to: string;
        from: string;
        params: any;
    };
    push: (path: string, params?: object | null | undefined, successCallback?: ((data?: any) => any) | undefined, failCallback?: ((data?: any) => any) | undefined, completeCallback?: ((data?: any) => any) | undefined) => any;
    replace: (path: string, params?: object | null | undefined, successCallback?: ((data?: any) => any) | undefined, failCallback?: ((data?: any) => any) | undefined, completeCallback?: ((data?: any) => any) | undefined) => any;
    back: (delta?: number | undefined, successCallback?: ((data?: any) => any) | undefined, failCallback?: ((data?: any) => any) | undefined, completeCallback?: ((data?: any) => any) | undefined) => any;
};
export declare const wx_authorize: {
    check: (scopeName: "userLocation" | "userLocationBackground" | "record" | "camera" | "bluetooth" | "writePhotosAlbum" | "addPhoneContact" | "addPhoneCalendar" | "werun", successCallback?: Function | undefined, failCallback?: Function | undefined) => undefined;
    auth: (e: any, scopeName: "userLocation" | "userLocationBackground" | "record" | "camera" | "bluetooth" | "writePhotosAlbum" | "addPhoneContact" | "addPhoneCalendar" | "werun", successCallback?: Function | undefined, failCallback?: Function | undefined) => undefined;
};
export declare const ResponseView: typeof wxResponsiveView.ResponseView;
export type { ScopeNameType } from './core/wx-authorize';
export type { ResponseViewType, ResponseViewConfigType } from './core/wx-responsive-view';
