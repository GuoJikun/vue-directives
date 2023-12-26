type Fn = (...arg: any[]) => void

export const throttle = (fn: Fn, delay = 300) => {
  let timer: any = null
  return function (this: Function, ...rest: any[]) {
    if (timer) {
      return
    }
    timer = setTimeout(() => {
      fn.apply(this, rest)
      clearTimeout(timer)
      timer = null
    }, delay)
  }
}

export const debounce = (fn: Fn, delay = 300) => {
  let timer: any = null
  return function (this: Function, ...rest: any[]) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, rest)
    }, delay)
  }
}

/**获取变量类型 */
export const type = <T>(obj: T): string => {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
}
