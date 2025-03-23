
functionsArray=[x => x + 1, x => x * x, x => 2 * x];
emptyArray=[];
brokern=[1,2];

var compose = functions => {
    let result;
    if(functions.length===0){
        console.log(`Empty Array`);
        return 42;
    }else{
        for (const functionn of functions) {
        //console.log(`Value: ${functionn}`);
        //console.log(`Typeof: ${typeof functionn}`);
            if (typeof functionn !== 'function') {
                return 42;
                //throw new TypeError(`Expected a function, but received ${typeof functionn}`);
            }
            console.log(functionn(Number(result)))
            result = functionn(Number(result));
        }
    }
  return result;
};
console.log(compose(functionsArray));
//console.log(compose(emptyArray));
//console.log(compose(brokern));