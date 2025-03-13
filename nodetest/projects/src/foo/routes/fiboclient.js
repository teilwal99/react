var http = require('http');

[
 "/fibonacci/30", "/fibonacci/20", "/fibonacci/10",
 "/fibonacci/9", "/fibonacci/8", "/fibonacci/7",
 "/fibonacci/6", "/fibonacci/5", "/fibonacci/4",
 "/fibonacci/3", "/fibonacci/2", "/fibonacci/1"
].forEach(path => {
    console.log('requesting ' + path);
    var req = http.request({
        host: "localhost",
        port: 3002,
        path: path,
        method: 'GET'
    }, res => {
        res.on('data', chunk => {
            console.log('BODY: ' + chunk);
        });
    });
    req.end();
});