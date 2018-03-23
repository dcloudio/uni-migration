export default {
  setScreenBrightness: {
    name: 'setValue'
  },
  getScreenBrightness: {
    name: 'getValue',
    returnValue (data) {
      const value = String(data.value / 255).substring(0, 7)
      return {
        value: value
      }
    }
  }
  // TODO...
}
