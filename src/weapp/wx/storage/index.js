const setStorage = {
  name: 'set',
  args (params) {
    return {
      value: params.data
    }
  },
  returnValue () {
    return {}
  }
}

const getStorage = {
  name: 'get',
  returnValue (data) {
    return {
      data: data
    }
  }
}

const removeStorage = {
  name: 'delete',
  returnValue () {
    return {}
  }
}
const clearStorage = {
  name: 'clear'
}

export default {
  // 暂不支持wx.getStorageInfo()
  setStorage,
  setStorageSync: setStorage,
  getStorage,
  getStorageSync: getStorage,
  removeStorage,
  removeStorageSync: removeStorage,
  clearStorage,
  clearStorageSync: clearStorage
}
