import Check from '../helper/check'

const check = new Check()

/**
 * Only for weapp!
 *
 * Deep clone value.
 *
 * @param {any}value The value to clone.
 *
 * @returns {any} The copied value.
 */
export function wx_clone_deep(value: any): any {
  return check.exception(() => JSON.parse(JSON.stringify(value)))
}

/**
 * Only for weapp!
 *
 * Parse the dataset in e.
 *
 * @param {Object} e Weapp `e` value.
 *
 * @returns {any} `e.currentTarget.dataset`.
 */
export function wx_dataset(e: any): any {
  return check.exception(() => e?.currentTarget?.dataset ?? null)
}

/**
 * Only for weapp!
 *
 * Make weapp API promisify.
 *
 * @param {Function} fn Weapp API.
 *
 * @returns {Function} Promisify API.
 */
export function wx_promisify(fn: any) {
  return check.exception(() => function (obj: any) {
    let args: any[] = [],
      len = arguments.length - 1

    while (len-- > 0) {
      args[len] = arguments[len + 1]
    }

    if (obj === undefined) obj = {}

    return new Promise((resolve, reject) => {
      obj.success = (res: any) => {
        resolve(res)
      }
      obj.fail = (err: any) => {
        reject(err)
      }

      fn.apply(null, [obj].concat(args))
    })
  })
}

/**
 * Only for weapp!
 *
 * Get window width.
 *
 * @returns {number} Window width.
 */
export function wx_window_width(): number {
  // @ts-ignore
  return check.exception(() => parseInt(wx.getSystemInfoSync().windowWidth || 0))
}

/**
 * Only for weapp!
 *
 * Get window height.
 *
 * @returns {number} Window height.
 */
export function wx_window_height(): number {
  // @ts-ignore
  return check.exception(() => parseInt(wx.getSystemInfoSync().windowHeight || 0))
}

/**
 * Only for weapp!
 *
 * Get window pixel ratio.
 *
 * @returns {number} Window pixel ratio.
 */
export function wx_window_pixel_ratio(): number {
  // @ts-ignore
  return check.exception(() => parseInt(wx.getSystemInfoSync().pixelRatio || 0))
}

/**
 * Only for weapp!
 *
 * Get image info sync.
 *
 * @returns {Object} Image info.
 */
export function wx_image_info_sync(path: string) {
  // @ts-ignore
  return check.exception(() => wx_promisify(wx.getImageInfo)({ src: path }))
}

/**
 * Only for weapp!
 *
 * Get file info sync.
 *
 * @returns {Object} File info.
 */
export function wx_file_info_sync(path: string) {
  // @ts-ignore
  return check.exception(() => wx_promisify(wx.getFileInfo)({ filePath: path }))
}