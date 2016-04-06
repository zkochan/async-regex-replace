'use strict'
const asyncRegexReplace = require('.')

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
  }
})
