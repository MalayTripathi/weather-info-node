console.log('Starting App');

setTimeout(() => {
    console.log('In the callback');
}, 2000);

setTimeout(() => {
     console.log('Zero Milliseconds');
}, 0);

console.log('Finishing App');