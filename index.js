var glob = require('glob')
var path = require('path')
var fs = require('fs')

var read = function(filePath) {
  var contents = fs.readFileSync(filePath, 'utf8')
  var name = path.basename(filePath, '.sql')
  return {
    name: name,
    contents: contents
  }
}

var readAll = function(path) {
  var files = glob.sync(path + '/**/*.sql')
  return files.map(read)
}

var Box = function(path, queryFn) {
  var queries = this.queries = {}
  this.queryFn = queryFn
  readAll(path).forEach(function(q) {
    queries[q.name] = q
  })
}

Box.prototype.get = function(name) {
  return (this.queries[name]||0).contents || false
}

Box.prototype.run = function(name, qValues, cb) {
  var qText = this.get(name)
  if(!qText) return cb(new Error('Could not find named query file ' + name + '.sql'))
  this.queryFn(qText, qValues, cb)
}

module.exports = function(path, queryFn) {
  return new Box(path, queryFn)
}
