var url = require('url');
var http = require('http');
var server = http.createServer();

exports.sniffOn = function(server) {
    server.on('request', (req, res) => {
        console.log('e_request');
        console.log(reqToString(req));
    });

    server.on('close', errno => { console.log('e_close errno='+ errno);});
    
    server.on('checkContinue', (req, res) => {
        console.log('e_checkContinue');
        console.log(reqToString(req));
        res.writeContinue();
    });
    server.on('upgrade', (req, socket, head) => {
        console.log('e_upgrade');
        console.log(reqToString(req));
    });
    server.on('clientError', () => { console.log('e_clientError'); });
};
var reqToString = exports.reqToString = function(req) {
    var ret=`req ${req.method} ${req.httpVersion} ${req.url}` +'\n';
    ret += JSON.stringify(url.parse(req.url, true)) +'\n';
    var keys = Object.keys(req.headers);
    for (var i = 0, l = keys.length; i < l; i++) {
        var key = keys[i];
        ret += `${i} ${key}: ${req.headers[key]}` +'\n';
    }
    if (req.trailers)ret += req.trailers +'\n';
    return ret;
};

require('./httpsniffer').sniffOn(server);
server.listen(8124);
console.log('listening to http://localhost:8124');