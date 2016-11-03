const test = require('tape')
const path = require('path')
const browserify = require('browserify')
const browserifyPackageJSON = require('../')

test('should strip keys that start from _', (t) => {
  browserify()
    .add(path.join(__dirname, 'main.js'))
    .transform(browserifyPackageJSON, { global: true })
    .bundle((err, result) => {
      t.error(err)
      t.equal(result.toString().match(/"_where"/), null)
      t.end()
    })
})

test('use option `only`', (t) => {
  browserify()
    .add(path.join(__dirname, 'main.js'))
    .transform(browserifyPackageJSON, { global: true, only: ['version'] })
    .bundle((err, result) => {
      t.error(err)
      const content = result.toString()
      const sPos = content.indexOf('.exports=') + 9
      const data = JSON.parse(content.slice(sPos, content.indexOf('}', sPos + 1) + 1))
      t.same(Object.keys(data), ['version'])
      t.end()
    })
})
