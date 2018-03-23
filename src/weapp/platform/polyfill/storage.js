/*eslint-disable camelcase,no-undef*/
const storage = $app_require$('@app-module/system.storage')

export async function getStorageSync (key) {
  return new Promise((resolve, reject) => {
    storage.get({
      key,
      success (data) {
        resolve(data)
      },
      fail (data, code) {
        reject(data)
      }
    })
  })
}
export async function setStorageSync (key, value) {
  return new Promise((resolve, reject) => {
    storage.set({
      key,
      value,
      success (data) {
        resolve(data)
      },
      fail (data, code) {
        reject(data)
      }
    })
  })
}
export async function removeStorageSync (key) {
  return new Promise((resolve, reject) => {
    storage.delete({
      key,
      success (data) {
        resolve(data)
      },
      fail (data, code) {
        reject(data)
      }
    })
  })
}
export async function clearStorageSync () {
  return new Promise((resolve, reject) => {
    storage.clear({
      success (data) {
        resolve(data)
      },
      fail (data, code) {
        reject(data)
      }
    })
  })
}
