'use strict'
const asyncReplace = require('.')

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
  }
})
