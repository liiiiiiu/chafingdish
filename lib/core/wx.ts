import Check from '../helper/check'

const check = new Check()

function exception(handle: any) {
  try {
    return handle && check.fun(handle) && handle()
  } catch (error: any) {
    // throw Error(error || 'This tool only for weapp!')
  }
}

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
  return exception(() => JSON.parse(JSON.stringify(value)))
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
  return exception(() => e?.currentTarget?.dataset ?? null)
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
  return exception(() => function (obj: any) {
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
  return exception(() => parseInt(wx.getSystemInfoSync().windowWidth || 0))
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
  return exception(() => parseInt(wx.getSystemInfoSync().windowHeight || 0))
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
  return exception(() => parseInt(wx.getSystemInfoSync().pixelRatio || 0))
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
  return exception(() => wx_promisify(wx.getImageInfo)({ src: path }))
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
  return exception(() => wx_promisify(wx.getFileInfo)({ filePath: path }))
}


/**
 * Only for weapp!
 */
class WxRouter {
  protected _pages: string[]
  protected _tabbars: string[]
  protected _routes: {
    [key: string]: string
  }
  protected _route: {
    to: string,
    from: string,
    params: any
  } | null

  static TABBAR_TAG: string
  static RELAUNCH_TAG: string

  constructor() {
    // @ts-ignore
    this._pages = (__wxConfig && __wxConfig.pages) || []
    // @ts-ignore
    this._tabbars = (__wxConfig && __wxConfig.tabBar && __wxConfig.tabBar.list && __wxConfig.tabBar.list.length && __wxConfig.tabBar.list.map(_ => _.pagePath)) || []

    this._routes = {}
    this._route = null

    WxRouter.TABBAR_TAG = '@tabbar'
    WxRouter.RELAUNCH_TAG = '@relaunch'

    this.pages2Routes()
  }

  /**
   * Get the Collections of the `routes`.
   */
  get routes() {
    const temp: { [key: string]: string } = {}

    Object.keys(this._routes).forEach((key: string) => {
      if (key.indexOf(WxRouter.TABBAR_TAG) === -1) {
        temp[key] = this._routes[key]
      }
    })

    return temp
  }

  /**
   * Get the Collections of the `route`.
   */
  get route() {
    return this._route
  }

  protected firstUpper(value: string): string {
    value = value + ''
    return value.length > 1 ? value[0].toUpperCase() + value.slice(1).toLowerCase() : value.toUpperCase()
  }

  protected path2Camel(value: string): string {
    value = value + ''
    return value.replace(/([^_-])(?:[_-]+([^_-]))/g, (_$0: string, $1: string, $2: string) => $1 + $2.toUpperCase()).replace(/[_-]*/g, '')
  }

  protected path2Join(path: string): string {
    if (path[0] === '/') {
      path = path.substring(1)
    }

    let arrPath = path.split('/')
    arrPath.splice(arrPath.length - 1, 1)
    arrPath = arrPath.map(_ => this.firstUpper(_))
    arrPath = arrPath.map(_ => this.path2Camel(_))

    return arrPath.join('')
  }

  protected path2ConcatParam(path: string, params?: {
    [key: string]: any
  } | null): string {
    if (!path || !params || !check.plainObj(params)) {
      return path
    }

    // If the `path` contains these characters,
    // it is considered that the `path` has params,
    // so, return the `path` directly.
    if (path.indexOf('?') > 0
      || path.indexOf('&') > 0
      || path.indexOf('=') > 0) {
      return path
    }

    let newPath: string = path + '?'

    // concat params
    Object.keys(params).forEach((key, index, keys) => {
      newPath += `${key}=${params[key]}${index !== keys.length - 1 ? '&' : ''}`
    })

    return newPath
  }

  // Check whether the current path is a tabbar page or call `wx.relaunch`
  protected path2Check(path: string): {
    newPath: string,
    isTabbar: boolean,
    isRelaunch: boolean
  } {
    path = path + ''

    // `routes` does not contain `RELAUNCH_TAG`,
    // so, after handle `isRelaunch`, remove `RELAUNCH_TAG` from `path`.
    let isRelaunch: boolean = path.indexOf(WxRouter.RELAUNCH_TAG) > -1
    if (isRelaunch) {
      path = path.replace(WxRouter.RELAUNCH_TAG, '')
    }

    // find a matching path from the `routes` after `isRelaunch` settled.
    let newPath: string = this._routes[path] || this._routes[path + WxRouter.TABBAR_TAG] || path

    // checks if the `path` is a tabbar page.
    let isTabbar: boolean = (!!this._routes[path + WxRouter.TABBAR_TAG] || path.indexOf(WxRouter.TABBAR_TAG) > -1)

    return { newPath: newPath.replace(WxRouter.TABBAR_TAG, ''), isTabbar, isRelaunch }
  }

  protected container4Callback(
    successCallback?: (data?: any) => any,
    failCallback?: (data?: any) => any,
    completeCallback?: (data?: any) => any
  ): {
    success: (data?: any) => any,
    fail: (data?: any) => any,
    complete: (data?: any) => any
  } {
    return {
      success: (res: any) => {
        successCallback && check.fun(successCallback) && successCallback(res)
      },
      fail: (err: any) => {
        failCallback && check.fun(failCallback) && failCallback(err)
      },
      complete: (res: any) => {
        completeCallback && check.fun(completeCallback) && completeCallback(res)
      },
    }
  }

  protected log4Route(path: string | number, params?: {
    [key: string]: any
  } | null) {
    if (!path) return

    // @ts-ignore
    const pages = getCurrentPages()
    const page = pages[pages.length - 1]

    this._route = {
      from: page.route,
      to: typeof path === 'number'
        ? pages[pages.length - path < 0 ? 0 : pages.length - path].route
        : path,
      params: params
    }
  }

  protected pages2Routes() {
    let tabbarRoutes: string[] = []
    if (this._tabbars.length) {
      let i = -1, l = this._tabbars.length
      while (++i < l) {
        tabbarRoutes.push(this.path2Join(this._tabbars[i]))
      }
    }

    // build routes
    if (this._pages.length) {
      let i = 0, l = this._pages.length
      for (; i < l; i++) {
        let route, page
        route = page = this._pages[i]

        route = this.path2Join(route)

        Object.assign(this._routes, {
          [route]: '/' + page
        })
        // if cur page is a tabbar page,
        // join a `TABBAR_TAG` on the key,
        // used later to know whether it is a tabbar page.
        if (tabbarRoutes.includes(route)) {
          Object.assign(this._routes, {
            [route + WxRouter.TABBAR_TAG]: '/' + page
          })
        }
      }
    } else {
      console.warn('[wx_router] Unable to get `pages` from app.json, url is needed!')
    }
  }

  /**
   * Call wx.navigateTo or wx.switchTab.
   *
   * Will automatically use `wx.navigateTo` or `wx.switchTab`.
   *
   * @param {string} path The path to jump to.
   * @param {object} params Parameters passed to the next page.
   * @param {Function} successCallback Success callback.
   * @param {Function} failCallback Fail callback.
   * @param {Function} completeCallback Complete callback.
   *
   * @example
   *
   * // You can use the shorthand of the `path`, and the specific path will be build automatically(not include the last level).
   * // `/pages/logs/logs` => `PagesLogs`
   * wx_router.push('PagesLogs')
   *
   * // Use the specific path.
   * wx_router.push('/pages/logs/logs')
   *
   * // Use the `routes`.
   * wx_router.push(wx_router.routes.PagesLogs)
   */
  public push(
    path: string,
    params?: object | null,
    successCallback?: (data?: any) => any,
    failCallback?: (data?: any) => any,
    completeCallback?: (data?: any) => any
  ) {
    if (!path) return

    const { newPath, isTabbar } = this.path2Check(path);

    // console.log('push', newPath, path, isTabbar);

    this.log4Route(newPath, params);

    // @ts-ignore
    ((!isTabbar ? wx.navigateTo : wx.switchTab) as Function)({
      url: !isTabbar ? this.path2ConcatParam(newPath, params) : newPath,

      ...this.container4Callback(successCallback, failCallback, completeCallback)
    })
  }

  /**
   * Call wx.redirectTo or wx.reLaunch.
   *
   * @param {string} path The page to jump to.
   * @param {object} params Parameters passed to the next page.
   * @param {Function} successCallback Success callback.
   * @param {Function} failCallback Fail callback.
   * @param {Function} completeCallback Complete callback.
   *
   * @example
   *
   * // Use `wx.redirectTo`.
   * // You can use the shorthand of the `path`, and the specific path will be build automatically(not include the last level).
   * // `/pages/logs/logs` => `PagesLogs`
   * wx_router.replace('PagesLogs')
   *
   * // Add `@relaunch` tag to use `wx.reLaunch`.
   * wx_router.replace(`PagesLogs@relaunch`, null, (res: any) => {console.log(res)})
   *
   * // Use the specific path.
   * wx_router.replace('/pages/logs/logs')
   *
   * // Use the `routes`.
   * wx_router.replace(wx_router.routes.PagesLogs)
   */
  public replace(
    path: string,
    params?: object | null,
    successCallback?: (data?: any) => any,
    failCallback?: (data?: any) => any,
    completeCallback?: (data?: any) => any) {
    if (!path) return

    const { newPath, isTabbar, isRelaunch } = this.path2Check(path);

    // console.log('replace', newPath, isTabbar, isRelaunch);

    this.log4Route(newPath, params);

    // @ts-ignore
    ((!isRelaunch ? wx.redirectTo : wx.reLaunch) as (data?: any) => any)({
      url: !isTabbar ? this.path2ConcatParam(newPath, params) : newPath,

      ...this.container4Callback(successCallback, failCallback, completeCallback)
    })
  }

  /**
   * Exactly like wx.navigateBack.
   *
   * @param {number} delta The number of pages to return-back.
   * @param {Function} successCallback Success callback.
   * @param {Function} failCallback Fail callback.
   * @param {Function} completeCallback Complete callback.
   *
   * @example
   *
   * wx_router.back()
   *
   * wx_router.back(2, () => (res: any) => {console.log(res)})
   */
  public back(
    delta?: number,
    successCallback?: (data?: any) => any,
    failCallback?: (data?: any) => any,
    completeCallback?: (data?: any) => any
  ) {
    if (!check.num(delta) || (delta && delta < 1)) {
      delta = 1
    }

    this.log4Route(delta || 1, null);

    // @ts-ignore
    wx.navigateBack({
      delta,

      ...(this.container4Callback(successCallback, failCallback, completeCallback) as any)
    })
  }
}

/**
 * Router for Weapp.
 */
export const wx_router: {
  routes: { [key: string]: string }
  route: {
    to: string,
    from: string,
    params: any
  }
  push: (
    path: string,
    params?: object | null,
    successCallback?: (data?: any) => any,
    failCallback?: (data?: any) => any,
    completeCallback?: (data?: any) => any) => any
  replace: (
    path: string,
    params?: object | null,
    successCallback?: (data?: any) => any,
    failCallback?: (data?: any) => any,
    completeCallback?: (data?: any) => any) => any
  back: (
    delta?: number,
    successCallback?: (data?: any) => any,
    failCallback?: (data?: any) => any,
    completeCallback?: (data?: any) => any) => any
} = exception(() => new WxRouter())


export interface ResponseViewType {
  showLoading: any
  hideLoading: any
  showNavigationBarLoading: any
  hideNavigationBarLoading: any
  startPullDownRefresh: any
  stopPullDownRefresh: any
  clear: Boolean
  /**
   * 发起 GET 请求获取数据
   *
   * @param {Function} sendRequest 发送请求函数
   * @param {Function|undefined|null} successCallback 请求成功后的回调函数
   * @param {Function|undefined|null} failCallback 请求失败后的回调函数
   * @param {boolean} reachBottom 是否正在执行页面上拉触底事件
   */
  get: (sendRequest: (data?: any) => any, successCallback?: ((data?: any) => any) | null, failCallback?: ((data?: any) => any) | null, reachBottom?: boolean) => any
  /**
   * 发起 POST 请求新增数据
   *
   * @param {Function} sendRequest 发送请求函数
   * @param {Function|undefined|null} successCallback 请求成功后的回调函数
   * @param {Function|undefined|null} failCallback 请求失败后的回调函数
   */
  post: (sendRequest: (data?: any) => any, successCallback?: ((data?: any) => any) | null, failCallback?: ((data?: any) => any) | null) => any
  /**
   * 发起 PUT 请求更新数据
   *
   * @param {Function} sendRequest 发送请求函数
   * @param {Function|undefined|null} successCallback 请求成功后的回调函数
   * @param {Function|undefined|null} failCallback 请求失败后的回调函数
   */
  put: (sendRequest: (data?: any) => any, successCallback?: ((data?: any) => any) | null, failCallback?: ((data?: any) => any) | null) => any
  /**
   * 发起 DELETE 请求删除数据
   *
   * @param {Function} sendRequest 发送请求函数
   * @param {Function|undefined|null} successCallback 请求成功后的回调函数
   * @param {Function|undefined|null} failCallback 请求失败后的回调函数
   */
  delete: (sendRequest: (data?: any) => any, successCallback?: ((data?: any) => any) | null, failCallback?: ((data?: any) => any) | null) => any
}

export interface ResponseViewConfigType {
  view_key_prefix?: string
  show_loading?: boolean
  loading_title?: string
  loading_mask?: boolean
  show_success_toast?: boolean
  success_toast_title?: string
  show_fail_toast?: boolean
  fail_toast_title?: string
}

const responseViewConfig: ResponseViewConfigType = {
  view_key_prefix: '$',
  show_loading: true,
  loading_title: '加载中',
  loading_mask: true,
  show_success_toast: true,
  success_toast_title: '提交成功',
  show_fail_toast: false,
  fail_toast_title: '提交失败，请重试'
}

/**
 * ResponseView 响应视图
 *
 * 在发送请求到后端并获得响应数据后，自动处理、控制与 wxml 中的数据绑定；
 *
 * 这里的数据绑定包括 “渲染数据” “是否为空数据” “全部数据是否加载完毕” “分页数” 等。
 */
export class ResponseView implements ResponseViewType {
  protected page: {
    data: {
      [prop: string]: unknown
    },
    setData: (data?: any) => any
  }

  protected config: ResponseViewConfigType

  // 存储接口返回的数据实体的对象键名
  protected objKey: string
  // 对象的初始值
  protected objInitialValue: unknown

  // 存储与视图交互的对象键名
  protected viewKey: string
  // 存储与视图交互的对象键值
  protected viewValue: {
    // 分页
    reqPage: number,
    // 请求加载状态
    reqLoading: boolean,
    // 是否为空数据
    empty: boolean,
    // 全部数据是否加载完毕（用于分页加载）
    last: boolean,
    // 数据总数
    total: number
  }
  // Toast 持续时间
  protected toastDuration: number

  constructor(key: string, config?: ResponseViewConfigType) {
    // @ts-ignore
    const pages = getCurrentPages()
    const page = pages[pages.length - 1]
    if (!page || !key) {
      throw Error(`[ResponseView] ${!page ? 'Page' : 'Key'} not found!`)
    }

    this.page = page
    this.config = Object.assign(JSON.parse(JSON.stringify(responseViewConfig)), config)
    this.objKey = key
    this.objInitialValue = this.page.data[key]
    this.viewKey = this.config.view_key_prefix + key
    this.viewValue = this.resetViewValue()

    if (this.page.data[this.viewKey] = {}) {
      this.page.data[this.viewKey] = this.viewValue
    }

    this.toastDuration = 1500
  }

  protected resetObjValue() {
    return typeof this.objInitialValue === 'object' ? JSON.parse(JSON.stringify(this.objInitialValue)) : this.objInitialValue
  }

  protected resetViewValue() {
    return {
      reqPage: 1,
      reqLoading: false,
      empty: false,
      last: false,
      total: 0
    }
  }

  get showLoading() {
    // @ts-ignore
    return wx.showLoading({
      title: this.config.loading_title || '加载中',
      mask: this.config.loading_mask
    })
  }
  get hideLoading() {
    // @ts-ignore
    return wx.hideLoading()
  }

  get showNavigationBarLoading() {
    // @ts-ignore
    return wx.showNavigationBarLoading()
  }
  get hideNavigationBarLoading() {
    // @ts-ignore
    return wx.hideNavigationBarLoading()
  }

  get startPullDownRefresh() {
    // @ts-ignore
    return wx.startPullDownRefresh()
  }
  get stopPullDownRefresh() {
    // @ts-ignore
    return wx.stopPullDownRefresh()
  }

  protected get reqLoading() {
    return this.viewValue.reqLoading
  }
  protected set reqLoading(state: boolean) {
    this.viewValue.reqLoading = state
  }

  protected get reqPage() {
    return this.viewValue.reqPage
  }
  protected set reqPage(page: number) {
    this.viewValue.reqPage = page
  }

  protected get empty() {
    return this.viewValue.empty
  }
  protected set empty(state: boolean) {
    this.viewValue.empty = state
  }

  protected get last() {
    return this.viewValue.last
  }
  protected set last(state: boolean) {
    this.viewValue.last = state
  }

  protected get total() {
    return this.viewValue.total
  }
  protected set total(num: number) {
    this.viewValue.total = num
  }

  get clear() {
    this.page.data[this.objKey] = this.resetObjValue()
    this.page.data[this.viewKey] = this.viewValue = this.resetViewValue()
    return true
  }

  /**
   * 发起 GET 请求获取列表数据
   *
   * @param {Function} sendRequest 发送请求函数，接收 ResponseView 传入的分页
   * @param {Function|undefined|null} successCallback 请求成功后的回调函数
   * @param {Function|undefined|null} failCallback 请求失败后的回调函数
   * @param {boolean} reachBottom 是否正在执行页面上拉触底事件
   */
  public async get(sendRequest: (data?: any) => any, successCallback?: ((data?: any) => any) | null, failCallback?: ((data?: any) => any) | null, reachBottom: boolean = false) {
    if (reachBottom && (this.empty || this.last)) return

    if (this.reqLoading) return
    this.reqLoading = true

    !reachBottom ? this.clear : (this.reqPage = this.reqPage + 1)

    this.config.show_loading && this.showLoading

    const viewValueSuccessHook = (res: any) => {
      const resData = res.data?.data ?? res.data ?? res
      const isList = Array.isArray(resData)

      let total = isList ? (res.total ?? resData?.length ?? 0) : (!!resData ? 1 : 0)
      let isEmpty = !total && this.reqPage === 1
      let isLast = isList ? (this.reqPage > 1 && !resData?.length) : true

      this.empty = isEmpty
      this.last = isLast
      this.total = total
      this.page.setData({
        [`${this.viewKey}.empty`]: isEmpty,
        [`${this.viewKey}.last`]: isLast
      })
    }
    const viewValueFailHook = () => {
      this.empty = true
      this.last = false
      this.total = 0
      this.page.setData({
        [`${this.viewKey}.empty`]: true,
        [`${this.viewKey}.last`]: false
      })
    }

    let res = null

    try {
      sendRequest && ((res = await sendRequest(this.reqPage)), this.hideLoading, (this.reqLoading = false))

      if (res) {
        const resData = res.data?.data ?? res.data ?? res

        this.page.setData({
          [this.objKey]: !reachBottom ? resData : (this.page.data[this.objKey] as any[]).concat(resData)
        })

        viewValueSuccessHook(res)

        successCallback && successCallback(res)

        console.log('[ResponseView] get 👇')
        console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
        console.log(`${this.objKey} `, this.page.data[this.objKey])
        console.log(`${this.viewKey} `, this.page.data[this.viewKey])
        console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<')
      } else {
        viewValueFailHook()

        failCallback && failCallback(res)
      }
    } catch (error: any) {
      console.error(`[ResponseView] ${error}`)

      this.config.show_loading && this.hideLoading

      this.reqLoading = false

      viewValueFailHook()

      failCallback && failCallback(error)
    }
  }

  public async fetch(sendRequest: (data?: any) => any, successCallback?: ((data?: any) => any) | null, failCallback?: ((data?: any) => any) | null, reachBottom: boolean = false) {
    this.get(sendRequest, successCallback, failCallback, reachBottom)
  }

  public async fetchList(sendRequest: (data?: any) => any, successCallback?: ((data?: any) => any) | null, failCallback?: ((data?: any) => any) | null, reachBottom: boolean = false) {
    this.get(sendRequest, successCallback, failCallback, reachBottom)
  }

  protected async common(sendRequest: (data?: any) => any, successCallback?: ((data?: any) => any) | null, failCallback?: ((data?: any) => any) | null) {
    if (this.reqLoading) return
    this.reqLoading = true

    this.config.show_loading && this.showLoading

    let res: any = null

    try {
      sendRequest && ((res = await sendRequest()), this.hideLoading, (this.reqLoading = false))

      if (res) {
        if (this.config.show_success_toast) {
          // @ts-ignore
          wx.showToast({
            title: this.config.success_toast_title || '提交成功',
            icon: 'success',
            duration: this.toastDuration
          })

          setTimeout(() => {
            successCallback && successCallback(res)
          }, this.toastDuration)
        } else {
          successCallback && successCallback(res)
        }

      } else {
        if (this.config.show_fail_toast) {
          // @ts-ignore
          wx.showToast({
            title: this.config.fail_toast_title || '提交失败，请重试',
            icon: 'none',
            duration: this.toastDuration
          })

          setTimeout(() => {
            failCallback && failCallback(res)
          }, this.toastDuration)
        } else {
          failCallback && failCallback(res)
        }
      }
    } catch (error: any) {
      console.error(`[ResponseView] ${error}`)

      this.config.show_loading && this.hideLoading

      this.reqLoading = false

      if (this.config.show_fail_toast) {
        // @ts-ignore
        wx.showToast({
          title: this.config.fail_toast_title || '提交失败，请重试',
          icon: 'none',
          duration: this.toastDuration
        })

        setTimeout(() => {
          failCallback && failCallback(error)
        }, this.toastDuration)
      } else {
        failCallback && failCallback(error)
      }
    }
  }

  /**
   * 发起 POST 请求新增数据
   *
   * @param {Function} sendRequest 发送请求函数
   * @param {Function|undefined|null} successCallback 请求成功后的回调函数
   * @param {Function|undefined|null} failCallback 请求失败后的回调函数
   */
  public async post(sendRequest: (data?: any) => any, successCallback?: ((data?: any) => any) | null, failCallback?: ((data?: any) => any) | null) {
    this.common(sendRequest, successCallback, failCallback)
  }

  /**
   * 发起 PUT 请求更新数据
   *
   * @param {Function} sendRequest 发送请求函数
   * @param {Function|undefined|null} successCallback 请求成功后的回调函数
   * @param {Function|undefined|null} failCallback 请求失败后的回调函数
   */
  public put(sendRequest: (data?: any) => any, successCallback?: ((data?: any) => any) | null, failCallback?: ((data?: any) => any) | null) {
    this.common(sendRequest, successCallback, failCallback)
  }

  /**
   * 发起 DELETE 请求删除数据
   *
   * @param {Function} sendRequest 发送请求函数
   * @param {Function|undefined|null} successCallback 请求成功后的回调函数
   * @param {Function|undefined|null} failCallback 请求失败后的回调函数
   */
  public delete(sendRequest: (data?: any) => any, successCallback?: ((data?: any) => any) | null, failCallback?: ((data?: any) => any) | null) {
    this.common(sendRequest, successCallback, failCallback)
  }
}