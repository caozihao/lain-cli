# lain-cli [![NPM version](https://badge.fury.io/js/lain-cli.svg)](https://npmjs.org/package/lain-cli) [![Build Status](https://travis-ci.org/caozihao/lain-cli.svg?branch=master)](https://travis-ci.org/caozihao/lain-cli)

> 一个简易的脚本，实现的功能是能够从远程拉项目到本地
> 预置两种脚手架 gulp 和 webpack

## Installation

```sh
$ npm install --save lain-cli
```

## Usage

```js
var lainCli = require('lain-cli');
lainCli();
```

##  mode

1,  查看有哪些脚手架 ( 内置一个 gulp 和 webpack 脚手架 ) 

        lain  list

2,  初始化template.json

        lain init

3,  添加一个脚手架 ( 会在template.json里添加一条信息 )

        lain  add

4,  删除一个脚手架 ( 会从template.json里删除一条信息 )

        lain delete



## License

MIT © [caozihao](https://github.com/caozihao)
