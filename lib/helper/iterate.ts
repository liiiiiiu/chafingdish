import Check from './check'
import Cast from './cast'

const check = new Check()

const cast = new Cast()

interface objType {
  [key: string]: any
}

export function forEach(obj: unknown, fn: Function) {
  if (check.nul(obj) || check.undef(obj)) return

  if (!check.obj(obj)) {
    obj = cast.arr(obj)
  }

  if (check.arr(obj)) {
    for (let i = 0; i < (<[]>obj).length; i++) {
      fn.call(null, (<[]>obj)[i], i, obj)
    }
  } else {
    for (let key in (<{}>obj)) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, (<objType>obj)[key], key, obj)
      }
    }
  }
}