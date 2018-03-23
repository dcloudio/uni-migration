export default {
  uploadFile: {
    name: 'upload',
    args (params) {
      const fileObj = {
        uri: params.filePath
      }
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
