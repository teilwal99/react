var http = require('http');
var server = http.createServer();
server.on('request', (req, res) => {
 res.writeHead(200, {'Content-Type': 'text/plain'});
 res.end('Hello, World!\n');
});
server.listen(8124, '127.0.0.1');
console.log('Server running at http://127.0.0.1:8124');
/*
const obj1 = {
  a: {
    b: 1,
    c:2
  },
};
const obj2 = {
  a: {
    b: 2,
  },
};
const obj3 = {
  a: {
    c:2,
    b: 1
  },
};
let txt;
try {
  assert.deepEqual(obj1, obj3);
  txt = 'Assertion Passed: obj1 and obj3 are deeply equal';
} catch (error) {
  txt = `Assertion Failed: ${error.message}`;
}

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(txt);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
*/