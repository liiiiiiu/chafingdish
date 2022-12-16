export function accMul(arg1: number, arg2: number): number {
  let m = 0,
    s1 = arg1.toString(),
    s2 = arg2.toString()

  try {
    m += s1.split(".")[1].length
    // eslint-disable-next-line no-empty
  } catch (e) { }
  try {
    m += s2.split(".")[1].length
    // eslint-disable-next-line no-empty
  } catch (e) { }

  return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
}