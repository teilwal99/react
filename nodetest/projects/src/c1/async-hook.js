const async_hooks = require('node:async_hooks');
const { createServer } = require('node:http');

const {
    executionAsyncId,
    executionAsyncResource,
    createHook,
} = require('node:async_hooks');
const sym = Symbol('state');

const fs = require('node:fs');
const net = require('node:net');
const { fd } = process.stdout;

createHook({
    init(asyncId, type, triggerAsyncId, resource) {
      const cr = executionAsyncResource();
      if (cr) {
        resource[sym] = cr[sym];
      }
    },
  }).enable();

let indent = 0;
async_hooks.createHook({
  init(asyncId, type, triggerAsyncId) {
    const eid = async_hooks.executionAsyncId();
    const indentStr = ' '.repeat(indent);
    fs.writeSync(
      fd,
      `${indentStr}-${type}(${asyncId}):` +
      ` trigger: ${triggerAsyncId} execution: ${eid}\n`);
  },
  before(asyncId) {
    const indentStr = ' '.repeat(indent);
    fs.writeSync(fd, `${indentStr}-before:  ${asyncId}\n`);
    indent += 2;
  },
  after(asyncId) {
    indent -= 2;
    const indentStr = ' '.repeat(indent);
    fs.writeSync(fd, `${indentStr}-after:  ${asyncId}\n`);
  },
  destroy(asyncId) {
    const indentStr = ' '.repeat(indent);
    fs.writeSync(fd, `${indentStr}-destroy:  ${asyncId}\n`);
  },
}).enable();

const server = createServer((req, res) => {
    executionAsyncResource()[sym] = { state: req.url };
    res.end(JSON.stringify(async_hooks.executionAsyncResource()[sym]));
}).listen(8000, () => {
  // Let's wait 10ms before logging the server started.
  
  setTimeout(() => {
    console.log('>>>', async_hooks.executionAsyncId(),async_hooks.executionAsyncResource());
  }, 10);
});