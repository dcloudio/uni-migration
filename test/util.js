const util = require('util')
module.exports = {
  inspect: v => console.log(util.inspect(v, {
    depth: null,
    colors: true
  }))
}