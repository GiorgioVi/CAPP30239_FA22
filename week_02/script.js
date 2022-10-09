
let num = 100;

function foo() {
    console.log(num)
    let num1 = 200;
    
};

// foo();


let anonFun = function(){
    console.log('hello');
};

(function(){
    console.log('Hello');
}) ();

let food = () => console.log(num);

let fook = () => console.log(num)


let arr = ['food',123,['pe','fasho']]
console.log(arr)
console.log(arr[2][0])

arr[1] = 'barbar'
console.log(arr)

arr.push('cheese')
console.log(arr)