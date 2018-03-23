export default {
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
