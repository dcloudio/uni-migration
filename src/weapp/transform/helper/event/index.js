const evts = {
  'touchstart': '',
  'touchmove': '',
  'touchcancel': '',
  'touchend': '',
  'tap': 'click',
  'longpress': 'longpress',
  'longtap': 'longpress',
  'transitionend': '',
  'animationstart': '',
  'animationiteration': '',
  'animationend': ''
}

export const initEvents = evts => {
  const events = {}
  Object.keys(evts).forEach(name => {
    events['bind' + name] = evts[name]
    events['bind:' + name] = evts[name]
    events['catch' + name] = evts[name]
    events['catch:' + name] = evts[name]
    events['capture-bind' + name] = evts[name]
    events['capture-bind:' + name] = evts[name]
    events['capture-catch' + name] = evts[name]
    events['capture-catch:' + name] = evts[name]
  })
  return events
}

export default initEvents(evts)
