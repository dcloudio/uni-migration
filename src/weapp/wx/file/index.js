export default {
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
