import type { LearningData } from '@/types'

export const learningData: Record<string, LearningData> = {
  array: {
    concept: 'Array is a linear data structure storing elements in contiguous memory locations. Each element can be accessed directly via its index.',
    working: [
      'Elements stored in consecutive memory blocks',
      'Index starts at 0',
      'Direct access: O(1) via index',
      'Insert/delete at arbitrary position requires shifting',
    ],
    applications: ['Storing sequential data', 'Matrix operations', 'Buffer implementation', 'Lookup tables'],
    advantages: ['Fast random access O(1)', 'Cache-friendly', 'Memory efficient (no overhead)', 'Easy to traverse'],
    disadvantages: ['Fixed size (static arrays)', 'Costly insert/delete O(n)', 'Contiguous memory requirement', 'Wasted space if underfilled'],
    complexity: [
      { operation: 'Access', best: 'O(1)', average: 'O(1)', worst: 'O(1)', space: 'O(n)' },
      { operation: 'Search', best: 'O(1)', average: 'O(n)', worst: 'O(n)', space: 'O(1)' },
      { operation: 'Insert', best: 'O(1)', average: 'O(n)', worst: 'O(n)', space: 'O(1)' },
      { operation: 'Delete', best: 'O(1)', average: 'O(n)', worst: 'O(n)', space: 'O(1)' },
    ],
    videos: [
      { title: 'Data Structures: List as abstract data type', url: 'https://www.youtube.com/watch?v=HdFG8L1sajw', channel: 'mycodeschool' },
    ],
  },
  linkedList: {
    concept: 'Linked List is a linear data structure where elements (nodes) are connected via pointers. Each node contains data and a reference to the next node.',
    working: [
      'Each node has data + pointer to next node',
      'Head pointer marks the start',
      'Last node points to null',
      'Traversal follows pointers sequentially',
    ],
    applications: ['Dynamic memory allocation', 'Undo/redo in editors', 'Image viewer (prev/next)', 'Music playlist'],
    advantages: ['Dynamic size', 'Efficient insert/delete at ends O(1)', 'No memory waste', 'Easy implementation of stack/queue'],
    disadvantages: ['No random access O(n)', 'Extra memory for pointers', 'Not cache-friendly', 'Reverse traversal needs doubly linked'],
    complexity: [
      { operation: 'Access', best: 'O(1)', average: 'O(n)', worst: 'O(n)', space: 'O(n)' },
      { operation: 'Search', best: 'O(1)', average: 'O(n)', worst: 'O(n)', space: 'O(1)' },
      { operation: 'Insert (head)', best: 'O(1)', average: 'O(1)', worst: 'O(1)', space: 'O(1)' },
      { operation: 'Delete (head)', best: 'O(1)', average: 'O(1)', worst: 'O(1)', space: 'O(1)' },
    ],
    videos: [
      { title: 'Introduction to linked list', url: 'https://www.youtube.com/watch?v=NobHlGUjV3g', channel: 'mycodeschool' },
    ],
  },
  stack: {
    concept: 'Stack is a linear data structure following LIFO (Last In, First Out) principle. Elements are added and removed from the same end (top).',
    working: [
      'Push: add element to top',
      'Pop: remove element from top',
      'Peek: view top element without removal',
      'All operations are O(1)',
    ],
    applications: ['Function call stack', 'Expression evaluation', 'Undo in text editors', 'Backtracking algorithms'],
    advantages: ['Simple LIFO management', 'All operations O(1)', 'Efficient memory use', 'Natural for recursive patterns'],
    disadvantages: ['Limited access (only top)', 'No searching', 'Fixed size risk (array impl)', 'Overflow/underflow possible'],
    complexity: [
      { operation: 'Push', best: 'O(1)', average: 'O(1)', worst: 'O(1)', space: 'O(1)' },
      { operation: 'Pop', best: 'O(1)', average: 'O(1)', worst: 'O(1)', space: 'O(1)' },
      { operation: 'Peek', best: 'O(1)', average: 'O(1)', worst: 'O(1)', space: 'O(1)' },
      { operation: 'Search', best: 'O(n)', average: 'O(n)', worst: 'O(n)', space: 'O(1)' },
    ],
    videos: [
      { title: 'Data structures: Introduction to Stack', url: 'https://www.youtube.com/watch?v=F1F2imiOJfk', channel: 'mycodeschool' },
    ],
  },
  queue: {
    concept: 'Queue is a linear data structure following FIFO (First In, First Out) principle. Elements are added at rear and removed from front.',
    working: [
      'Enqueue: add element at rear',
      'Dequeue: remove element from front',
      'Front: first element (oldest)',
      'Rear: last element (newest)',
    ],
    applications: ['CPU scheduling', 'Breadth-first search', 'Print spooling', 'Message queues'],
    advantages: ['Fair FIFO ordering', 'Enqueue/dequeue O(1)', 'Natural for ordered processing', 'Buffer management'],
    disadvantages: ['Limited access (only front/rear)', 'No searching', 'Fixed size risk', 'Not cache-friendly'],
    complexity: [
      { operation: 'Enqueue', best: 'O(1)', average: 'O(1)', worst: 'O(1)', space: 'O(1)' },
      { operation: 'Dequeue', best: 'O(1)', average: 'O(1)', worst: 'O(1)', space: 'O(1)' },
      { operation: 'Peek', best: 'O(1)', average: 'O(1)', worst: 'O(1)', space: 'O(1)' },
      { operation: 'Search', best: 'O(n)', average: 'O(n)', worst: 'O(n)', space: 'O(1)' },
    ],
    videos: [
      { title: 'Data structures: Array implementation of Queue', url: 'https://www.youtube.com/watch?v=okr-XE8yTO8', channel: 'mycodeschool' },
    ],
  },
  tree: {
    concept: 'Tree is a hierarchical data structure with a root node and children forming subtrees. Each node has at most two children in a binary tree.',
    working: [
      'Root is the topmost node',
      'Each node has left and right child',
      'Leaf nodes have no children',
      'Height = longest path from root to leaf',
    ],
    applications: ['File system hierarchy', 'HTML DOM', 'Network routing', 'Expression trees'],
    advantages: ['Hierarchical representation', 'Fast search (balanced trees)', 'Natural for recursive data', 'Efficient insertion'],
    disadvantages: ['Complex implementation', 'Unbalanced trees degrade to O(n)', 'Extra pointer overhead', 'No direct index access'],
    complexity: [
      { operation: 'Access', best: 'O(log n)', average: 'O(log n)', worst: 'O(n)', space: 'O(n)' },
      { operation: 'Search', best: 'O(log n)', average: 'O(log n)', worst: 'O(n)', space: 'O(1)' },
      { operation: 'Insert', best: 'O(log n)', average: 'O(log n)', worst: 'O(n)', space: 'O(1)' },
      { operation: 'Delete', best: 'O(log n)', average: 'O(log n)', worst: 'O(n)', space: 'O(1)' },
    ],
    videos: [
      { title: 'Data structures: Introduction to Trees', url: 'https://www.youtube.com/watch?v=qH6yxkw0u78', channel: 'mycodeschool' },
      { title: 'Data structures: Binary Tree', url: 'https://www.youtube.com/watch?v=H5JubkIy_p8', channel: 'mycodeschool' },
    ],
  },
  bst: {
    concept: 'Binary Search Tree is a binary tree where each left subtree has smaller values and each right subtree has larger values.',
    working: [
      'Left child < parent < right child',
      'Inorder traversal yields sorted order',
      'Search compares and branches left/right',
      'Height determines performance',
    ],
    applications: ['Database indexing', 'Symbol tables', 'Sorting (tree sort)', 'Auto-complete'],
    advantages: ['Sorted data maintenance', 'Efficient search O(log n) avg', 'Inorder = sorted order', 'Range queries possible'],
    disadvantages: ['Unbalanced degrades to O(n)', 'Complex delete operation', 'No constant-time operations', 'Requires comparator'],
    complexity: [
      { operation: 'Search', best: 'O(1)', average: 'O(log n)', worst: 'O(n)', space: 'O(1)' },
      { operation: 'Insert', best: 'O(1)', average: 'O(log n)', worst: 'O(n)', space: 'O(1)' },
      { operation: 'Delete', best: 'O(1)', average: 'O(log n)', worst: 'O(n)', space: 'O(1)' },
      { operation: 'Traverse', best: 'O(n)', average: 'O(n)', worst: 'O(n)', space: 'O(n)' },
    ],
    videos: [
      { title: 'Data structures: Binary Search Tree', url: 'https://www.youtube.com/watch?v=pYT9F8_LFTM', channel: 'mycodeschool' },
    ],
  },
  linearSearch: {
    concept: 'Linear Search sequentially checks each element until the target is found or the list ends. Simple but inefficient for large datasets.',
    working: [
      'Start from first element',
      'Compare each element with target',
      'Return index if match found',
      'Return -1 if not found after full scan',
    ],
    applications: ['Small datasets', 'Unsorted data', 'Finding first/last occurrence', 'Search in linked lists'],
    advantages: ['Works on unsorted data', 'Simple implementation', 'No extra memory', 'Good for small n'],
    disadvantages: ['Slow O(n) on large data', 'Inefficient for sorted data', 'Not suitable for real-time', 'Beats binary only for tiny n'],
    complexity: [
      { operation: 'Best case', best: 'O(1)', average: 'O(n)', worst: 'O(n)', space: 'O(1)' },
      { operation: 'Worst case', best: 'O(n)', average: 'O(n)', worst: 'O(n)', space: 'O(1)' },
    ],
    videos: [
      { title: 'Linear Search - CS50 Shorts', url: 'https://www.youtube.com/watch?v=TwsgCHYmbbA', channel: 'CS50' },
    ],
  },
  binarySearch: {
    concept: 'Binary Search finds target in sorted array by repeatedly dividing search interval in half. Much faster than linear search.',
    working: [
      'Works only on sorted arrays',
      'Find middle element',
      'If target < mid, search left half',
      'If target > mid, search right half',
    ],
    applications: ['Finding in sorted data', 'Dictionary lookup', 'Debugging (git bisect)', 'Root finding'],
    advantages: ['Very fast O(log n)', 'Logarithmic scaling', 'Memory efficient', 'Predictable performance'],
    disadvantages: ['Requires sorted data', 'Sorting cost O(n log n)', 'Poor for small n', 'Complex implementation'],
    complexity: [
      { operation: 'Best case', best: 'O(1)', average: 'O(log n)', worst: 'O(log n)', space: 'O(1)' },
      { operation: 'Worst case', best: 'O(log n)', average: 'O(log n)', worst: 'O(log n)', space: 'O(1)' },
    ],
    videos: [
      { title: 'Binary Search - CS50 Shorts', url: 'https://www.youtube.com/watch?v=T98PIp4omUA', channel: 'CS50' },
    ],
  },
  bubbleSort: {
    concept: 'Bubble Sort repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.',
    working: [
      'Compare adjacent elements',
      'Swap if left > right',
      'Largest element bubbles to end',
      'Repeat n-1 times, ignoring sorted suffix',
    ],
    applications: ['Educational purpose', 'Small datasets', 'Nearly sorted data', 'Simple sorting demo'],
    advantages: ['Simple to understand', 'In-place sorting', 'Stable sort', 'Detects already sorted (optimized)'],
    disadvantages: ['Very slow O(n²)', 'Too many swaps', 'Not practical for large n', 'Better alternatives exist'],
    complexity: [
      { operation: 'Comparisons', best: 'O(n)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)' },
      { operation: 'Swaps', best: 'O(1)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)' },
    ],
    videos: [
      { title: 'Bubble sort algorithm', url: 'https://www.youtube.com/watch?v=Jdtq5uKz-w4', channel: 'mycodeschool' },
    ],
  },
  selectionSort: {
    concept: 'Selection Sort divides array into sorted and unsorted regions, repeatedly selecting the minimum element from unsorted region.',
    working: [
      'Find minimum element in unsorted portion',
      'Swap it with first unsorted position',
      'Expand sorted boundary by one',
      'Repeat until fully sorted',
    ],
    applications: ['Small datasets', 'When memory writes are costly', 'Simple implementation needed', 'Educational demos'],
    advantages: ['Simple implementation', 'In-place O(1) space', 'Minimizes swaps O(n)', 'Performs well on small arrays'],
    disadvantages: ['Always O(n²) comparisons', 'Not stable', 'Poor for large datasets', 'Cache-inefficient'],
    complexity: [
      { operation: 'Comparisons', best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)' },
      { operation: 'Swaps', best: 'O(n)', average: 'O(n)', worst: 'O(n)', space: 'O(1)' },
    ],
    videos: [
      { title: 'Selection sort algorithm', url: 'https://www.youtube.com/watch?v=GUDLRan2DWM', channel: 'mycodeschool' },
    ],
  },
  insertionSort: {
    concept: 'Insertion Sort builds the final sorted array one element at a time by inserting each element into its correct position.',
    working: [
      'Start with first element as sorted',
      'Pick next element',
      'Shift larger elements right',
      'Insert element in correct position',
    ],
    applications: ['Small datasets', 'Online sorting (streaming)', 'Nearly sorted data', 'Hybrid sort (TimSort) component'],
    advantages: ['Adaptive O(n) for nearly sorted', 'In-place and stable', 'Efficient for small n', 'Online algorithm'],
    disadvantages: ['O(n²) for random data', 'Shift operations costly', 'Not suitable for large n', 'Many comparisons'],
    complexity: [
      { operation: 'Comparisons', best: 'O(n)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)' },
      { operation: 'Shifts', best: 'O(1)', average: 'O(n²)', worst: 'O(n²)', space: 'O(1)' },
    ],
    videos: [
      { title: 'Insertion sort algorithm', url: 'https://www.youtube.com/watch?v=i-SKeOcBwko', channel: 'mycodeschool' },
    ],
  },
  mergeSort: {
    concept: 'Merge Sort is a divide-and-conquer algorithm that divides array into halves, recursively sorts them, then merges the results.',
    working: [
      'Divide array into two halves',
      'Recursively sort each half',
      'Merge two sorted halves',
      'Use extra array for merging',
    ],
    applications: ['Large datasets', 'External sorting', 'Linked list sorting', 'Stable sorting requirement'],
    advantages: ['Guaranteed O(n log n)', 'Stable sort', 'Parallelizable', 'Good for linked lists'],
    disadvantages: ['O(n) extra space', 'Not in-place', 'Slower for small n', 'Recursive overhead'],
    complexity: [
      { operation: 'Time', best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)', space: 'O(n)' },
      { operation: 'Merges', best: 'O(log n)', average: 'O(log n)', worst: 'O(log n)', space: 'O(n)' },
    ],
    videos: [
      { title: 'Merge sort algorithm', url: 'https://www.youtube.com/watch?v=TzeBrDU-JaY', channel: 'mycodeschool' },
    ],
  },
  quickSort: {
    concept: 'Quick Sort is a divide-and-conquer algorithm that selects a pivot, partitions array around it, and recursively sorts partitions.',
    working: [
      'Choose a pivot element',
      'Partition: elements < pivot on left, > on right',
      'Pivot in final position',
      'Recursively sort left and right partitions',
    ],
    applications: ['General-purpose sorting', 'Large datasets', 'Library sort implementations', 'Competitive programming'],
    advantages: ['Fast average O(n log n)', 'In-place sorting', 'Cache-friendly', 'Tail recursion optimizable'],
    disadvantages: ['O(n²) worst case (bad pivot)', 'Not stable', 'Recursive overhead', 'Degrades on already sorted'],
    complexity: [
      { operation: 'Time', best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)', space: 'O(log n)' },
      { operation: 'Partitions', best: 'O(log n)', average: 'O(log n)', worst: 'O(n)', space: 'O(log n)' },
    ],
    videos: [
      { title: 'Quicksort algorithm', url: 'https://www.youtube.com/watch?v=COk73cpQbFQ', channel: 'mycodeschool' },
    ],
  },
}
