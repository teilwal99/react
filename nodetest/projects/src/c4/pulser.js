const { EventEmitter } = require('events');
// Define the Pulser object
// using modern ES6 class syntax instead util
class Pulser extends EventEmitter {
    start() {
        let i = 0;
        setInterval(() => {
            console.log('>>>> pulse');
            this.emit('pulse',++i);
            console.log('<<<< pulse');
        }, 1000);
    }
}

/*util.inherits(Pulser, events.EventEmitter);
function Pulser() {
    events.EventEmitter.call(this);
}
Pulser.prototype.start = function() {
    setInterval(() => {
    util.log('>>>> pulse');
    this.emit('pulse');
    util.log('<<<< pulse');
    }, 1000);
};
*/

const myEmitter = new Pulser();

myEmitter.on('pulse', (a) => {
    console.log('pulse received' , a);
});
myEmitter.start();
