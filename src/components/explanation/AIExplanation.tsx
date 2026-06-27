'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  HiOutlineSparkles,
  HiOutlineCodeBracket,
  HiOutlineLightBulb,
  HiOutlineChevronDown,
} from 'react-icons/hi2'

interface Props {
  type: string
}

type AIResponse = {
  explanation: string
  codeSnippet: string
  interviewTip: string
}

const aiData: Record<string, AIResponse> = {
  array: {
    explanation: 'Arrays store elements in contiguous memory. The index gives O(1) random access — the CPU can calculate the memory address directly: base + (index × element_size). Insertion at arbitrary positions is costly because every element after must shift one slot.',
    codeSnippet: `function insert(arr, index, value) {
  for (let i = arr.length - 1; i >= index; i--) {
    arr[i + 1] = arr[i];
  }
  arr[index] = value;
}`,
    interviewTip: 'When asked about array vs linked list, frame it as: "Arrays give you a free index. Linked lists give you a free insert."',
  },
  linkedList: {
    explanation: 'Each node holds a value and a pointer to the next node. The head reference is the entry point. Inserting at the head is O(1) — just create a new node and point it to the current head. Searching is O(n) because you must follow pointers sequentially.',
    codeSnippet: `function insertAtHead(head, value) {
  return { value, next: head };
}`,
    interviewTip: 'Linked list reversal is a classic coding interview question. Remember: three pointers — prev, curr, next.',
  },
  stack: {
    explanation: 'Stack is LIFO — like a stack of plates. Push puts a plate on top, pop takes the top plate off. The top pointer tracks the current top element. All operations are O(1). The stack is fundamental for function call management (call stack) in every programming language.',
    codeSnippet: `class Stack {
  constructor() { this.items = []; }
  push(x) { this.items.push(x); }
  pop() { return this.items.pop(); }
  peek() { return this.items[this.items.length - 1]; }
}`,
    interviewTip: 'Use stacks for balanced parentheses, expression evaluation (shunting-yard), and backtracking problems.',
  },
  queue: {
    explanation: 'Queue is FIFO — like a line at a ticket counter. Enqueue adds to the rear, dequeue removes from the front. In array-based queues, circular buffers avoid shifting by wrapping around using modulo arithmetic.',
    codeSnippet: `class Queue {
  constructor() {
    this.items = [];
    this.front = 0;
  }
  enqueue(x) { this.items.push(x); }
  dequeue() { return this.items[this.front++]; }
}`,
    interviewTip: 'BFS uses a queue. When you see "shortest path" or "level order", think queue immediately.',
  },
  tree: {
    explanation: 'A binary tree is a recursive structure: each node has at most two children. The root is the top node. Leaf nodes have no children. Tree height is the longest path from root to leaf. Recursive traversals (inorder, preorder, postorder) visit nodes in different orders.',
    codeSnippet: `function inorder(node) {
  if (!node) return;
  inorder(node.left);
  console.log(node.value);
  inorder(node.right);
}`,
    interviewTip: 'Most tree problems reduce to the right traversal. Inorder gives sorted order for BST. Level order uses a queue.',
  },
  bst: {
    explanation: 'BST maintains the invariant: left subtree < node < right subtree. This property enables O(log n) search on average — each comparison eliminates half the tree. Inorder traversal of a BST yields elements in sorted order.',
    codeSnippet: `function search(root, target) {
  if (!root || root.value === target) return root;
  if (target < root.value) return search(root.left, target);
  return search(root.right, target);
}`,
    interviewTip: 'BST validation (checking the invariant) is a common problem. Pass min/max bounds down recursively.',
  },
  linearSearch: {
    explanation: 'Linear search scans each element sequentially until the target is found or the end is reached. It is the simplest search algorithm and works on any dataset — sorted or unsorted. The best case is O(1) when the target is at the first position; worst case is O(n) when the target is last or absent.',
    codeSnippet: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}`,
    interviewTip: 'Linear search is rarely the best choice for large datasets, but it shines for small arrays or unsorted data where preprocessing cost outweighs search time.',
  },
  binarySearch: {
    explanation: 'Binary search repeatedly divides the sorted array in half, comparing the target to the middle element. Each step eliminates half the remaining elements, giving O(log n) time. It requires a sorted input — sorting cost must be accounted for if the data is not already ordered.',
    codeSnippet: `function binarySearch(arr, target) {
  let lo = 0, hi = arr.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}`,
    interviewTip: 'Binary search is the foundation of many advanced data structures. Remember: the array must be sorted. Use (lo + hi) >> 1 to avoid integer overflow.',
  },
  bubbleSort: {
    explanation: 'Bubble sort repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. Larger elements "bubble up" to their correct position. After each pass, the largest unsorted element settles at the end. Early termination can be achieved if no swaps occur in a pass.',
    codeSnippet: `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  return arr;
}`,
    interviewTip: 'Bubble sort is rarely used in practice due to O(n²) time, but its early-termination optimization makes it adaptive — O(n) on already sorted data.',
  },
  selectionSort: {
    explanation: 'Selection sort divides the array into a sorted and an unsorted region. It repeatedly finds the minimum element from the unsorted region and swaps it to the end of the sorted region. It makes O(n²) comparisons but only O(n) swaps, making it useful when writes are expensive.',
    codeSnippet: `function selectionSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) minIdx = j;
    }
    if (minIdx !== i) [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
  }
  return arr;
}`,
    interviewTip: 'Selection sort is not stable and performs poorly on nearly sorted data. However, its O(n) swaps make it ideal for sorting linked lists stored in memory.',
  },
  insertionSort: {
    explanation: 'Insertion sort builds the final sorted array one element at a time. It picks each element and inserts it into its correct position among the previously sorted elements by shifting larger elements right. It is O(n²) worst case but O(n) on nearly sorted data, making it excellent for small or almost-sorted inputs.',
    codeSnippet: `function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}`,
    interviewTip: 'Insertion sort is the algorithm of choice for small subarrays in hybrid sorts like Timsort, which powers Python\'s built-in sort and Java\'s Arrays.sort().',
  },
  mergeSort: {
    explanation: 'Merge sort is a divide-and-conquer algorithm that splits the array in half recursively until single elements remain, then merges the sorted halves back together. The merge step compares the fronts of both subarrays and places the smaller element into the result. It guarantees O(n log n) time and is stable but requires O(n) extra space.',
    codeSnippet: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = arr.length >> 1;
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  const result = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    result.push(left[i] < right[j] ? left[i++] : right[j++]);
  }
  return [...result, ...left.slice(i), ...right.slice(j)];
}`,
    interviewTip: 'Unlike quicksort, merge sort is stable and works well for linked lists (no extra space needed for arrays). It is the default sort for objects in Java and JavaScript.',
  },
  quickSort: {
    explanation: 'Quicksort picks a pivot, partitions the array so elements smaller than the pivot go left and larger go right, then recursively sorts each partition. Average case is O(n log n) with low constant factors, making it faster than merge sort in practice. Worst case O(n²) occurs with poor pivot choices.',
    codeSnippet: `function quickSort(arr, lo = 0, hi = arr.length - 1) {
  if (lo >= hi) return;
  const pivot = arr[hi];
  let i = lo;
  for (let j = lo; j < hi; j++) {
    if (arr[j] < pivot) [arr[i++], arr[j]] = [arr[j], arr[i]];
  }
  [arr[i], arr[hi]] = [arr[hi], arr[i]];
  quickSort(arr, lo, i - 1);
  quickSort(arr, i + 1, hi);
  return arr;
}`,
    interviewTip: 'Quicksort is usually the fastest comparison sort in practice. Always randomize pivot selection to avoid worst-case O(n²) on already sorted or reverse-sorted arrays.',
  },
}

