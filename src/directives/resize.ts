import { type Directive } from 'vue'
import { throttle, type } from '@/utils/index'

interface ResizeConfig {
  handler: (rect: DOMRectReadOnly) => void
  delay?: number
}

const resize: Directive = {
  mounted(el, binding) {
    const { value = null } = binding

    const valueType = type(value)
    let conf: ResizeConfig = {
      handler: () => {},
      delay: 300
    }
    if (valueType === 'function') {
      conf.handler = value
    } else if (valueType === 'object') {
      conf = { ...value }
    }
    // 如果支持 ResizeObserver 则使用 ResizeObserver
    // 否则使用 MutationObserver
    if ('ResizeObserver' in window || 'ResizeObserver' in globalThis) {
      const cb = throttle((entries: ResizeObserverEntry[]) => {
        entries.forEach((entry) => {
          conf.handler(entry.contentRect)
        })
      }, conf.delay)
      const observer = new ResizeObserver(cb)
      observer.observe(el)
      el._resize = observer
    } else {
      let lastSize = {
        width: el.offsetWidth,
        height: el.offsetHeight
      }
      const cb: MutationCallback = throttle(() => {
        const newSize = {
          width: el.offsetWidth,
          height: el.offsetHeight
        }

        if (newSize.width !== lastSize.width || newSize.height !== lastSize.height) {
          lastSize = newSize
          conf.handler(new DOMRectReadOnly(0, 0, newSize.width, newSize.height))
        }
      }, conf.delay)
      const observer = new MutationObserver(cb)
      observer.observe(el, { attributes: true, childList: true, subtree: true })
      el._resize = observer
    }
  },
  beforeUnmount(el) {
    el._resize.disconnect()
  }
}

export { resize as vResize }
export default resize
