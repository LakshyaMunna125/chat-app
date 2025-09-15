// Program to swap two numbers without using a third variable
// JavaScript implementation

console.log("=== Program to Swap Two Numbers Without Using Third Variable ===\n");

// Method 1: Using arithmetic operations (addition and subtraction)
function swapArithmetic(a, b) {
    console.log(`Before swap (Arithmetic): a = ${a}, b = ${b}`);
    
    a = a + b;  // a now contains sum of both numbers
    b = a - b;  // b now contains original value of a
    a = a - b;  // a now contains original value of b
    
    console.log(`After swap (Arithmetic): a = ${a}, b = ${b}\n`);
    return [a, b];
}

// Method 2: Using arithmetic operations (multiplication and division)
function swapMultiplyDivide(a, b) {
    console.log(`Before swap (Multiply/Divide): a = ${a}, b = ${b}`);
    
    // Note: This method doesn't work if either number is 0
    if (a !== 0 && b !== 0) {
        a = a * b;  // a now contains product of both numbers
        b = a / b;  // b now contains original value of a
        a = a / b;  // a now contains original value of b
        
