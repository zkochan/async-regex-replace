import runAsync from 'babel-run-async'

export default runAsync.cb(
  (str, regexp, replacer, done) => asyncReplace(str, regexp, replacer, done)
)

/**
 * Replaces instances of the regex in str using the asynchronous callback function, replacer
 *
 * @param {string} str The string to be matched
 * @param {RegExp} regexp The regex object to execute.
 * @param {function} replacer The asynchronous callback function called to translate matches into replacements
 * @param {function} done The callback function invoked on completion or error
 *
 * The replacer callback should take two parameters (match, callback). match is the result from regex.exec(), including capturing groups.
 *  callback should be invoked with (err, replacement_value) when done.
 *
 * The done callback will be invoked with (err, result) once all replacements have been processed.
 *
 */
function asyncReplace (str, regexp, replacer, done, prev) {
  prev = prev || 0
  regexp.lastIndex = 0
  const match = regexp.exec(str)
  if (match == null) {
    return done(null, str)
  }
  runAsync.cb(replacer, next)(...match, prev + match.index, str)

  function next (err, result) {
    if (err) {
      return done(err, result)
    }
    const matchIndex = match.index
    const matchLength = match[0].length
    // Splice the replacement back into the string
    const accum = str.substring(0, matchIndex) + result
    const rest = str.substring(matchIndex + matchLength)
    if (regexp.global) {
      return asyncReplace(rest, regexp, replacer, (err, remaining) => done(err, accum + remaining), prev + matchIndex + matchLength)
    }
    done(null, accum + rest)
  }
}
