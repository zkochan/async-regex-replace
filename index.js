'use strict'
module.exports = asyncRegexReplace

/**
 * Replaces instances of the regex in str using the asynchronous callback function, replacer
 *
 * @param {regex} regex The regex object to execute.
 * @param {string} str The string to be matched
 * @param {function} replacer The asynchronous callback function called to translate matches into replacements
 * @param {function} done The callback function invoked on completion or error
 *
 * The replacer callback should take two parameters (match, callback). match is the result from regex.exec(), including capturing groups.
 *  callback should be invoked with (err, replacement_value) when done.
 *
 * The done callback will be invoked with (err, result) once all replacements have been processed.
 *
 */
function asyncRegexReplace (regex, str, replacer, done, prev) {
  prev = prev || 0
  regex.lastIndex = 0
  const match = regex.exec(str)
  if (match == null) { // No matches, we are done.
    done(null, str)
  } else {
    // Found a match, call the async replacer
    replacer.apply(null, match.concat([prev + match.index, str, next]))
  }

  function next (err, result) {
    if (err) { // If the replacer failed, callback and pass the error
      return done(err, result)
    }
    const matchIndex = match.index
    const matchLength = match[0].length
    // Splice the replacement back into the string
    const accum = str.substring(0, matchIndex) + result
    const rest = str.substring(matchIndex + matchLength)
    if (regex.global) { // Keep replacing
      asyncRegexReplace(regex, rest, replacer, (err, remaining) => {
        done(err, accum + remaining)
      }, prev + matchIndex + matchLength)
    } else {
      done(null, accum + rest)
    }
  }
}
