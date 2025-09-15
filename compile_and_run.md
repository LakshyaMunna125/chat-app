# Doubly Linked List C Program

## How to Compile and Run

### Compilation
```bash
gcc doubly_linked_list.c -o doubly_linked_list
```

### Execution
```bash
./doubly_linked_list
```

## Program Features

### Data Structure
- **Node Structure**: Contains `data`, `next` pointer, and `prev` pointer
- **Bidirectional Navigation**: Can traverse forward and backward

### Operations Implemented

1. **Insertion Operations**
   - Insert at beginning
   - Insert at end
   - Insert at specific position

2. **Deletion Operations**
   - Delete from beginning
   - Delete from end
   - Delete specific value

3. **Utility Operations**
   - Search for a value
   - Display list forward
   - Display list backward
   - Get list length
   - Reverse the entire list

4. **Memory Management**
   - Proper memory allocation
   - Memory deallocation
   - Error handling for memory failures

## Sample Usage

```
=== Doubly Linked List Operations ===

--- Menu ---
1. Insert at beginning
2. Insert at end
3. Insert at position
4. Delete from beginning
5. Delete from end
6. Delete specific value
7. Search value
8. Display forward
9. Display backward
10. Get length
11. Reverse list
12. Exit
Enter your choice: 1
Enter data to insert at beginning: 10
Inserted 10 at beginning

Enter your choice: 2
Enter data to insert at end: 20
Inserted 20 at end

Enter your choice: 8
Forward: 10 20

Enter your choice: 9
Backward: 20 10
```

## Key Features

- **Menu-driven interface** for easy testing
- **Robust error handling** for edge cases
- **Memory leak prevention** with proper cleanup
- **Bidirectional traversal** capability
- **Position-based operations** with bounds checking
