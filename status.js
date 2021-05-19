//import request from request;

const request = require('request');
function handler(req, res) {
    request('http://www.softreck.com', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log("URL is OK")
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end('URL is OK');
        } else {
            res.writeHead(500, {'Content-Type': 'text/html'});
            res.end('URL broke:'+JSON.stringify(response, null, 2));
        }
    })
};

require('http').createServer(handler).listen(4000);

//module.exports = handler;