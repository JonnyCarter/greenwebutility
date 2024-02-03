# Green Web Utility greenwebutility


## Example Use
Install the module:

`npm i greenwebutility`
You can test its working as expected by creating a testing script with the following
// testScript.js
```
const { add, helloNpm } = require('greenwebutility');

// Test the 'add' function
console.log('Testing add function:');
console.log('Result of add(2, 3):', add(2, 3)); // Expected: 5
console.log('Result of add(-1, -2):', add(-1, -2)); // Expected: -3

// Test the 'helloNpm' function
console.log('\nTesting helloNpm function:');
console.log('Result of helloNpm():', helloNpm()); // Expected: 'Hello NPM!'
```
You can run the script and see the output
`node script.js` 