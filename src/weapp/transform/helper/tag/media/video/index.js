export default {
  name: 'video',
  attr: {
    'src': 'src',
    'initial-time': 'I:',
    'duration': 'I:',
    'controls': 'I:',
    'danmu-list': 'I:',
    'danmu-btn': 'I:',
    'enable-danmu': 'I:',
    'autoplay': 'autoplay',
    'loop': 'I:',
    'muted': 'I:',
    'page-gesture': 'I:',
    'direction': 'I:',
    'show-progress': 'I:',
    'show-fullscreen-btn': 'I:',
    'show-play-btn': 'I:',
    'show-center-play-btn': 'I:',
    'enable-progress-gesture': 'I:',
    'objectfit': 'I:',
    'poster': 'poster'
  },
  event: {
    'play': 'start',
    'pause': 'pause',
    'ended': 'finish',
    'timeupdate': 'timeupdate',
    'fullscreenchange': 'fullscreenchange',
    'error': 'error',
    'waiting': ''
  }
}
