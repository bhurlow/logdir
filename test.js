
const fs = require('fs')
const fake = require('fakestream')
const es = require('event-stream')
const test = require('tape')
const assert = require('assert')
const request = require('superagent')

//
// this test expects there to be an elasticsearch 
// instance running at: docker:9200
//
// use docker to start dummy:
// docker run -p 9200:9200 elasticsearch
//

fs.readdirSync('./logs')
  .map(x => {
    fs.unlinkSync('./logs/' + x)
  })

fs.rmdirSync('./logs')
fs.mkdirSync('./logs')

var x = 10
while (x--) {
  var s = fs.createWriteStream(`./logs/${x}.log`)
    s.write(JSON.stringify({ test: x }) + '\n')
    s.write(JSON.stringify({ test: x }) + '\n')
    s.write(JSON.stringify({ test: x }) + '\n')
    s.write(JSON.stringify({ test: x }) + '\n')
}

// ensure es access
request
  .get('docker:9200')
  .end((err, res) => {
    if (200 != res.status)
      throw new Error('cant find elasticsearch, bailing')
  })


// test('watch dir', (t) => {
//   t.ok()
// })
