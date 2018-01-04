var glob = require('glob')
var path = require('path')
var fs = require('fs')
var util = require('util')

var read = function(basePath, filePath) {
  var contents = fs.readFileSync(filePath, 'utf8')

  var relativePath = path.relative(basePath, filePath)
  var fileParts = path.parse(relativePath)
  var name = path.join(fileParts.dir, fileParts.name)

  return {
    name: name,
    contents: contents
  }
}

var readAll = function(path) {
  var files = glob.sync(path + '/**/*.sql')
  return files.map(read.bind(null, path))
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

Box.prototype._run = function(queryFn, name, qValues, cb) {
  var qText = this.get(name)
  if(!qText) {
    var err = new Error('Could not find named query file ' + name + '.sql')
    return (cb || qValues)(err)
  }
  if(typeof qValues == 'function') {
    cb = qValues
    qValues = null
  }
  var query = {
    name: name,
    text: qText,
    values: qValues
  }
  queryFn(query, cb)

}

Box.prototype.run = function(name, qValues, cb) {
  return this._run(this.queryFn, name, qValues, cb)
}

Box.prototype.first = function(name, qValues, cb) {
  if(typeof qValues != 'function') {
    qValues = util.isArray(qValues) ? qValues : [qValues]
  }
  return this._run(this.queryFn.first, name, qValues, cb)
}

module.exports = function(path, queryFn) {
  return new Box(path, queryFn)
}
