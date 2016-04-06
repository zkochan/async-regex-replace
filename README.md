# async-regex-replace

node.js library for regex replacements using asynchronous callback functions

<!--@shields.flatSquare('travis', 'npm')-->
[![Build status](https://img.shields.io/travis/zkochan/async-regex-replace.svg?style=flat-square)](https://travis-ci.org/zkochan/async-regex-replace)
[![NPM version](https://img.shields.io/npm/v/@zkochan/async-regex-replace.svg?style=flat-square)](https://www.npmjs.com/package/@zkochan/async-regex-replace)
<!--/@-->


## Motivation

*"All I needed"* was a simple function to do `string.replace(/regex/, callback_function)` so that I could find some matches in a url
and call my own custom function to return the value to be replaced back into the string. Sounds pretty easy right? It is,
as long as your callback function is syncrhonous. :)

What happens if you need to call an asychronous function to determine the replacement value(s)? Perhaps you are using the
match value to lookup a record in a database. In my case, I needed to perform DNS SRV record lookups to replace hostnames
with the returned host:port combination.


<!--@installation()-->
## Installation

This module is installed via npm:

``` sh
npm install @zkochan/async-regex-replace --save
```
<!--/@-->


## Usage

<!--@example('./example.js')-->
``` js
'use strict'
const asyncRegexReplace = require('@zkochan/async-regex-replace')

asyncRegexReplace(/regex/g, 'String with regex to replace', (match, offset, original, cb) => {
  setTimeout(() => {
    const replacement_value = match.split('').reverse().join('')
    const err = null
    cb(err, replacement_value)
  }, 1000)
}, (err, finalResult) => {
  if (err) {
    console.log('Error - ' + err)
  } else {
    console.log(finalResult)
    //> String with xeger to replace
  }
})
```
<!--/@-->

NOTE: In this particular example, the gratuitous use of setTimeout is just to demonstrate the asynchronous functionality in the replacement callback.


<!--@license()-->
## License

MIT © Phillip Markert
<!--/@-->
