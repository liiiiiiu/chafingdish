/**
 * ResponseView
 *
 * After fetch the response data, automatically process and control the data binding with wxml
 */
export interface ResponseViewType {
    showLoading: any;
    hideLoading: any;
    showNavigationBarLoading: any;
    hideNavigationBarLoading: any;
    startPullDownRefresh: any;
    stopPullDownRefresh: any;
    clear: Boolean;
    /**
     * Send GET request
     *
     * @param {Function} sendRequest Request function
     * @param {Function} successCallback Callback after success
     * @param {Function} failCallback Callback after fail
     * @param {boolean} reachBottom is reachBottom?
     */
    get: (sendRequest: (data?: any) => any, successCallback?: ((data?: any) => any) | null, failCallback?: ((data?: any) => any) | null, reachBottom?: boolean) => any;
    /**
     * Send POST request
     *
     * @param {Function} sendRequest Request function
     * @param {Function} successCallback Callback after success
     * @param {Function} failCallback Callback after fail
     */
    post: (sendRequest: (data?: any) => any, successCallback?: ((data?: any) => any) | null, failCallback?: ((data?: any) => any) | null) => any;
    /**
     * Send PUT request
     *
     * @param {Function} sendRequest Request function
     * @param {Function} successCallback Callback after success
     * @param {Function} failCallback Callback after fail
     */
    put: (sendRequest: (data?: any) => any, successCallback?: ((data?: any) => any) | null, failCallback?: ((data?: any) => any) | null) => any;
    /**
     * Send DELETE request
     *
     * @param {Function} sendRequest Request function
     * @param {Function} successCallback Callback after success
     * @param {Function} failCallback Callback after fail
     */
    delete: (sendRequest: (data?: any) => any, successCallback?: ((data?: any) => any) | null, failCallback?: ((data?: any) => any) | null) => any;
}
/**
 * Config for ResponseView
 */
export interface ResponseViewConfigType {
    view_key_prefix?: string;
    show_loading?: boolean;
    loading_title?: string;
    loading_mask?: boolean;
    show_success_toast?: boolean;
    success_toast_title?: string;
    show_fail_toast?: boolean;
    fail_toast_title?: string;
}
export declare class ResponseView implements ResponseViewType {
    protected page: {
        data: {
            [prop: string]: unknown;
        };
        setData: (data?: any) => any;
    };
    protected config: ResponseViewConfigType;
    protected objKey: string;
    protected objInitialValue: unknown;
    protected viewKey: string;
    protected viewValue: {
        reqPage: number;
        reqLoading: boolean;
        empty: boolean;
        last: boolean;
        total: number;
    };
    protected toastDuration: number;
    constructor(key: string, config?: ResponseViewConfigType);
    protected resetObjValue(): any;
    protected resetViewValue(): {
        reqPage: number;
        reqLoading: boolean;
        empty: boolean;
        last: boolean;
        total: number;
    };
    get showLoading(): any;
    get hideLoading(): any;
    get showNavigationBarLoading(): any;
    get hideNavigationBarLoading(): any;
    get startPullDownRefresh(): any;
    get stopPullDownRefresh(): any;
    protected get reqLoading(): boolean;
    protected set reqLoading(state: boolean);
    protected get reqPage(): number;
    protected set reqPage(page: number);
    protected get empty(): boolean;
    protected set empty(state: boolean);
    protected get last(): boolean;
    protected set last(state: boolean);
    protected get total(): number;
    protected set total(num: number);
    get clear(): boolean;
    get(sendRequest: (data?: any) => any, successCallback?: ((data?: any) => any) | null, failCallback?: ((data?: any) => any) | null, reachBottom?: boolean): Promise<void>;
    fetch(sendRequest: (data?: any) => any, successCallback?: ((data?: any) => any) | null, failCallback?: ((data?: any) => any) | null, reachBottom?: boolean): Promise<void>;
    fetchList(sendRequest: (data?: any) => any, successCallback?: ((data?: any) => any) | null, failCallback?: ((data?: any) => any) | null, reachBottom?: boolean): Promise<void>;
    protected common(sendRequest: (data?: any) => any, successCallback?: ((data?: any) => any) | null, failCallback?: ((data?: any) => any) | null): Promise<void>;
    post(sendRequest: (data?: any) => any, successCallback?: ((data?: any) => any) | null, failCallback?: ((data?: any) => any) | null): Promise<void>;
    put(sendRequest: (data?: any) => any, successCallback?: ((data?: any) => any) | null, failCallback?: ((data?: any) => any) | null): void;
    delete(sendRequest: (data?: any) => any, successCallback?: ((data?: any) => any) | null, failCallback?: ((data?: any) => any) | null): void;
}
