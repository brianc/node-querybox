var querybox = require('../')
var assert = require('assert')
describe('querybox', function() {
  before(function() {
    this.box = querybox(__dirname + '/queries', require('pg-query'))
  })

  it('has queries', function() {
    assert.equal(this.box.get('first'), 'SELECT now();\n')
  })

  it('returns false if query is missing', function() {
    assert.strictEqual(this.box.get('asdf'), false)
  })

  it('runs query', function(done) {
    this.box.run('first', function(err, rows) {
      if(err) return done(err);
      assert.equal(rows[0].now.getFullYear(), new Date().getFullYear())
      done()
    })
  })

  describe('named query', function() {
    it('runs query with params', function(done) {
      this.box.run('params', ['hi'], function(err, rows) {
        if(err) return done(err);
        assert.equal(rows[0].text, 'hi')
        done()
      })
    })

    it('runs it again!', function(done) {
      this.box.run('params', ['hi'], function(err, rows) {
        if(err) return done(err);
        assert.equal(rows[0].text, 'hi')
        done()
      })
    })
  })
})
