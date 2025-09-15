#include <stdio.h>
#include <stdlib.h>

// Structure for a node in doubly linked list
struct Node {
    int data;
    struct Node* next;
    struct Node* prev;
};

// Function to create a new node
struct Node* createNode(int data) {
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    if (newNode == NULL) {
        printf("Memory allocation failed!\n");
        return NULL;
    }
    newNode->data = data;
    newNode->next = NULL;
    newNode->prev = NULL;
    return newNode;
}

// Function to insert at the beginning
struct Node* insertAtBeginning(struct Node* head, int data) {
    struct Node* newNode = createNode(data);
    if (newNode == NULL) return head;
    
    if (head == NULL) {
        return newNode;
    }
    
    newNode->next = head;
    head->prev = newNode;
    return newNode;
}

// Function to insert at the end
struct Node* insertAtEnd(struct Node* head, int data) {
    struct Node* newNode = createNode(data);
    if (newNode == NULL) return head;
    
    if (head == NULL) {
        return newNode;
    }
    
    struct Node* temp = head;
    while (temp->next != NULL) {
        temp = temp->next;
    }
    
    temp->next = newNode;
    newNode->prev = temp;
    return head;
}

// Function to insert at a specific position
struct Node* insertAtPosition(struct Node* head, int data, int position) {
    if (position < 1) {
        printf("Position should be >= 1\n");
        return head;
    }
    
    if (position == 1) {
        return insertAtBeginning(head, data);
    }
    
    struct Node* newNode = createNode(data);
    if (newNode == NULL) return head;
    
    struct Node* temp = head;
    for (int i = 1; i < position - 1 && temp != NULL; i++) {
        temp = temp->next;
    }
    
    if (temp == NULL) {
        printf("Position out of bounds\n");
        free(newNode);
        return head;
    }
    
    newNode->next = temp->next;
    newNode->prev = temp;
    
    if (temp->next != NULL) {
        temp->next->prev = newNode;
    }
    temp->next = newNode;
    
    return head;
}

// Function to delete from beginning
struct Node* deleteFromBeginning(struct Node* head) {
    if (head == NULL) {
        printf("List is empty\n");
        return NULL;
    }
    
    struct Node* temp = head;
    head = head->next;
    
    if (head != NULL) {
        head->prev = NULL;
    }
    
    printf("Deleted: %d\n", temp->data);
    free(temp);
    return head;
}

// Function to delete from end
struct Node* deleteFromEnd(struct Node* head) {
    if (head == NULL) {
        printf("List is empty\n");
        return NULL;
    }
    
    if (head->next == NULL) {
        printf("Deleted: %d\n", head->data);
        free(head);
        return NULL;
    }
    
    struct Node* temp = head;
    while (temp->next != NULL) {
        temp = temp->next;
    }
    
    temp->prev->next = NULL;
    printf("Deleted: %d\n", temp->data);
    free(temp);
    return head;
}

// Function to delete a specific value
struct Node* deleteValue(struct Node* head, int value) {
    if (head == NULL) {
        printf("List is empty\n");
        return NULL;
    }
    
    struct Node* temp = head;
    
    // Find the node to delete
    while (temp != NULL && temp->data != value) {
        temp = temp->next;
    }
    
    if (temp == NULL) {
        printf("Value %d not found\n", value);
        return head;
    }
    
    // If it's the first node
    if (temp->prev == NULL) {
        head = temp->next;
        if (head != NULL) {
            head->prev = NULL;
        }
    }
    // If it's the last node
    else if (temp->next == NULL) {
        temp->prev->next = NULL;
    }
    // If it's a middle node
    else {
        temp->prev->next = temp->next;
        temp->next->prev = temp->prev;
    }
    
    printf("Deleted: %d\n", temp->data);
    free(temp);
    return head;
}

// Function to search for a value
int search(struct Node* head, int value) {
    struct Node* temp = head;
    int position = 1;
    
    while (temp != NULL) {
        if (temp->data == value) {
            return position;
        }
        temp = temp->next;
        position++;
    }
    return -1; // Not found
}

