export default {
  request: {
    name: 'fetch',
    returnValue (data) {
      let result = null
      try {
        result = JSON.parse(data.data)
      } catch (e) {
        result = data.data
      }
      return {
        data: result,
        statusCode: data.code,
        header: data.headers
      }
    }
  }
}
