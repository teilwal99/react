const http = require('node:http');
const { AsyncLocalStorage } = require('node:async_hooks');

const asyncLocalStorage = new AsyncLocalStorage();

class Foo {
    #runInAsyncScope = AsyncLocalStorage.snapshot();

    get() { return this.#runInAsyncScope(() => asyncLocalStorage.getStore()); }
}
var idSeq = 123;
http.createServer((req, res) => {
    
    // Enter the context manually
    asyncLocalStorage.enterWith(idSeq);
    const foo = new Foo();
    asyncLocalStorage.disable();
    console.log(asyncLocalStorage.getStore());
    console.log(asyncLocalStorage.run(321, () => foo.get()));
  
  }).listen(8000, () => {
    console.log('Server listening on port 8000');
  });

http.get('http://localhost:8000');
http.get('http://localhost:8000');
// Prints:
//   0: start
//   1: start
//   0: finish
//   1: finish