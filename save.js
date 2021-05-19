import request from 'request'
import fs from 'fs'

request
    .get('http://.com')
    .on('error', function(err) {
        console.error(err)
    })
    //.pipe(fs.createWriteStream('doodle.png'))