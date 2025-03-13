const { parentPort, threadId } = require('node:worker_threads');
parentPort.on('message', (task,workerId) => {
    const result = { workerId: threadId, sum: task.a + task.b };

    parentPort.postMessage(result);
});