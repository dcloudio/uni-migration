(function () {
'use strict';

var barcode = {
  scanCode: {
    name: 'scan'
    // args无onlyFromCamera、scanType参数。
    // returnValue无scanType、charSet、path参数。
  }
}

var brightness = {
  setScreenBrightness: {
    name: 'setValue'
  },
  getScreenBrightness: {
    name: 'getValue',
    returnValue (data) {
      const value = String(data.value / 255).substring(0, 7);
      return {
        value: value
      }
    }
  }
  // TODO...
}

var clipboard = {
  setClipboardData: {
    name: 'set',
    args (params) {
      return {
        text: params.data
      }
    }
  },
  getClipboardData: {
    name: 'get',
    returnValue (data) {
      return {
        data: data.text
      }
    }
  }
  // TODO...
}

const getSystemInfo = {
  name: 'getInfo',
  returnValue (data) {
    // uniapp没有pixelRatio、windowWidth、windowHeight、statusBarHeight、language、version、fontSizeSetting、SDKVersion
    return {
      'brand': data.brand,
      'model': data.model,
      'screenWidth': data.screenWidth,
      'screenHeight': data.screenHeight,
      'system': data.osVersionCode,
      'platform': data.platformVersionName,
      'pixelRatio': '',
      'windowWidth': '',
      'windowHeight': '',
      'statusBarHeight': '',
      'language': '',
      'version': '',
      'fontSizeSetting': '',
      'SDKVersion': ''
    }
  }
};

var device = {
  getSystemInfo
}

var fetch = {
  request: {
    name: 'fetch',
    returnValue (data) {
      let result = null;
      try {
        result = JSON.parse(data.data);
      } catch (e) {
        result = data.data;
      }
      return {
        data: result,
        statusCode: data.code,
        header: data.headers
      }
    }
  }
}

var file = {
  getSavedFileInfo: {
    name: 'get',
    args (params) {
      return {
        uri: params.filePath
      }
    },
    returnValue (data) {
      return {
        createTime: data.lastModifiedTime,
        size: data.length
      }
    }
  },
  removeSavedFile: {
    name: 'delete',
    args (params) {
      return {
        uri: params.filePath
      }
    }
  }
  // 未支持的方法有：saveFile、getSavedFileList、openDocument等。getFileInfo在文档列表中有，但是没有相应的说明。
}

var geolocation = {
  getLocation: {
    name: 'getLocation',
    args: {
      // uniapp没有type、altitude属性
    },
    returnValue: {
      // uniapp没有speed、accuracy、altitude、verticalAccuracy、horizontalAccuracy返回值
    }
  }
}

var media = {
  chooseImage: {
    // 小程序根据sourceType来区分从相册选取还是通过相机拍摄，默认两者都有。
    name: 'pickImage',
    // args无count、sizeType、sourceType参数。
    returnValue (data) {
      return {
        tempFilePaths: [data.uri]
      }
      // returnValue无tempFiles，快应用只支持单选，因而取tempFilePaths的第一项。
    }
  },
  chooseVideo: {
    name: 'pickVideo',
    // args无sourceType、compressed、maxDuration参数。
    returnValue (data) {
      return {
        tempFilePath: data.uri
      }
      // returnValue无duration，size，height，width参数。
    }
  }
  // 未支持的方法有：previewImage、getImageInfo、saveImageToPhotosAlbum、saveVideoToPhotosAlbum等。
}

var network = {
  getNetworkType: {
    name: 'getType',
    returnValue (data) {
      return {
        networkType: data.type
      }
    }
  },
  onNetworkStatusChange: {
    name: 'subscribe',
    args (callback) {
      return {
        callback: callback
      }
    },
    returnValue (data) {
      // returnValue没有isConnected参数。
      return {
        networkType: data.type
      }
    }
  }
}

var prompt = {
  // 暂不支持wx.showLoading(),wx.hideLoading(),wx.hideToast();
  showToast: { // 无icon，image，mask等参数
    name: 'showToast',
    args (params) {
      return {
        message: params.title,
        duration: params.duration > 2000 ? 1 : 0
      }
    }
  },
  showModal: {
    name: 'showDialog',
    args (params) {
      const result = {
        title: params.title,
        message: params.content,
        buttons: [{
          text: '确定',
          color: ''
        }, {
          text: '取消',
          color: ''
        }]
      };
      if (!params.title) {
        delete result.title;
      }
      if (!params.content) {
        delete params.content;
      }
      if (!params.showCancel && typeof params.showCancel === 'boolean') {
        result.buttons.pop();
      }
      if (result.buttons[1] && params.cancelText) {
        result.buttons[1].text = params.cancelText;
      }
      if (result.buttons[1] && params.cancelColor) {
        result.buttons[1].color = params.cancelColor;
      }
      if (params.confirmText) {
        result.buttons[0].text = params.confirmText;
      }
      if (params.confirmColor) {
        result.buttons[0].color = params.confirmColor;
      }
      return result
    },
    returnValue (data) {
      if (data.index === 0) {
        return {
          confirm: true,
          cancel: false
        }
      } else {
        return {
          confirm: false,
          cancel: true
        }
      }
    }
  },
  showActionSheet: {
    name: 'showContextMenu',
    returnValue (data) {
      return {
        tapIndex: data.index
      }
    }
  }
}

var request = {
  uploadFile: {
    name: 'upload',
    args (params) {
      const fileObj = {
        uri: params.filePath
      };
      return {
        url: params.url,
        header: params.header,
        files: [fileObj]
      }
      // args无name、formData参数，filePath被转换为文件数组中的一项。
    },
    returnValue (data) {
      return {
        data: data.data,
        statusCode: data.code
      }
    }
  },
  downloadFile: {
    name: 'download',
    returnValue (data) {
      return {
        statusCode: data.token
      }
      // returnValue没有tempFilePath参数。
    }
  }
}

var router = {
  navigateTo: {
    name: 'push',
    args (params) {
      return {
        uri: params.url
      }
      // 无success，fail，complete等回调函数。
    }
  },
  redirectTo: {
    name: 'replace',
    args (params) {
      return {
        uri: params.url
      }
      // 无success，fail，complete等回调函数。
    }
  },
  navigateBack: {
    name: 'back'
    // 无可传的参数
  },
  switchTab: {
    name: 'replace'
  }
  // 无reLaunch方法。
}

var sensor = {
  // 监听距离感应数据---小程序不支持
  // 监听光线感应数据---小程序不支持
  onCompassChange: {// 不支持wx.startCompass();
    name: 'subscribeCompass',
    args (callback) {
      return {
        callback: callback
      }
    }
  },
  stopCompass: {
    name: 'unsubscribeCompass'
  },
  onAccelerometerChange: {// 不支持wx.startAccelerometer();
    name: 'subscribeAccelerometer',
    args (callback) {
      return {
        callback: callback
      }
    }
  },
  stopAccelerometer: {
    name: 'unsubscribeAccelerometer'
  }
}

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
};

const getStorage = {
  name: 'get',
  returnValue (data) {
    return {
      data: data
    }
  }
};

const removeStorage = {
  name: 'delete',
  returnValue () {
    return {}
  }
};
const clearStorage = {
  name: 'clear'
};

var storage = {
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

var vibrator = {
  // 不区分长短，时间均为1s。
  vibrateLong: {
    name: 'vibrate'
    // args无success，fail，complete等回调函数。
  },
  vibrateShort: {
    name: 'vibrate'
    // args无success，fail，complete等回调函数。
  }
}

var modules = {
  barcode,
  brightness,
  clipboard,
  device,
  fetch,
  file,
  geolocation,
  media,
  network,
  prompt,
  request,
  router,
  sensor,
  storage,
  vibrator
}

const _toString = Object.prototype.toString;
const isPlainObject = v => _toString.call(v) === '[object Object]';

const wx = {};

const createCallback = (callback, methodDef, methodName) => {
  return ret => {
    const data = processData(ret, methodDef.returnValue, methodName, true);
    if (isPlainObject(data) && !data.errMsg) {
      data.errMsg = `${methodName}:ok`;
    }
    callback(data);
  }
};

const processData = (data, def, methodName, isReturn) => {
  if (typeof def === 'function') {
    data = def(data);
  }
  return data
};

const processAsync = (moduleName, methodName, def) => {
  return {
    enumerable: true,
    configurable: true,
    get: function proxyGetter () {
      const methodDef = def[methodName];
      if (typeof methodDef === 'function') {
        return methodDef
      } else {
        return (args) => {
          args = args || {};
          args = Object.assign(args, processData(args, methodDef.args));

          if (typeof args.success === 'function') {
            args.success = createCallback(args.success, methodDef, methodName);
          }
          if (typeof args.complete === 'function') {
            args.complete = createCallback(args.complete, methodDef, methodName);
          }
          if (typeof args.callback === 'function') {
            args.callback = createCallback(args.callback, methodDef, methodName);
          }
          /*eslint-disable no-undef*/
          return uni[moduleName][methodDef.name](args)
        }
      }
    }
  }
};

const processSync = (moduleName, methodName, def) => {
  return {
    enumerable: true,
    configurable: true,
    get: function proxyGetter () {
      const methodDef = def[methodName];
      return async function (args) {
        args = args || {};
        args = processData(args, methodDef.args);
        /*eslint-disable no-undef*/
        return processData(uni[moduleName][methodDef.name](args), methodDef.returnValue)
      }
    }
  }
};

Object.keys(modules).forEach(moduleName => {
  const moduleDef = modules[moduleName];
  Object.keys(moduleDef).forEach(methodName => {
    if (~methodName.indexOf('Sync')) {
      Object.defineProperty(wx, methodName, processSync(moduleName, methodName, moduleDef));
    } else {
      Object.defineProperty(wx, methodName, processAsync(moduleName, methodName, moduleDef));
    }
  });
});

(Object.getPrototypeOf(global) || global).wx = new Proxy(wx, {
  get (target, methodName) {
    if (methodName in target) {
      return target[methodName]
    }
    console.error(`暂不支持"${methodName}"`);
    return () => {}
  }
});

}());
