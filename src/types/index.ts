export type DSName = 'array' | 'linkedList' | 'stack' | 'queue' | 'tree' | 'bst'
export type AlgoName = 'linearSearch' | 'binarySearch' | 'bubbleSort' | 'selectionSort' | 'insertionSort' | 'mergeSort' | 'quickSort'
export type VisualizationType = DSName | AlgoName

export type Speed = 'slow' | 'normal' | 'fast'

export interface ArrayElement {
  id: number
  value: number
  state: 'default' | 'comparing' | 'swapping' | 'sorted' | 'active' | 'found'
}

export interface ListNode {
  id: number
  value: number
  next: number | null
  state: 'default' | 'active' | 'found'
}

export interface StackElement {
  id: number
  value: number
  state: 'default' | 'pushing' | 'popping'
}

export interface QueueElement {
  id: number
  value: number
  state: 'default' | 'enqueuing' | 'dequeuing' | 'front' | 'rear'
}

export interface TreeNode {
  id: number
  value: number
  x: number
  y: number
  left: number | null
  right: number | null
  state: 'default' | 'active' | 'found' | 'visited'
}

export interface Complexity {
  operation: string
  best: string
  average: string
  worst: string
  space: string
}

export interface VideoLink {
  title: string
  url: string
  channel: string
}

export interface LearningData {
  concept: string
  working: string[]
  applications: string[]
  advantages: string[]
  disadvantages: string[]
  complexity: Complexity[]
  videos?: VideoLink[]
}

export interface Step {
  description: string
  array?: ArrayElement[]
  list?: ListNode[]
  stack?: StackElement[]
  queue?: QueueElement[]
  tree?: TreeNode[]
}
