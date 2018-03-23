const path = require('path')

global.$app_require$ = () => {}
require(path.join(__dirname.replace('test', 'lib'), './quickapp/index')).default