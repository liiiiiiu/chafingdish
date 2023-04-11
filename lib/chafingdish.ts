import * as wow from './core/wow'
import * as is from './core/is'
import * as to from './core/to'
import * as gen from './core/gen'
import * as date from './core/date'
import * as wx from './core/wx'
import * as wxRouter from './core/wx-router'
import * as wxResponsiveView from './core/wx-responsive-view'
import * as wxAuthorize from './core/wx-authorize'

export const {
  wow_array
} = wow

export const {
  is_string,
  is_number,
  is_integer,
  is_positive_integer,
  is_float,
  is_positive_float,
  is_boolean,
  is_array,
  is_array_like,
  is_object,
  is_plain_object,
  is_object_like,
  is_symbol,
  is_function,
  is_NaN,
  is_undefined,
  is_null,
  is_length,
  is_arguments,
  is_error,
  is_falsy,
  is_equal,

  is_leap_year,
  is_email,
  is_url,
  is_cn_phone_number,
  is_cn_id_card,
  is_today,
  is_today_before,
  is_today_after
} = is

export const {
  to_string,
  to_number,
  to_integer,
  to_float,
  to_boolean,
  to_array,
  to_symbol,
  to_undefined,
  to_null,
  to_original,

  to_cn_cent,
  to_cn_pinyin,
  to_title
} = to

export const {
  gen_uuid,
  gen_random_integer,
  gen_http_content_type
} = gen

export const {
  d_day,

  d_time,
  d_timestamp,
  d_format,
  d_format_YMD,
  d_diff,
  d_dates_in_month
} = date

export const {
  wx_clone_deep,
  wx_dataset,
  wx_promisify,
  wx_window_width,
  wx_window_height,
  wx_window_pixel_ratio,
  wx_image_info_sync,
  wx_file_info_sync
} = wx

export const {
  wx_router
} = wxRouter

export const {
  wx_authorize
} = wxAuthorize

export const {
  ResponseView
} = wxResponsiveView


export type {
  ScopeNameType
} from './core/wx-authorize'

export type {
  ResponseViewType,
  ResponseViewConfigType
} from './core/wx-responsive-view'