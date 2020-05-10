// 封装本地存储模块

export const setItem = (name, value) => {
  // 如果是对象格式得数据,就转为字符串格式得
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  return window.localStorage.setItem(name, value)
}
export const getItem = name => {
  const data = window.localStorage.getItem(name)
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}
export const removeItem = name => {
  window.localStorage.removeItem(name)
}
