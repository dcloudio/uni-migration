export default {
  name: 'image',
  attr: {
    'src': 'src',
    'mode': (value, attr) => {
      switch (value) {
        case 'scaleToFill':
          return 'STYLE:resize-mode:stretch'
        case 'aspectFit':
          return 'STYLE:resize-mode:contain'
        case 'aspectFill':
          return 'STYLE:resize-mode:contain'
        case 'widthFix':
          return 'STYLE:resize-mode:cover'
        default:
          return 'STYLE:resize-mode:cover'
      }
    }
  },
  event: {}
}