export function AIExplanation({ type }: Props) {
  const [showCode, setShowCode] = useState(false)
  const data = aiData[type]

  if (!data) {
    return (
      <div className="rounded-lg border border-dashed border-zinc-300 p-6 text-center dark:border-zinc-600">
        <HiOutlineSparkles className="mx-auto size-8 text-zinc-300 dark:text-zinc-600" />
        <h4 className="mt-2 text-sm font-semibold text-zinc-900 dark:text-white">AI Explanation</h4>
        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
          AI explanation coming soon for this topic.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="rounded-lg border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-800">
        <div className="flex items-center gap-2 border-b border-zinc-100 px-4 py-3 dark:border-zinc-700">
          <HiOutlineSparkles className="size-4 text-amber-500" />
          <h4 className="text-sm font-semibold text-zinc-900 dark:text-white">AI Explanation</h4>
        </div>
        <div className="p-4">
          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {data.explanation}
          </p>
        </div>
      </div>

      <div className="rounded-lg border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-800">
        <button
          onClick={() => setShowCode(!showCode)}
          className="flex w-full items-center justify-between px-4 py-3 text-left"
        >
          <div className="flex items-center gap-2">
            <HiOutlineCodeBracket className="size-4 text-blue-500" />
            <h4 className="text-sm font-semibold text-zinc-900 dark:text-white">Code Implementation</h4>
          </div>
          <motion.div
            animate={{ rotate: showCode ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <HiOutlineChevronDown className="size-4 text-zinc-400" />
          </motion.div>
        </button>
        <AnimatePresence>
          {showCode && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="border-t border-zinc-100 dark:border-zinc-700">
                <div className="flex items-center gap-1.5 border-b border-zinc-100 bg-zinc-50 px-4 py-1.5 dark:border-zinc-700 dark:bg-zinc-900">
                  <span className="size-2.5 rounded-full bg-red-400" />
                  <span className="size-2.5 rounded-full bg-amber-400" />
                  <span className="size-2.5 rounded-full bg-emerald-400" />
                  <span className="ml-2 text-[10px] font-medium text-zinc-400">javascript</span>
                </div>
                <pre className="overflow-x-auto bg-zinc-950 p-4 text-xs leading-relaxed">
                  <code className="text-emerald-400/90">{data.codeSnippet}</code>
                </pre>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="rounded-lg border border-indigo-100 bg-gradient-to-br from-indigo-50 to-white p-4 dark:border-indigo-900 dark:from-indigo-950/30 dark:to-zinc-800">
        <div className="flex items-start gap-3">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/50">
            <HiOutlineLightBulb className="size-4 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-indigo-900 dark:text-indigo-200">
              Interview Tip
            </h4>
            <p className="mt-1 text-xs leading-relaxed text-indigo-700 dark:text-indigo-300">
              {data.interviewTip}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
