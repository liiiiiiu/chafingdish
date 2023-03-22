import Check from '../helper/check'

const check = new Check()

/**
 * Deep clone value
 *
 * @param {any} value The value to clone
 *
 * @returns {any} The copied value
 */
export function wx_clone_deep(value: any): any {
  return check.exception(() => JSON.parse(JSON.stringify(value)))
}

/**
 * Parse the dataset in `event` parameter
 *
 * @param {Object} e `event` parameter after button clicked
 *
 * @returns {any} `e.currentTarget.dataset`
 */
export function wx_dataset(e: any, key?: string | number): any {
  return check.exception(() => {
    if (e?.currentTarget?.dataset) {
      const dataset = e.currentTarget.dataset

      if (check.undef(key) || check.nul(key)) return dataset

      return dataset[key as string | number] ?? undefined
    }

    return null
  })
}

/**
 * Make weapp API promisify
 *
 * @param {Function} fn Weapp API
 *
 * @returns {Function} Promisify API
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
 * Get the window width
 *
 * @returns {number} Window width
 */
export function wx_window_width(): number {
  // @ts-ignore
  return check.exception(() => parseInt(wx.getSystemInfoSync().windowWidth || 0))
}

/**
 * Get the window height
 *
 * @returns {number} Window height
 */
export function wx_window_height(): number {
  // @ts-ignore
  return check.exception(() => parseInt(wx.getSystemInfoSync().windowHeight || 0))
}

/**
 * Get the window pixel ratio
 *
 * @returns {number} Window pixel ratio
 */
export function wx_window_pixel_ratio(): number {
  // @ts-ignore
  return check.exception(() => parseInt(wx.getSystemInfoSync().pixelRatio || 0))
}

/**
 * Get the image info sync
 *
 * @returns {Object} Image info { width: number, height: number, path: string, orientation: stirng, type: string }
 */
export function wx_image_info_sync(path: string) {
  // @ts-ignore
  return check.exception(() => wx_promisify(wx.getImageInfo)({ src: path }))
}

/**
 * Get the file info sync
 *
 * @returns {Object} File info { size: number }
 */
export function wx_file_info_sync(path: string) {
  // @ts-ignore
  return check.exception(() => wx_promisify(wx.getFileInfo)({ filePath: path }))
}

/**
 * Synchronous refresh multi-page data
 *
 * @param {String|Function} handler Function name or object
 * @param {Object} config Config params
 */
export async function wx_refresh_data(handler: string | {
  data: string
  value: any
  compare?: {
    [key: string]: any
  }
}, config?: {
  show_loading?: boolean
  loading_title?: string
  loading_mask?: boolean
  back?: boolean
  delta?: number
  sync?: boolean
  exclude?: number[]
  }) {
  return check.exception(async() => {
    const showLoading = config?.show_loading ?? false
    const loadingTitle = config?.loading_title ?? '加载中'
    const loadingMask = config?.loading_mask ?? false
    const back = config?.back ?? false
    const delta = config?.delta ?? 1
    const sync = config?.sync ?? false
    const exclude = config?.exclude ?? []

    // @ts-ignore
    if (showLoading) wx.showLoading({ title: loadingTitle, mask: loadingMask })

    // @ts-ignore
    const pages = getCurrentPages()
    const excludeIndex = exclude.map(idx => (idx >= 0 ? idx : (pages.length + idx)))
    let index = pages.length - 1

    for (index; index >= 0; index--) {
      if (excludeIndex.includes(index)) continue

      const page = pages[index]
      let fnName = ''

      if (check.str(handler)) { // handler 为函数名，全量更新
        fnName = handler as string
        // 如果 handler 为函数名，直接执行该函数进行全量更新
        page[fnName] && check.fun(page[fnName]) && (!sync ? page[fnName]() : await page[fnName]())
      } else if (check.plainObj(handler)) { // handler 为对象，更新某条数据
        const { data, value, compare } = handler as any

        // for example:

        // goods: [
        //   {
        //     id: 1,
        //     list: [
        //      {
        //       title: 'a',
        //       price: 50
        //       }
        //     ]
        //   },
        //   {
        //     id: 2,
        //     list: [
        //      {
        //       title: 'b',
        //       price: 100
        //       }
        //     ]
        //   },
        // ]

        // 现在要更新 goods[1]['list'][0]['title'] 也就是title字段的值
        // data 需传入 goods.list.title
        // compare 需传入
        {
          // 'id.title': [2, 'b']
        }

        if (!data || check.fun(page[data])) break

        const dataKeys = data.split('.') || [] // ["goods", "list", "title"]
        const compareKeys: string[][] = []
        const compareValues: any[] = []
        let pageDataValue: any = page.data
        let setDataKey = ''

        // 处理对比字段
        // 对比字段存在多条件对比
        // compare: {
        //   'id.title': [1, 'a'],
        //   'id.price': [1, 50]
        // }
        if (compare && check.plainObj(compare)) {
          Object.keys(compare).forEach(key => {
            if (key) {
              const keys = key.split('.')
              compareKeys.push(keys)
              const value = compare[key]
              compareValues.push(Array.isArray(value) ? value : [value])
            }
          })
        }

        if (dataKeys.length) {
          Array.from(dataKeys, (key: string, index: number) => {
            if (Object.prototype.hasOwnProperty.call(pageDataValue, key)) {
              pageDataValue = pageDataValue[key]
              setDataKey += `${index !== 0 ? '.' : ''}${key}`

              // 碰到数组结构，就需要依赖 compre 提供的比对参数获得索引值
              // 比如 page.data.goods 的值为数组，就需要拿到索引值才能继续往下处理
              if (Array.isArray(pageDataValue)) {
                let curIndex = new Set()
                for (let i = 0; i < compareKeys.length; i++) {
                  for (let j = 0; j < pageDataValue.length; j++) {
                    // 值可能是字符串、数字、数组等不同的数据结构
                    if (check.equal(pageDataValue[j][compareKeys[i][index]], compareValues[i][index])) {
                      curIndex.add(j)
                      break
                    }
                  }
                }

                // 通过比对结果，获得当前阶段的索引值，并与之前的结果进行拼接
                if (curIndex.size < 2) {
                  if (curIndex.size === 1) {
                    const arr: any[] = Array.from(curIndex)
                    pageDataValue = pageDataValue[arr[0]]
                    setDataKey += `[${arr[0]}]`
                  }
                } else {
                  pageDataValue = page.data
                  setDataKey = ''
                  throw Error(`[wx_refresh_data] 对比参数失败，请填写正确的参数及值！`)
                }
              }
            }
          })
        }

        if (setDataKey) {
          // 最终找到需要更新的值
          // setDataKey = goods[1].list[0].title
          page.setData({
            [setDataKey]: value
          })
        }
      }
    }

    // @ts-ignore
    if (showLoading) wx.hideLoading()

    // @ts-ignore
    if (back) wx.navigateBack({ delta })
  })
}