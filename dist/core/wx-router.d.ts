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
    routes: {
        [key: string]: string;
    };
    /**
     * Return current router info
     *
     * {
     *   from: "pages/index/index"
     *   params: null
     *   to: "/pages/logs/logs"
     * }
     */
    route: {
        to: string;
        from: string;
        params: any;
    };
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
    push: (path: string, params?: object | null, successCallback?: (data?: any) => any, failCallback?: (data?: any) => any, completeCallback?: (data?: any) => any) => any;
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
    replace: (path: string, params?: object | null, successCallback?: (data?: any) => any, failCallback?: (data?: any) => any, completeCallback?: (data?: any) => any) => any;
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
    back: (delta?: number, successCallback?: (data?: any) => any, failCallback?: (data?: any) => any, completeCallback?: (data?: any) => any) => any;
}
/**
 * Router for weapp
 *
 * Consistent grammar for `wx.switchTab` `wx.reLaunch` `wx.redirectTo` `wx.navigateTo` `wx.navigateBack`
 */
export declare const wx_router: WxRouter;
