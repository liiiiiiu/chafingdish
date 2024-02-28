import { is_plain_object, is_function, is_number } from 'chafingdish'

class Router {
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

    Router.TABBAR_TAG = '@tabbar'
    Router.RELAUNCH_TAG = '@relaunch'

    this.pages2Routes()
  }

  get routes() {
    const temp: { [key: string]: string } = {}

    Object.keys(this._routes).forEach((key: string) => {
      if (key.indexOf(Router.TABBAR_TAG) === -1) {
        temp[key] = this._routes[key]
      }
    })

    return temp
  }

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
    if (!path || !params || !is_plain_object(params)) {
      return path
    }

    // If the `path` contains these characters,
    // it is considered that the `path` has params,
    // so, return the `path` directly
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
    // so, after handle `isRelaunch`, remove `RELAUNCH_TAG` from `path`
    let isRelaunch: boolean = path.indexOf(Router.RELAUNCH_TAG) > -1
    if (isRelaunch) {
      path = path.replace(Router.RELAUNCH_TAG, '')
    }

    // find a matching path from the `routes` after `isRelaunch` settled
    let newPath: string = this._routes[path] || this._routes[path + Router.TABBAR_TAG] || path

    // checks if the `path` is a tabbar page
    let isTabbar: boolean = (!!this._routes[this.path2Join(path) + Router.TABBAR_TAG] || path.indexOf(Router.TABBAR_TAG) > -1)

    return { newPath: newPath.replace(Router.TABBAR_TAG, ''), isTabbar, isRelaunch }
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
        successCallback && is_function(successCallback) && successCallback(res)
      },
      fail: (err: any) => {
        failCallback && is_function(failCallback) && failCallback(err)
      },
      complete: (res: any) => {
        completeCallback && is_function(completeCallback) && completeCallback(res)
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
            [route + Router.TABBAR_TAG]: '/' + page
          })
        }
      }
    } else {
      console.warn('[wx_router] Unable to get `pages` from app.json, url is needed!')
    }
  }

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
    if (!is_number(delta) || (delta && delta < 1)) {
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

export interface WxRouter {
  /**
   * Return all router info
   *
   * {
   *  PagesIndex: "/pages/index/index",
   *  PagesLogs: "/pages/logs/logs",
   *  PagesMyIndex: "/pages/my/index/index",
   * }
   */
  routes: { [key: string]: string }

  /**
   * Return current router info
   *
   * {
   *   from: "pages/index/index"
   *   params: null
   *   to: "/pages/logs/logs"
   * }
   */
  route: { to: string, from: string, params: any }

  /**
   * Invoke `wx.navigateTo` or `wx.switchTab`
   *
   * This function will automatically choose `wx.navigateTo` or `wx.switchTab`
   *
   * @param {string} path The path to jump to
   * @param {object} params The parameters passed to the next page
   * @param {Function} successCallback Callback after success
   * @param {Function} failCallback Callback after fail
   * @param {Function} completeCallback Callback after complete
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
  push: (path: string, params?: object | null, successCallback?: (data?: any) => any, failCallback?: (data?: any) => any, completeCallback?: (data?: any) => any) => any

  /**
   * Invoke `wx.redirectTo` or `wx.reLaunch`
   *
   * @param {string} path The page to jump to
   * @param {object} params The parameters passed to the next page
   * @param {Function} successCallback Callback after success
   * @param {Function} failCallback Callback after fail
   * @param {Function} completeCallback Callback after complete
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
  replace: (path: string, params?: object | null, successCallback?: (data?: any) => any, failCallback?: (data?: any) => any, completeCallback?: (data?: any) => any) => any

  /**
   * Invoke `wx.navigateBack`
   *
   * @param {number} delta The number of pages to return-back
   * @param {Function} successCallback Callback after success
   * @param {Function} failCallback Callback after fail
   * @param {Function} completeCallback Callback after complete
   *
   * @example
   *
   * wx_router.back()
   *
   * wx_router.back(2, () => (res: any) => {console.log(res)})
   */
  back: (delta?: number, successCallback?: (data?: any) => any, failCallback?: (data?: any) => any, completeCallback?: (data?: any) => any) => any
}

/**
 * Router for weapp
 *
 * Consistent grammar for `wx.switchTab` `wx.reLaunch` `wx.redirectTo` `wx.navigateTo` `wx.navigateBack`
 */
export const wx_router: WxRouter = new Router() as WxRouter