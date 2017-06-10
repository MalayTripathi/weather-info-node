var asyncAdd = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(typeof a === 'number' && typeof b === 'number')
            {
                console.log(`I am here to add ${a} and ${b}`);
                resolve(a + b);
            }
            else
            {
                reject('Unable to Add the Numbers');
            }
        }, 1500);
    });
};

asyncAdd(5,'7').then((value) => {
    console.log('Result: ',value);
    return asyncAdd(value,33);
}).then((value) => {
    console.log('Should be 45', value);
}).catch((errorMessage) => {
    console.log(errorMessage);
});

// var somePromise = new Promise((resolve, reject) => {
//     setTimeout(()=>{
//         resolve('Hey! It Worked');
//         resolve(); //It is not gonna fire twice.
//         reject('Fuck Off');
//     }, 2500);
// });

// somePromise.then((message) => {
//     console.log('Success: ',message);
// }, (errorMessage) => {
//     console.log('Error: ', errorMessage);
// })