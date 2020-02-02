const http = require('http')
const url = require('url')
const path = require('path')
const fs = require('fs')

const httpListenAddr = '0.0.0.0:8878'

http
  .createServer(function(request, response) {
    let uri = url.parse(request.url).pathname,
      filename = path.join(process.cwd(), 'docs', uri)

    const extname = path.extname(filename)
    let contentType = 'text/html'
    switch (extname) {
      case '.js':
        contentType = 'text/javascript'
        break
      case '.css':
        contentType = 'text/css'
        break
      case '.ico':
        contentType = 'image/x-icon'
        break
      case '.svg':
        contentType = 'image/svg+xml'
        break
    }

    fs.access(filename, exists => {
      if (!exists) {
        response.writeHead(404, { 'Content-Type': 'text/plain' })
        response.write('404 Not Found\n')
        response.end()
        return
      }

      if (fs.statSync(filename).isDirectory()) filename += '/index.html'

      fs.readFile(filename, 'binary', (err, file) => {
        if (err) {
          response.writeHead(500, { 'Content-Type': 'text/plain' })
          response.write(err + '\n')
          response.end()
          return
        }
        response.writeHead(200, { 'Content-Type': contentType })
        response.write(file, 'binary')
        response.end()
      })
    })
  })
  .listen(httpListenAddr)

console.log(`Started on ${httpListenAddr}`)
