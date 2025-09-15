#include <stdio.h>

// Method 1: Using arithmetic operations (addition and subtraction)
void swap_arithmetic(int *a, int *b) {
    printf("Before swap (Arithmetic): a = %d, b = %d\n", *a, *b);
    
    *a = *a + *b;  // a now contains sum of both numbers
    *b = *a - *b;  // b now contains original value of a
    *a = *a - *b;  // a now contains original value of b
    
    printf("After swap (Arithmetic): a = %d, b = %d\n\n", *a, *b);
}

// Method 2: Using arithmetic operations (multiplication and division)
void swap_multiply_divide(int *a, int *b) {
    printf("Before swap (Multiply/Divide): a = %d, b = %d\n", *a, *b);
    
    // Note: This method doesn't work if either number is 0
    if (*a != 0 && *b != 0) {
        *a = *a * *b;  // a now contains product of both numbers
        *b = *a / *b;  // b now contains original value of a
        *a = *a / *b;  // a now contains original value of b
        
        printf("After swap (Multiply/Divide): a = %d, b = %d\n\n", *a, *b);
    } else {
        printf("Cannot use multiply/divide method when one number is 0\n\n");
    }
}

// Method 3: Using XOR bitwise operation
void swap_xor(int *a, int *b) {
    printf("Before swap (XOR): a = %d, b = %d\n", *a, *b);
    
    *a = *a ^ *b;  // a now contains XOR of both numbers
    *b = *a ^ *b;  // b now contains original value of a
    *a = *a ^ *b;  // a now contains original value of b
    
    printf("After swap (XOR): a = %d, b = %d\n\n", *a, *b);
}

// Method 4: Using single line arithmetic
void swap_single_line(int *a, int *b) {
    printf("Before swap (Single Line): a = %d, b = %d\n", *a, *b);
    
    *a = *a + *b - (*b = *a);
    
    printf("After swap (Single Line): a = %d, b = %d\n\n", *a, *b);
}

int main() {
    printf("=== Program to Swap Two Numbers Without Using Third Variable ===\n\n");
    
    // Test with different pairs of numbers
    int num1, num2;
    
    // Test case 1: Regular positive numbers
    printf("TEST CASE 1: Regular positive numbers\n");
    printf("Enter two numbers: ");
    scanf("%d %d", &num1, &num2);
    
    int a1 = num1, b1 = num2;
    swap_arithmetic(&a1, &b1);
    
    int a2 = num1, b2 = num2;
    swap_multiply_divide(&a2, &b2);
    
    int a3 = num1, b3 = num2;
    swap_xor(&a3, &b3);
    
    int a4 = num1, b4 = num2;
    swap_single_line(&a4, &b4);
    
    // Test case 2: With negative numbers
    printf("TEST CASE 2: With negative numbers\n");
    int neg1 = -15, neg2 = 25;
    printf("Testing with numbers: %d and %d\n", neg1, neg2);
    
    int a5 = neg1, b5 = neg2;
    swap_arithmetic(&a5, &b5);
    
    int a6 = neg1, b6 = neg2;
    swap_xor(&a6, &b6);
    
    // Test case 3: With zero
    printf("TEST CASE 3: With zero\n");
    int zero = 0, nonzero = 42;
    printf("Testing with numbers: %d and %d\n", zero, nonzero);
    
    int a7 = zero, b7 = nonzero;
    swap_arithmetic(&a7, &b7);
    
    int a8 = zero, b8 = nonzero;
    swap_xor(&a8, &b8);
    
    printf("=== Summary of Methods ===\n");
    printf("1. Arithmetic (+ and -): Works with all integers, risk of overflow\n");
    printf("2. Multiply/Divide: Doesn't work with zero, risk of overflow\n");
    printf("3. XOR: Works with all integers, most efficient, no overflow risk\n");
    printf("4. Single Line: Compact version of arithmetic method\n");
    
    return 0;
}
