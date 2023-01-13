export declare type ScopeNameType = 'userLocation' | 'userLocationBackground' | 'record' | 'camera' | 'bluetooth' | 'writePhotosAlbum' | 'addPhoneContact' | 'addPhoneCalendar' | 'werun';
/**
 * 微信小程序授权接口封装
 *
 * 在微信小程序中使用地理位置、相册、摄像头等十多种API前，需要调用对应的授权接口，而且在用户拒绝授权的情况下还需进行二次授权的处理；
 *
 * wx_authorize 对这些接口所需的授权逻辑进行了封装，仅需调用 `check` `auth` 两个函数即可实现所有授权接口的逻辑。
 */
export declare const wx_authorize: {
    /**
     * 检查用户对当前 scope 的授权状态。
     *
     * @param {string} scopeName 需要授权的 scope
     * @param {Function} successCallback 授权成功的回调函数
     * @param {Function} failCallback 授权失败的回调函数
     */
    check: (scopeName: 'userLocation' | 'userLocationBackground' | 'record' | 'camera' | 'bluetooth' | 'writePhotosAlbum' | 'addPhoneContact' | 'addPhoneCalendar' | 'werun', successCallback?: Function, failCallback?: Function) => undefined;
    /**
     * 获得当前 scope 的授权状态并根据授权结果执行对应的操作；
     *
     * 注意：在执行 auth 动作之前必须先执行 check 函数。
     *
     * @param {Object} e 按钮点击后返回的 event 对象
     * @param {string} scopeName 需要授权的 scope
     * @param {Function} successCallback 授权成功的回调函数
     * @param {Function} failCallback 授权失败的回调函数
     */
    auth: (e: any, scopeName: 'userLocation' | 'userLocationBackground' | 'record' | 'camera' | 'bluetooth' | 'writePhotosAlbum' | 'addPhoneContact' | 'addPhoneCalendar' | 'werun', successCallback?: Function, failCallback?: Function) => undefined;
};
