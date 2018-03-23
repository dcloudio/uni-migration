#!/usr/bin/env node

const path = require('path')
const fs = require('fs-extra')
const Program = require('commander')
const migrate = require('../lib')
const pkg = require('../package.json')

Program
  .description('小程序转换工具')
  .usage('[options] [input_dir] output_dir')
  .option('-v, --version', '版本号')
  .option('--sign', '生成sign目录')
  .option('--stat', '生成dcloud_stat统计代码')
  .option('-p, --platform [platform]', '可选`quickapp`|`uniapp`,目前仅支持小程序向quickapp或uniapp转换')
  .parse(process.argv)

if (Program.help === undefined) {
  Program.outputHelp()
  process.exit(0)
}

if (Program.version === undefined) {
  console.log(pkg.version)
  process.exit(0)
}

if (!Program.args.length) {
  Program.outputHelp()
  process.exit(0)
}

const platform = Program.platform || 'quickapp'

const options = {
  target: platform,
  sign: !!Program.sign,
  stat: !!Program.stat
}

if (Program.args.length >= 2) {
  migrate(path.resolve(Program.args[0]), path.resolve(Program.args[1]), options)
} else {
  migrate(path.resolve(), path.resolve(Program.args[0]), options)
}