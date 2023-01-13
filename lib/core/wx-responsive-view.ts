import Check from '../helper/check'

const check = new Check()

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

    let res: any = null

    try {
      sendRequest && ((res = await sendRequest(this.reqPage)), this.hideLoading, (this.reqLoading = false))

      if (check.nul(res) || check.undef(res)) {
        viewValueFailHook()

        failCallback && failCallback(res)
      } else {
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

      if (check.nul(res) || check.undef(res) || res === false) {
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
      } else {
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