export declare type ScopeNameType = 'userLocation' | 'userLocationBackground' | 'record' | 'camera' | 'bluetooth' | 'writePhotosAlbum' | 'addPhoneContact' | 'addPhoneCalendar' | 'werun';
export interface WxAuthorize {
    /**
     * Check the authorization status for the current scope
     *
     * @param {string} scopeName The scope that needs check
     * @param {Function} successCallback Callback after success
     * @param {Function} failCallback Callback after fail
     */
    check: (scopeName: 'userLocation' | 'userLocationBackground' | 'record' | 'camera' | 'bluetooth' | 'writePhotosAlbum' | 'addPhoneContact' | 'addPhoneCalendar' | 'werun', successCallback?: Function, failCallback?: Function) => undefined;
    /**
     * Authorize for the current scope
     *
     * @param {Object} e `event` parameter after button clicked
     * @param {string} scopeName The scope that needs authorization
     * @param {Function} successCallback Callback after success
     * @param {Function} failCallback Callback after fail
     */
    auth: (e: any, scopeName: 'userLocation' | 'userLocationBackground' | 'record' | 'camera' | 'bluetooth' | 'writePhotosAlbum' | 'addPhoneContact' | 'addPhoneCalendar' | 'werun', successCallback?: Function, failCallback?: Function) => undefined;
}
/**
 * Authorization for weapp
 *
 * Some API need to be authorized and agreed by users before they can be called
 *
 * `wx_authorize` simplified authorization process, `check()` and `auth()` is enough
 */
export declare const wx_authorize: WxAuthorize;
