'use strict'
const asyncReplace = require('./dist/index.js')

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

//! The same result can be achieved using promises:

asyncReplace('String with regex to replace', /regex/g, (match, offset, str) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const replacementValue = match.split('').reverse().join('')
      resolve(replacementValue)
    }, 1000)
  })
})
.then((finalResult) => console.log(finalResult))
.catch((err) => console.log('Error - ' + err))
