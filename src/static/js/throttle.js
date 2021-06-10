// 节流函数
export function throttle(fn, delay) {
  let valid = true
  return function(...args) {
      if(!valid) {
          // 休息时间 暂不工作
          return false
      }
      // 工作时间，执行函数并且在间隔期内把状态设定为无效
      valid = false
      setTimeout(() => {
          fn.apply(this, args);
          valid = true
      }, delay)
  }
}