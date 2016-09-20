
const es = require('event-stream')
const fs = require('fs')

var fileStreams = {}

function log() {
  var args = [].slice.call(arguments)
  console.log(args.join(' '))
}

var target = 'logs' 
var watcher = fs.watch(__dirname + '/' + target, (eventType, filename) => {
  if (filename) {
    if (!fileStreams[filename]) {
      var path = __dirname + `/${target}/${filename}`
      log('streaming from', path)
      var s = fs.createReadStream(path)
      fileStreams[filename] = s
      streamToEs(s)
    }
  }
});

function docToEs(doc) {
  console.log(doc)
}

function streamToEs(s) {
  s.pipe(es.split())
   .pipe(es.parse())
   .pipe(es.through(docToEs))
}
