export default {
  change: {
    detail: function (evt) {
      return {
        value: evt.value,
        cursor: evt.value.length
      }
    }
  },
  focus: {
    detail: function (evt) {
      return {
        value: '',
        height: ''
      }
    }
  },
  blur: {
    detail: function (evt) {
      return {
        value: '',
        cursor: ''
      }
    }
  }
}
