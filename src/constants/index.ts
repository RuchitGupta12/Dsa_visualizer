export const SPEED_MS: Record<string, number> = {
  slow: 800,
  normal: 400,
  fast: 100,
}

export const COLORS = {
  default: '#6366f1',
  comparing: '#f59e0b',
  swapping: '#ef4444',
  sorted: '#22c55e',
  active: '#3b82f6',
  found: '#22c55e',
  pushing: '#a855f7',
  popping: '#ef4444',
  enqueuing: '#a855f7',
  dequeuing: '#ef4444',
  visited: '#22c55e',
  traversed: '#3b82f6',
}

export interface DSItem {
  id: string
  label: string
  icon: string
  description: string
  category: 'linear' | 'hierarchical'
  difficulty: 'beginner' | 'intermediate'
}

export interface AlgoItem {
  id: string
  label: string
  icon: string
  description: string
  category: 'searching' | 'sorting'
  difficulty: 'beginner' | 'intermediate'
  timeComplexity: string
}

export const DS_LIST: DSItem[] = [
  { id: 'array', label: 'Array', icon: 'HiOutlineQueueList', description: 'Contiguous memory, indexed access', category: 'linear', difficulty: 'beginner' },
  { id: 'linkedList', label: 'Linked List', icon: 'HiOutlineLink', description: 'Nodes connected by pointers', category: 'linear', difficulty: 'beginner' },
  { id: 'stack', label: 'Stack', icon: 'HiOutlineViewColumns', description: 'LIFO — Last In, First Out', category: 'linear', difficulty: 'beginner' },
  { id: 'queue', label: 'Queue', icon: 'HiOutlineQueueList', description: 'FIFO — First In, First Out', category: 'linear', difficulty: 'beginner' },
  { id: 'tree', label: 'Tree', icon: 'HiOutlineCircleStack', description: 'Hierarchical data with parent-child relationships', category: 'hierarchical', difficulty: 'intermediate' },
  { id: 'bst', label: 'BST', icon: 'HiOutlineCircleStack', description: 'Sorted binary tree for fast lookups', category: 'hierarchical', difficulty: 'intermediate' },
]

export const ALGO_LIST: AlgoItem[] = [
  { id: 'linearSearch', label: 'Linear Search', icon: 'HiOutlineMagnifyingGlass', description: 'Sequential scan through elements', category: 'searching', difficulty: 'beginner', timeComplexity: 'O(n)' },
  { id: 'binarySearch', label: 'Binary Search', icon: 'HiOutlineMagnifyingGlassPlus', description: 'Divide & conquer on sorted data', category: 'searching', difficulty: 'intermediate', timeComplexity: 'O(log n)' },
  { id: 'bubbleSort', label: 'Bubble Sort', icon: 'HiOutlineBarsArrowDown', description: 'Repeated adjacent swaps', category: 'sorting', difficulty: 'beginner', timeComplexity: 'O(n²)' },
  { id: 'selectionSort', label: 'Selection Sort', icon: 'HiOutlineBarsArrowUp', description: 'Select minimum and swap', category: 'sorting', difficulty: 'beginner', timeComplexity: 'O(n²)' },
  { id: 'insertionSort', label: 'Insertion Sort', icon: 'HiOutlineBars3CenterLeft', description: 'Build sorted array one by one', category: 'sorting', difficulty: 'beginner', timeComplexity: 'O(n²)' },
  { id: 'mergeSort', label: 'Merge Sort', icon: 'HiOutlineArrowsRightLeft', description: 'Divide, sort, and merge halves', category: 'sorting', difficulty: 'intermediate', timeComplexity: 'O(n log n)' },
  { id: 'quickSort', label: 'Quick Sort', icon: 'HiOutlineArrowPath', description: 'Partition around a pivot', category: 'sorting', difficulty: 'intermediate', timeComplexity: 'O(n log n)' },
]
