import Check from '../helper/check'

const check = new Check()

export type ScopeNameType = 'userLocation' | 'userLocationBackground' | 'record' | 'camera' | 'bluetooth' | 'writePhotosAlbum' | 'addPhoneContact' | 'addPhoneCalendar' | 'werun'

class Authorize {
  protected scopeNames: ScopeNameType[]

  protected scopeMap!: number[][]

  constructor() {
    this.scopeNames = [
      'userLocation',
      'userLocationBackground',
      'record',
      'camera',
      'bluetooth',
      'writePhotosAlbum',
      'addPhoneContact',
      'addPhoneCalendar',
      'werun',
    ]

    this.init()
  }

  protected get page(): {
    setData: Function
  } {
    // @ts-ignore
    const pages = getCurrentPages()
    return pages[pages.length - 1]
  }

  private init() {
    this.scopeMap = Array.from({ length: this.scopeNames.length }, () => [])

    Array.from(this.scopeNames, (scopeName: string, index: number) => {
      this.scopeMap[index] = this.genCharCode(scopeName)
    })
  }

  protected genCharCode(value: string): number[] {
    if (!value) return []

    const tempArr: number[] = Array.from({ length: 26 }, () => 0)
    let i = -1
    while (++i < value.length) {
      tempArr[value[i].toLowerCase().charCodeAt(0) - 'a'.charCodeAt(0)] += 1
    }
    return tempArr
  }

  protected compare(value: any) {
    if (!value) {
      throw Error(`scope "${value ? value : ''}" not found, do you mean "${this.scopeNames[0]}"?`)
    }

    if (this.scopeNames.includes(value)) return

    let vCharCode: number[] = this.genCharCode(value),
      dif = 0,
      minDif = 0,
      nearest = ''

    Array.from(this.scopeMap, (charCode: number[], index: number) => {
      dif = 0

      for (let i = 0; i < 26; i++) {
        dif += Math.abs(charCode[i] - vCharCode[i])
      }

      let illegal = value.match(/[^a-zA-Z]*/g)
      if (illegal && illegal.length) {
        dif += illegal.join('').length
      }
      minDif = !minDif ? dif : Math.min(dif, minDif)
      nearest = Math.min(dif, minDif) === dif ? this.scopeNames[index] : nearest
    })

    throw Error(`scope "${value}" not found, do you mean "${nearest}"?`)
  }

  protected authStateSettle(scopeName: ScopeNameType, state: boolean) {
    this.page.setData({ [scopeName + 'Auth']: state })
  }

  /**
   * Recheck the authorization status for the current scope
   *
   * If the authorization is rejected, call `wx.openSetting` to open the setting interface and guide the user to authorize
   *
   * @param {string} scopeName The scope that needs recheck
   * @param {Function} successCallback Callback after success
   * @param {Function} failCallback Callback after fail
   */
  protected recheck(scopeName: ScopeNameType, successCallback?: Function, failCallback?: Function) {
    this.compare(scopeName)

    const scope = 'scope.' + scopeName

    // @ts-ignore
    wx.getSetting({
      success: (settingRes: any) => {
        if (settingRes.authSetting[scope]) {
          this.authStateSettle(scopeName, true)

          successCallback && successCallback(settingRes)

          return
        }

        // @ts-ignore
        wx.openSetting({
          success: (authRes: any) => {
            this.authStateSettle(scopeName, true)

            successCallback && successCallback(authRes)
          },
          fail: (error: any) => {
            this.authStateSettle(scopeName, false)

            failCallback && failCallback(error)
          }
        })
      },
      fail: (settingError: any) => {
        this.authStateSettle(scopeName, false)

        failCallback && failCallback(settingError)
      }
    })
  }

  /**
   * Handler after authorization is denied
   *
   * only triggered manually by the user clicking the openType button after the authorization is rejected for the first time
   *
   * @param {Object} e `event` parameter after button clicked
   * @param {string} scopeName The scope that needs authorization
   * @param {Function} successCallback Callback after success
   * @param {Function} failCallback Callback after fail
   */
  protected opensetting(e: any, scopeName: ScopeNameType, successCallback?: Function, failCallback?: Function) {
    this.compare(scopeName)

    const scope = 'scope.' + scopeName

    if (e.detail.authSetting[scope]) {
      this.authStateSettle(scopeName, true)

      successCallback && successCallback('')
    } else {
      this.authStateSettle(scopeName, false)

      failCallback && failCallback('')
    }
  }

  public check(scopeName: ScopeNameType, successCallback?: Function, failCallback?: Function) {
    this.compare(scopeName)

    const scope = 'scope.' + scopeName

    // @ts-ignore
    wx.getSetting({
      success: (settingRes: any) => {
        if (settingRes.authSetting[scope]) {
          this.authStateSettle(scopeName, true)

          successCallback && successCallback(settingRes)

          return
        }

        // @ts-ignore
        wx.authorize({
          scope,
          success: (authRes: any) => {
            this.authStateSettle(scopeName, true)

            successCallback && successCallback(authRes)
          },
          fail: (error: any) => {
            this.authStateSettle(scopeName, false)

            failCallback && failCallback(error)
          }
        })
      },
      fail: (settingError: any) => {
        this.authStateSettle(scopeName, false)

        failCallback && failCallback(settingError)
      }
    })
  }

  public auth(e: any, scopeName: ScopeNameType, successCallback?: Function, failCallback?: Function) {
    if (check.str(e)) {
      e = null
      scopeName = e

      this.recheck(scopeName, successCallback, failCallback)

      return
    }

    let _scopeName = scopeName
    if (check.obj(e)) {
      if (!scopeName || check.fun(scopeName)) {
        _scopeName = e.currentTarget.dataset.scope
      }

      !e.detail.authSetting
        ? this.recheck(_scopeName, successCallback, failCallback)
        : this.opensetting(e, _scopeName, successCallback, failCallback)
    }
  }
}

export interface WxAuthorize {
  /**
   * Check the authorization status for the current scope
   *
   * @param {string} scopeName The scope that needs check
   * @param {Function} successCallback Callback after success
   * @param {Function} failCallback Callback after fail
   */
  check: (scopeName: 'userLocation' | 'userLocationBackground' | 'record' | 'camera' | 'bluetooth' | 'writePhotosAlbum' | 'addPhoneContact' | 'addPhoneCalendar' | 'werun', successCallback?: Function, failCallback?: Function) => undefined

  /**
   * Authorize for the current scope
   *
   * @param {Object} e `event` parameter after button clicked
   * @param {string} scopeName The scope that needs authorization
   * @param {Function} successCallback Callback after success
   * @param {Function} failCallback Callback after fail
   */
  auth: (e: any, scopeName: 'userLocation' | 'userLocationBackground' | 'record' | 'camera' | 'bluetooth' | 'writePhotosAlbum' | 'addPhoneContact' | 'addPhoneCalendar' | 'werun', successCallback?: Function, failCallback?: Function) => undefined
}

/**
 * Authorization for weapp
 *
 * Some API need to be authorized and agreed by users before they can be called
 *
 * `wx_authorize` simplified authorization process, `check()` and `auth()` is enough
 */
export const wx_authorize: WxAuthorize = check.exception(() => new Authorize())