var fibonacci = exports.fibonacci = function(n) {
    if (n === 1) return 1;
    else if (n === 2) return 1;
    else return fibonacci(n-1) + fibonacci(n-2);
}
var fibonacciAsync = exports.fibonacciAsync = function(n, done) {
    if (n === 0)
    done(undefined, 0);
    else if (n === 1 || n === 2)
    done(undefined, 1);
    else {
        setImmediate(function() {
            fibonacciAsync(n-1, function(err, val1) {
                if (err) done(err);
                else setImmediate(function() {
                    fibonacciAsync(n-2, function(err, val2) {
                        if (err) done(err);
                        else done(undefined, val1+val2);
                    });
                });
            });
        });
    }
}