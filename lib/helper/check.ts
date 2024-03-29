export default class Check {
  private objProto: object
  private fnToString: Function
  private isEqual: boolean

  constructor() {
    this.objProto = Object.prototype
    this.fnToString = this.objProto.toString

    this.isEqual = true
  }

  private getTag(value: unknown): string {
    if (value == null) {
      return value === undefined ? '[object Undefined]' : '[object Null]'
    }
    return this.fnToString.call(value)
  }

  public str(value: unknown): boolean {
    return typeof value === 'string' || (typeof value === 'object' && !this.nul(value) && this.getTag(value) === '[object String]')
  }

  public num(value: unknown): boolean {
    return typeof value === 'number' || (typeof value === 'object' && !this.nul(value) && this.getTag(value) === '[object Number]')
  }

  public bool(value: unknown): boolean {
    return value === true || value === false || (typeof value === 'object' && !this.nul(value) && this.getTag(value) === '[object Boolean]')
  }

  public arr(value: unknown): boolean {
    return Array.isArray(value)
  }

  public arrLike(value: unknown): boolean {
    return !this.nul(value) && !this.fun(value) && this.len((value as any).length)
  }

  public obj(value: unknown): boolean {
    return typeof value === 'object'
  }

  public plainObj(value: unknown): boolean {
    return typeof value === 'object' && !this.nul(value) && this.getTag(value) === '[object Object]'
  }

  public objLike(value: unknown): boolean {
    return typeof value === 'object' && !this.nul(value)
  }

  public symbol(value: unknown): boolean {
    return typeof value === 'symbol'
  }

  public fun(value: unknown): boolean {
    return typeof value === 'function'
  }

  public nan(value: unknown): boolean {
    return value !== value
  }

  public undef(value: unknown): boolean {
    return typeof value === 'undefined'
  }

  public nul(value: unknown): boolean {
    return value === null
  }

  public len(value: unknown): boolean {
    return typeof value === 'number' && value > -1 && value % 1 === 0 && value < Number.MAX_SAFE_INTEGER
  }

  public args(value: unknown): boolean {
    return this.objLike(value) && this.getTag(value) === '[object Arguments]'
  }

  public err(value: unknown): boolean {
    if (!this.objLike(value)) {
      return false
    }

    const tag = this.getTag(value)

    return tag == '[object Error]' || tag == '[object DOMException]' || (typeof (value as any).message === 'string' && typeof (value as any).name === 'string' && !this.plainObj(value))
  }

  public exception(handle: any) {
    try {
      return handle && this.fun(handle) && handle()
    } catch (error: any) {
      // throw Error(error || 'This tool only for weapp!')
    }
  }

  public equal(value1: unknown, value2: unknown, strict: boolean = true): boolean {
    let isEqual = true

    const _equal = (val1: any, val2: any) => {
      if (!isEqual) return

      if (this.arr(val1) && this.arr(val2)) {
        if (val1.length !== val2.length) {
          isEqual = false
          return
        }

        for (let i = 0; i < val1.length; i++) {
          _equal(val1[i], val2[i])
        }
      } else if (this.plainObj(val1) && this.plainObj(val2)) {
        const keys1 = Object.keys(val1)
        const keys2 = Object.keys(val2)

        if (keys1.length !== keys2.length) {
          isEqual = false
          return
        }

        for (let i = 0; i < keys1.length; i++) {
          if (!Object.prototype.hasOwnProperty.call(val2, keys1[i])) {
            isEqual = false
            return
          }

          _equal(val1[keys1[i]], val2[keys1[i]])
        }
      } else {
        isEqual = strict ? val1 === val2 : val1 == val2
      }
    }

    _equal(value1, value2)

    return isEqual
  }
}
