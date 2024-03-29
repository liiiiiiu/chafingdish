import Check from '../helper/check'
import Cast from '../helper/cast'
import { forEach } from '../helper/iterate'

const check = new Check()

const cast = new Cast()

interface WowArrayType extends Array<any> {
  /**
   * Returns the first element in the array
   *
   * @example
   *
   * [1, 2, 3].first // 1
   */
  first: any
  /**
   * Returns the last element in the array
   *
   * @example
   *
   * [1, 2, 3].last // 3
   */
  last: any
  /**
   * Returns the min element in the array
   *
   * @example
   *
   * [1, 2, 3].min // 1
   */
  min: number
  /**
   * Returns the max element in the array
   *
   * @example
   *
   * [1, 2, 3].max // 3
   */
  max: number
  /**
   * Batch remove elements from the array
   *
   * @example
   *
   * [1, 2, 3].remove(0, val => val === 3) // [2]
   */
  remove: (...args: (number | Function)[]) => any[]
  /**
   * Shuffle the elements of the array
   *
   * @example
   *
   * [1, 2, 3].shuffle // [1, 3, 2]
   */
  shuffle: any[]
  /**
   * Array nesting
   *
   * @param {number|string|null|undefined} root_id Root id to start nesting.
   * @param {string} link Nested by `link` value, the default value is 'parent_id'.
   *
   * @example
   *
   * const nestArr = wow_array([
   *  { id: 1, parent_id: null },
   *  { id: 2, parent_id: 1 },
   *  { id: 3, parent_id: 1 },
   *  { id: 4, parent_id: 2 },
   *  { id: 5, parent_id: 4 }
   * ])
   * nestArr.nest(null, 'parent_id')
   *
   * // [
   * //   {
   * //     id: 1,
   * //     parent_id: null,
   * //     children: [
   * //       {
   * //         id: 2,
   * //         parent_id: 1,
   * //         children: [
   * //           {
   * //             id: 4,
   * //             parent_id: 2,
   * //             children: [
   * //               {
   * //                 id: 5,
   * //                 parent_id: 4,
   * //                 children: []
   * //               }
   * //             ]
   * //           }
   * //         ]
   * //       },
   * //       {
   * //         id: 3,
   * //         parent_id: 1,
   * //         children: []
   * //       }
   * //     ]
   * //   }
   * // ]
   */
  nest: (root_id?: number | string | null, link?: string) => any[]
  /**
   * Pick the specified props from elements in the array
   *
   * @example
   *
   * [{ id: 1, name: 'a', age: 12 }, { id: 2, name: 'b', age: 13 }].pick([id, name]) // [{ id: 1, name: 'a' }, { id: 2, name: 'b' }]
   * [{ id: 1, name: 'a', age: 12 }, { id: 2, name: 'b', age: 13 }].pick(val => typeof val === 'number') // [{ id: 1, age: 12 }, { id: 2, age: 13 }]
   */
  pick: (handler: string[] | ((val: any) => any)) => any[]

  [prop: string]: any
}

function findByIndex(target: any[], index: string | number) {
  return Reflect.get(target, +index < 0 ? (target.length + +index) + '' : index)
}

function findByDist(target: any[], dist: string) {
  let lists: string[]
  let len = target.length

  if ((lists = dist.split(':')).length > 1) {
    let start = 0, end = 0, step = 0

    start = +(lists[0] && lists[0].trim()) || 0
    end = +(lists[1] && lists[1].trim()) || len
    step = +(lists[2] && lists[2].trim()) || 1

    start = +start
    end = +end

    if (start < 0) {
      start = len + start
    }
    if (end < 0) {
      end = len + end
    }
    if (start > len - 1) {
      start = len
    }
    if (end > len - 1) {
      end = len
    }
    if (start > end) {
      [start, end] = [end, start]
    }
    let reverse = false
    if (step < 0) {
      step = -step
      reverse = true
    }

    let i = start
    let result: unknown[] = []
    while (i < end) {
      result.push(findByIndex(target, i))
      i += step
    }

    // reverse array
    if (reverse) {
      let left = 0
      let right = result.length - 1
      while (left < right) {
        [result[left], result[right]] = [result[right], result[left]]
        left += 1
        right -= 1
      }
    }

    return result
  }
}

