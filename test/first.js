var querybox = require('../')
var assert = require('assert')
var async = require('async')
var ok = require('okay')

describe('querybox', function() {
  before(function() {
    this.box = querybox(__dirname + '/queries', require('pg-query'))
  })

  before(function(done) {
    var q = this.box.get('create-temp-table')
    require('pg-query')(q, done)
  })

  it('returns a single row', function(done) {
    this.box.first('get-user-by-name', 'brian', ok(done, function(user) {
      assert.equal(user.name, 'brian')
      done()
    }))
  })

  it('returns result without parameters', function(done) {
    this.box.first('first', ok(done, function(time) {
      assert(time.now)
      done()
    }))
  })
})
