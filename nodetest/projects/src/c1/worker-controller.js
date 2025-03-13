const WorkerPool = require('./worker-pool.js');

const pool = new WorkerPool(4); // Create a pool with 4 worker threads
let finished = 0;

for (let i = 0; i < 10; i++) {
  pool.runTask({ a: i, b: i * 10 }, (err, result) => {
    if (err) {
      console.error(`Task ${i} failed:`, err);
    } else {
        console.log(`Task ${i} result: ${result.sum} (handled by Worker ${result.workerId})`);
    }

    if (++finished === 10) {
      console.log('All tasks finished, closing the pool.');
      pool.close();
    }
  });
}
