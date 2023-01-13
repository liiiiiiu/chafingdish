import Check from '../helper/check'

const check = new Check()

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
 *
 * 微信小程序跳转API封装
 */
export const wx_router: {
  /**
   * 返回项目中所有的路由信息
   *
   * {
   *  PagesIndex: "/pages/index/index",
   *  PagesLogs: "/pages/logs/logs",
   *  PagesMyIndex: "/pages/my/index/index",
   * }
   */
  routes: { [key: string]: string }
  /**
   * 返回当前跳转的路由信息
   *
   * {
   *   from: "pages/index/index"
   *   params: null
   *   to: "/pages/logs/logs"
   * }
   */
  route: {
    to: string,
    from: string,
    params: any
  }
  /**
   * 调用 wx.navigateTo 或者 wx.switchTab
   *
   * push 函数会根据页面性质自动调用 wx.navigateTo、wx.switchTab
   *
   * @param path 跳转的页面
   * @param params 携带的参数
   * @param successCallback 跳转成功后的回调函数
   * @param failCallback 跳转失败后的回调函数
   * @param completeCallback 跳转完成后的回调函数
   *
   * @example
   *
   * // 传入的路径可以使用简写的方式（不包含最后一层）
   * // `/pages/logs/logs` => `PagesLogs`
   * wx_router.push('PagesLogs', { id: 1 },
   *  (res) => {
   *    console.log('success callback', res)
   *  },
   *  (err) => {
   *    console.log('fail callback', err)
   *  },
   *  (res) => {
   *    console.log('complete callback', res)
   *  }
   * )
   * // 也可以写入具体的路径
   * wx_router.push('/pages/logs/logs')
   * // 或者使用 routes 对象的属性
   * wx_router.push(wx_router.routes.PagesLogs)
   */
  push: (
    path: string,
    params?: object | null,
    successCallback?: (data?: any) => any,
    failCallback?: (data?: any) => any,
    completeCallback?: (data?: any) => any) => any
  /**
   * 调用 wx.redirectTo 或者 wx.reLaunch
   *
   * 传入的路径参数和 push 函数一样有三种方式
   *
   * @param path 跳转的页面
   * @param params 携带的参数
   * @param successCallback 跳转成功后的回调函数
   * @param failCallback 跳转失败后的回调函数
   * @param completeCallback 跳转完成后的回调函数
   *
   * @example
   *
   * wx_router.replace('PagesLogs')
   * // 默认调用 redirectTo，添加 `@relaunch` 标记后使用 wx.reLaunch
   * wx_router.replace(`PagesLogs@relaunch`, null, (res: any) => {console.log(res)})
   * wx_router.replace('/pages/logs/logs')
   * wx_router.replace(wx_router.routes.PagesLogs)
   */
  replace: (
    path: string,
    params?: object | null,
    successCallback?: (data?: any) => any,
    failCallback?: (data?: any) => any,
    completeCallback?: (data?: any) => any) => any
  /**
   * 调用 wx.navigateBack
   *
   * @param delta 指定返回的页面数
   * @param successCallback 跳转成功后的回调函数
   * @param failCallback 跳转失败后的回调函数
   * @param completeCallback 跳转完成后的回调函数
   *
   * @example
   *
   * wx_router.back()
   * wx_router.back(2, () => (res: any) => {console.log(res)})
   */
  back: (
    delta?: number,
    successCallback?: (data?: any) => any,
    failCallback?: (data?: any) => any,
    completeCallback?: (data?: any) => any) => any
} = check.exception(() => new WxRouter())