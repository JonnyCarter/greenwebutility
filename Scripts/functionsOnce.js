var once = function(fn) {
    let called = false; // Tracks if the function has been called
    let result; // Stores the result of the first function call

    return function(...args){
        if (!called) {
        called = true; // Mark the function as called
        result = fn(...args); // Call the function and store the result
        return result; // Return the result of the first call
    }
    return undefined; // Subsequent calls return undefined
    }
}


let fn = (a,b,c) => (a + b + c)
let onceFn = once(fn)
 
console.log(onceFn(1,2,3)); // 6
console.log(onceFn(2,3,6)); // returns undefined without calling fn
console.log(onceFn(4,3,6))
