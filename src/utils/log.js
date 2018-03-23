import chalk from 'chalk'

export const copy = (msg, loc, path) => console.log(chalk.green('COPY: ' + msg + (loc ? ('\t\n@' + loc.line + ':' + loc.column + ' in ' + path) : '')))
export const info = (msg, loc, path) => console.log(chalk.green('INFO: ' + msg + (loc ? ('\t\n@' + loc.line + ':' + loc.column + ' in ' + path) : '')))
export const warn = (msg, loc, path) => console.log(chalk.yellow.bold('WARN: ' + msg + (loc ? ('\t\n@' + loc.line + ':' + loc.column + ' in ' + path) : '')))
export const ignore = (msg, loc, path) => console.log(chalk.yellow.bold('IGNORE: ' + msg + (loc ? ('\t\n@' + loc.line + ':' + loc.column + ' in ' + path) : '')))
export const error = (msg, loc, path) => console.log(chalk.red.bold('ERROR: ' + msg + (loc ? ('\t\n@' + loc.line + ':' + loc.column + ' in ' + path) : '')))

export const logError = (logs, file) => {
  logs && logs.length && logs.forEach(log => {
    if (log.reason.indexOf('I:') === 0) {
      // ignore(log.reason.replace('I:', ''), log, file)
    } else if (log.reason.indexOf('W:') === 0) {
      warn(log.reason.replace('W:', ''), log, file)
    } else if (log.reason.indexOf('E:') === 0) {
      error(log.reason.replace('E:', ''), log, file)
    } else {
      console.log(log.reason + '\t\n@' + log.line + ':' + log.column + ' in ' + file)
    }
  })
  return false // TODO ERROR时暂不影响整体编译
}
