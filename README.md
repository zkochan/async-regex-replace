<!--@'# ' + package.name-->
# @zkochan/async-replace
<!--/@-->

<!--@package.description-->
String replace using asynchronous replacement functions
<!--/@-->

<!--@shields.flatSquare('travis', 'npm')-->
[![Build status](https://img.shields.io/travis/zkochan/async-replace.svg?style=flat-square)](https://travis-ci.org/zkochan/async-replace)
[![NPM version](https://img.shields.io/npm/v/@zkochan/async-replace.svg?style=flat-square)](https://www.npmjs.com/package/@zkochan/async-replace)
<!--/@-->


## Motivation

*"All I needed"* was a simple function to do `string.replace(/regex/, callback)`, so that I could find some matches in a url
and call my own custom function to return the value to be replaced back into the string. Sounds pretty easy right? It is,
as long as your callback function is syncrhonous. :)

What happens if you need to call an asychronous function to determine the replacement value(s)? Perhaps you are using the
match value to lookup a record in a database. In my case, I needed to perform DNS SRV record lookups to replace hostnames
with the returned *host:port* combination.


<!--@installation()-->
## Installation

This module is installed via npm:

``` sh
npm install @zkochan/async-replace --save
```
<!--/@-->


## Usage

<!--@example('./example.js')-->
``` js
'use strict'
const asyncReplace = require('@zkochan/async-replace')

asyncReplace('String with regex to replace', /regex/g, (match, offset, str, cb) => {
  setTimeout(() => {
    const replacementValue = match.split('').reverse().join('')
    const err = null
    cb(err, replacementValue)
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

The same result can be achieved using promises:

``` js
asyncReplace('String with regex to replace', /regex/g, (match, offset, str) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const replacementValue = match.split('').reverse().join('')
      resolve(replacementValue)
    }, 1000)
  })
})
.then((finalResult) => console.log(finalResult))
//> String with xeger to replace
.catch((err) => console.log('Error - ' + err))
```
<!--/@-->

**NOTE:** In this particular example, the gratuitous use of setTimeout is just to demonstrate the asynchronous functionality in the replacement callback.


<!--@license()-->
## License

MIT © Phillip Markert
<!--/@-->

***

<!--@dependencies()-->
## Dependencies

- [babel-run-async](https://github.com/zkochan/run-async): Utility method to run function either synchronously or asynchronously using the common `this.async()` style.
- [babel-runtime](https://github.com/babel/babel/blob/master/packages): babel selfContained runtime

<!--/@-->
