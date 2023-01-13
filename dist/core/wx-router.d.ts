/**
 * Router for Weapp.
 *
 * 微信小程序跳转API封装
 */
export declare const wx_router: {
    /**
     * 返回项目中所有的路由信息
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
     * 返回当前跳转的路由信息
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
    push: (path: string, params?: object | null, successCallback?: (data?: any) => any, failCallback?: (data?: any) => any, completeCallback?: (data?: any) => any) => any;
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
    replace: (path: string, params?: object | null, successCallback?: (data?: any) => any, failCallback?: (data?: any) => any, completeCallback?: (data?: any) => any) => any;
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
    back: (delta?: number, successCallback?: (data?: any) => any, failCallback?: (data?: any) => any, completeCallback?: (data?: any) => any) => any;
};
