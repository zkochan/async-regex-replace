'use strict'
const describe = require('mocha').describe
const it = require('mocha').it
const asyncRegexReplace = require('..')
const expect = require('chai').expect

const replacers = {
  simple (match, offset, original, cb) {
    if (match === 'match') {
      cb(null, 'replace')
    } else {
      cb('Unexpected match - ' + match)
    }
  },
  reverse (match, offset, original, cb) {
    cb(null, match.split('').reverse().join(''))
  },
  recurring (match, offset, original, cb) {
    cb(null, '[' + match + '](' + match + ')')
  }
}

describe('async-regex-replace', () => {
  describe('replace', () => {
    function runTest (test, done) {
      asyncRegexReplace(test.regex, test.string, test.replacer, function (err, result) {
        if (err) done(err)
        expect(test.expected).to.equal(result)
        done()
      })
    }

    it('no matches', (done) => {
      runTest({
        regex: /nomatch/,
        string: 'Test String',
        expected: 'Test String',
        replacer: null
      },
        done)
    })

    it('single match, simple replace', (done) => {
      runTest({
        regex: /match/,
        string: 'This is the string to match.',
        expected: 'This is the string to replace.',
        replacer: replacers.simple
      },
        done)
    })

    it('single match, reverse replace', (done) => {
      runTest({
        regex: /match/,
        string: 'This is the string to match.',
        expected: 'This is the string to hctam.',
        replacer: replacers.reverse
      },
        done)
    })

    it('single match, case-insensitive, reverse replace', (done) => {
      runTest({
        regex: /match/i,
        string: 'This is the string to mATCh.',
        expected: 'This is the string to hCTAm.',
        replacer: replacers.reverse
      },
        done)
    })

    it('single match, recurring replace', (done) => {
      runTest({
        regex: /match/g,
        string: 'This is the string to match.',
        expected: 'This is the string to [match](match).',
        replacer: replacers.recurring
      },
        done)
    })

    it('multiple matches, simple replace, global flag missing', (done) => {
      runTest({
        regex: /match/,
        string: 'The first should match but the second will not match.',
        expected: 'The first should replace but the second will not match.',
        replacer: replacers.simple
      },
        done)
    })

    it('multiple matches, simple replace', (done) => {
      runTest({
        regex: /match/g,
        string: 'The first should match and the second should match.',
        expected: 'The first should replace and the second should replace.',
        replacer: replacers.simple
      },
        done)
    })

    it('multiple matches, recurring replace', (done) => {
      runTest({
        regex: /match/g,
        string: 'The first should match and the second should match.',
        expected: 'The first should [match](match) and the second should [match](match).',
        replacer: replacers.recurring
      },
        done)
    })

    it('should pass the matches to the replacer', (done) => {
      asyncRegexReplace(/foo (bar) (qar)/g, 'foo bar qar', function (match, bar, qar, offset, target, cb) {
        expect(bar).to.equal('bar')
        expect(qar).to.equal('qar')
        cb()
      }, () => {
        done()
      })
    })

    it('should pass the correct offset', (done) => {
      const offsets = [0, 4, 8]
      let matchNo = 0
      asyncRegexReplace(/foo/g, 'foo foo foo', function (match, offset, target, cb) {
        expect(match).to.equal('foo')
        expect(offset).to.equal(offsets[matchNo])
        matchNo++
        cb()
      }, () => {
        done()
      })
    })
  })
})
