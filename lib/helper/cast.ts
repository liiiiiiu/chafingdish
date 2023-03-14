import Check from './check'

const check = new Check()

const rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/

export default class Cast {
  /**
   * unwrap data from string type value
   *
   * @example
   * "123" => 123
   * "true" => true
   * "null" => null
   */
  public unwrap(value: unknown) {
    if (typeof value === 'string') {
      if (value === +value + '') {
        return +value
      }

      if (value === 'true') {
        return true
      }

      if (value === 'false') {
        return false
      }

      if (value === 'null') {
        return null
      }

      if (rbrace.test(value)) {
        try {
          return JSON.parse(value)
        } catch (error) {}
      }
    }

    return value
  }

  public str(value: unknown): string {
    if (check.symbol(value)) {
      value = (<symbol>value).description || ''
    }

    return (value + '').toString() + ''
  }

  public num(value: unknown): number {
    let newValue = +this.unwrap(value)

    return !check.nan(newValue) ? newValue : 0
  }

  public bool(value: unknown): boolean {
    return !!value
  }

  public arr(value: unknown): any[] {
    if (check.arr(value)) {
      return (value as any[])
    }

    if (check.str(value) && (<string>value).indexOf(',') > -1) {
      return (<string>value).split(',')
    }

    return [value]
  }

  public symbol(value: unknown): Symbol {
    let newValue = ''

    if (!check.str(value) || !check.num(value)) {
      newValue = this.str(value)
    }

    return Symbol(newValue || (value + ''))
  }

  public undef(): undefined {
    return undefined
  }

  public nul(): null {
    return null
  }
}