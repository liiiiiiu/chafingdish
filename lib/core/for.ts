import { forEach } from '../helper/iterate'

export function for_each(obj: unknown, fn: Function) {
  forEach(obj, fn)
}