function batchRemove(target: any[]) {
  let argLists: any[] = []

  return function(...args: any[]) {
    let indexes = new Set()
    for (let i = 0; i < args.length; i++) {
      argLists.push(args[i])
    }

    forEach(argLists, function iteratee(indexOrFn: any) {
      if (check.num(indexOrFn) || (indexOrFn === +indexOrFn + '')) {
        if (+indexOrFn < 0) {
          indexOrFn = target.length + +indexOrFn
        }
        indexOrFn = +indexOrFn
        if (!indexes.has(indexOrFn)) {
          indexes.add(indexOrFn)
        }
      } else if (check.fun(indexOrFn)) {
        let fn = indexOrFn
        forEach(target, function (val: any, idx: number) {
          if (!indexes.has(idx) && !!fn(val)) {
            indexes.add(idx)
          }
        })
      }
    })

    const temp: any[] = []
    forEach(target, function iteratee(val: any, idx: number) {
      if (!indexes.has(idx)) {
        temp.push(val)
      }
    })
    return temp
  }
}

function shuffle([...result]) {
  let m = result.length

  while (m) {
    let n = Math.floor(Math.random() * m--);

    [result[m], result[n]] = [result[n], result[m]]
  }

  return result
}

function nestArray(target: any[]) {
  return function nest(id = null, link = 'parent_id'): any {
    const arr: any[] = target.filter(_ => Object.prototype.hasOwnProperty.call(_, 'id') && Object.prototype.hasOwnProperty.call(_, link))
    return arr.filter(_ => _[link] == id).map(_ => ({ ..._, children: nest(_.id) }))
  }
}

function pick(target: any[]) {
  return function(handler: string[] | (() => any)) {
    const newArr: any[] = []

    if (check.arr(handler)) {
      forEach(target, function iteratee(val: any) {
        if (check.plainObj(val)) {
          let newObj: { [prop: string]: any } = {}

          for (let i = 0; i < handler.length; i++) {
            const key: any = (handler as any[])[i]
            if (!check.str(key)) continue

            if (Object.prototype.hasOwnProperty.call(val, key)) {
              newObj[key] = val[key]
            }
          }

          newArr.push(newObj)
        }
      })

      return newArr
    } else if (check.fun(handler)) {
      const fn = handler as Function
      forEach(target, function iteratee(val: any) {
        if (check.plainObj(val)) {
          let newObj: { [prop: string]: any } = {}

          Object.keys(val).forEach(key => {
            if (!!fn(val[key])) {
              newObj[key] = val[key]
            }
          })

          newArr.push(newObj)
        }
      })

      return newArr
    } else {
      return target
    }
  }
}

export function wow_array(value: object): WowArrayType {
  if (check.undef(value) || !check.arr(value)) {
    value = cast.arr(value)
  }

  const hander = {
    get: function (target: any[], key: any) {
      // [n] [-n]
      if (key === +key + '') {
        return findByIndex(target, key);
      }

      // .first
      if (key === 'first') {
        return findByIndex(target, 0)
      }

      // .last
      if (key === 'last') {
        return findByIndex(target, -1)
      }

      // [1: 2]
      if ((<string>key).split(':').length > 1) {
        return findByDist(target, key + '')
      }

      if (key === 'min') {
        return Math.min.apply(Math, target)
      }

      if (key === 'max') {
        return Math.max.apply(Math, target)
      }

      if (key === 'remove') {
        return batchRemove(target)
      }

      if (key === 'shuffle') {
        return shuffle(target)
      }

      if (key === 'nest') {
        return nestArray(target)
      }

      if (key === 'pick') {
        return pick(target)
      }

      return Reflect.get(target, key)
    }
  }

  return new Proxy(value, hander) as WowArrayType
}