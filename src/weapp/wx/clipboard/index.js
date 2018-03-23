export default {
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
