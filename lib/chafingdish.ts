import * as checker from './core/is'
import * as transformer from './core/to'
import * as generator from './core/gen'
import * as datetTransformer from './core/date'
import * as weapp from './core/wx'
import * as enhancer from './core/wow'

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
  is_leap_year,
  is_email,
  is_url,
  is_cn_phone_number,
  is_cn_id_card
} = checker

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
  to_cn_cent,
  to_cn_pinyin
} = transformer

export const {
  gen_uuid,
  gen_random_integer,
} = generator

export const {
  d_day,
  d_time,
  d_timestamp,
  d_format,
  d_format_YMD,
  d_diff
} = datetTransformer

export const {
  wx_clone_deep,
  wx_dataset,
  wx_promisify,
  wx_window_width,
  wx_window_height,
  wx_window_pixel_ratio,
  wx_image_info_sync,
  wx_file_info_sync,
  wx_router,
  ResponseView
} = weapp

export const {
  wow_array
} = enhancer

export type {
  ResponseViewType,
  ResponseViewConfigType
} from './core/wx'