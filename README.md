# querybox

A little helper to read a directory full of `.sql` files and execute them

## install

```bash
$ npm install querybox
```

## use

```js
var pgQuery = require('pg-query')
var querybox = require('querybox')

var pathToQueriesDirectory = __dirname + '/queries'

//expect the /queries folder structure to look like this:
// - queries/get-user.sql
// - queries/get-photos.sql

var box = querybox(pathToQueriesDirectory, pgQuery)


//get a query by name
console.log(box.get('get-user')) //the contents of the queries/get-user.sql file

console.log(box.get('blaaaa')) //false

//gets the query text from the file
//then passes the text, parameters, and the callback
//to whatever supplied query function you've given
box.run('get-user', [userId], function(err, rows) {
  console.log(rows[0].name) //brian
})

```


## license

The MIT License (MIT)

Copyright (c) 2014 Brian M. Carlson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