// Function to display the list forward
void displayForward(struct Node* head) {
    if (head == NULL) {
        printf("List is empty\n");
        return;
    }
    
    printf("Forward: ");
    struct Node* temp = head;
    while (temp != NULL) {
        printf("%d ", temp->data);
        temp = temp->next;
    }
    printf("\n");
}

// Function to display the list backward
void displayBackward(struct Node* head) {
    if (head == NULL) {
        printf("List is empty\n");
        return;
    }
    
    // Go to the last node
    struct Node* temp = head;
    while (temp->next != NULL) {
        temp = temp->next;
    }
    
    printf("Backward: ");
    while (temp != NULL) {
        printf("%d ", temp->data);
        temp = temp->prev;
    }
    printf("\n");
}

// Function to get the length of the list
int getLength(struct Node* head) {
    int count = 0;
    struct Node* temp = head;
    while (temp != NULL) {
        count++;
        temp = temp->next;
    }
    return count;
}

// Function to reverse the doubly linked list
struct Node* reverse(struct Node* head) {
    if (head == NULL) return NULL;
    
    struct Node* temp = NULL;
    struct Node* current = head;
    
    // Swap next and prev for all nodes
    while (current != NULL) {
        temp = current->prev;
        current->prev = current->next;
        current->next = temp;
        current = current->prev;
    }
    
    // Before changing head, check for the cases like empty list and list with only one node
    if (temp != NULL) {
        head = temp->prev;
    }
    
    return head;
}

// Function to free the entire list
void freeList(struct Node* head) {
    struct Node* temp;
    while (head != NULL) {
        temp = head;
        head = head->next;
        free(temp);
    }
}

// Main function with menu-driven program
int main() {
    struct Node* head = NULL;
    int choice, data, position;
    
    printf("=== Doubly Linked List Operations ===\n");
    
    while (1) {
        printf("\n--- Menu ---\n");
        printf("1. Insert at beginning\n");
        printf("2. Insert at end\n");
        printf("3. Insert at position\n");
        printf("4. Delete from beginning\n");
        printf("5. Delete from end\n");
        printf("6. Delete specific value\n");
        printf("7. Search value\n");
        printf("8. Display forward\n");
        printf("9. Display backward\n");
        printf("10. Get length\n");
        printf("11. Reverse list\n");
        printf("12. Exit\n");
        printf("Enter your choice: ");
        
        scanf("%d", &choice);
        
        switch (choice) {
            case 1:
                printf("Enter data to insert at beginning: ");
                scanf("%d", &data);
                head = insertAtBeginning(head, data);
                printf("Inserted %d at beginning\n", data);
                break;
                
            case 2:
                printf("Enter data to insert at end: ");
                scanf("%d", &data);
                head = insertAtEnd(head, data);
                printf("Inserted %d at end\n", data);
                break;
                
            case 3:
                printf("Enter data: ");
                scanf("%d", &data);
                printf("Enter position: ");
                scanf("%d", &position);
                head = insertAtPosition(head, data, position);
                break;
                
            case 4:
                head = deleteFromBeginning(head);
                break;
                
            case 5:
                head = deleteFromEnd(head);
                break;
                
            case 6:
                printf("Enter value to delete: ");
                scanf("%d", &data);
                head = deleteValue(head, data);
                break;
                
            case 7:
                printf("Enter value to search: ");
                scanf("%d", &data);
                position = search(head, data);
                if (position != -1) {
                    printf("Value %d found at position %d\n", data, position);
                } else {
                    printf("Value %d not found\n", data);
                }
                break;
                
            case 8:
                displayForward(head);
                break;
                
            case 9:
                displayBackward(head);
                break;
                
            case 10:
                printf("Length of list: %d\n", getLength(head));
                break;
                
            case 11:
                head = reverse(head);
                printf("List reversed successfully\n");
                break;
                
            case 12:
                freeList(head);
                printf("Memory freed. Exiting...\n");
                exit(0);
                
            default:
                printf("Invalid choice! Please try again.\n");
        }
    }
    
    return 0;
}
