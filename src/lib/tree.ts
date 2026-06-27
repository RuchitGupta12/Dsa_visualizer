import type { TreeNode, Step } from '@/types'

let idCounter = 0

function clone(tree: TreeNode[]): TreeNode[] {
  return tree.map((n) => ({ ...n }))
}

function findNode(tree: TreeNode[], id: number): TreeNode | undefined {
  return tree.find((n) => n.id === id)
}

function findRoot(tree: TreeNode[]): TreeNode | null {
  const childIds = new Set<number>()
  for (const n of tree) {
    if (n.left !== null) childIds.add(n.left)
    if (n.right !== null) childIds.add(n.right)
  }
  for (const n of tree) {
    if (!childIds.has(n.id)) return n
  }
  return null
}

export function createTree(arr: (number | null)[]): TreeNode[] {
  const nodes: TreeNode[] = []
  const idMap = new Map<number, number>()

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== null) {
      const id = idCounter++
      idMap.set(i, id)
      nodes.push({ id, value: arr[i]!, x: 0, y: 0, left: null, right: null, state: 'default' })
    }
  }

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== null) {
      const node = nodes.find((n) => n.id === idMap.get(i))!
      const level = Math.floor(Math.log2(i + 1))
      const posInLevel = i - (Math.pow(2, level) - 1)
      const spacing = 200 / (level + 1)
      node.x = posInLevel * spacing
      node.y = level * 80

      const leftIdx = 2 * i + 1
      const rightIdx = 2 * i + 2
      if (leftIdx < arr.length && arr[leftIdx] !== null) {
        node.left = idMap.get(leftIdx)!
      }
      if (rightIdx < arr.length && arr[rightIdx] !== null) {
        node.right = idMap.get(rightIdx)!
      }
    }
  }

  return nodes
}

export function insertNode(current: TreeNode[], value: number): Step[] {
  const steps: Step[] = []
  const tree = clone(current)

  if (tree.length === 0) {
    const node: TreeNode = { id: idCounter++, value, x: 200, y: 0, left: null, right: null, state: 'default' }
    tree.push(node)
    steps.push({ description: `Insert ${value} as root`, tree: clone(tree) })
    return steps
  }

  let curr = findRoot(tree)!
  let level = 0

  while (true) {
    curr.state = 'active'
    steps.push({ description: `Visit ${curr.value}`, tree: clone(tree) })

    if (value === curr.value) {
      steps.push({ description: `${value} already exists`, tree: clone(tree) })
      curr.state = 'default'
      break
    }

    const isLeft = value < curr.value
    const childId = isLeft ? curr.left : curr.right

    if (childId === null) {
      const childLevel = level + 1
      const spacing = 200 / (childLevel + 1)
      const offset = spacing / 2
      const newNode: TreeNode = {
        id: idCounter++,
        value,
        x: curr.x + (isLeft ? -offset : offset),
        y: childLevel * 80,
        left: null,
        right: null,
        state: 'default',
      }
      if (isLeft) curr.left = newNode.id
      else curr.right = newNode.id
      tree.push(newNode)
      curr.state = 'default'
      steps.push({ description: `Insert ${value} as ${isLeft ? 'left' : 'right'} child of ${curr.value}`, tree: clone(tree) })
      break
    }

    curr.state = 'default'
    curr = findNode(tree, childId)!
    level++
  }

  for (const n of tree) n.state = 'default'
  return steps
}

export function deleteNode(current: TreeNode[], value: number): Step[] {
  const steps: Step[] = []
  const tree = clone(current)

  if (tree.length === 0) {
    steps.push({ description: 'Tree is empty', tree: tree })
    return steps
  }

  const root = findRoot(tree)!
  let node: TreeNode | null = null
  let parent: TreeNode | null = null

  if (root.value === value) {
    node = root
    parent = null
  } else {
    let curr: TreeNode = root
    while (true) {
      if (value < curr.value) {
        if (curr.left === null) break
        const child = findNode(tree, curr.left)!
        if (child.value === value) { node = child; parent = curr; break }
        curr = child
      } else if (value > curr.value) {
        if (curr.right === null) break
        const child = findNode(tree, curr.right)!
        if (child.value === value) { node = child; parent = curr; break }
        curr = child
      } else break
    }
  }

  if (!node) {
    steps.push({ description: `${value} not found`, tree: clone(tree) })
    return steps
  }

  node.state = 'active'
  steps.push({ description: `Found ${value} to delete`, tree: clone(tree) })

  if (node.left === null && node.right === null) {
    if (parent) {
      if (parent.left === node.id) parent.left = null
      else parent.right = null
    }
    const idx = tree.findIndex((n) => n.id === node.id)
    if (idx !== -1) tree.splice(idx, 1)
    steps.push({ description: `Deleted leaf ${value}`, tree: clone(tree) })
  } else if (node.left === null || node.right === null) {
    const childId = node.left !== null ? node.left : node.right!
    if (parent) {
      if (parent.left === node.id) parent.left = childId
      else parent.right = childId
    }
    const idx = tree.findIndex((n) => n.id === node.id)
    if (idx !== -1) tree.splice(idx, 1)
    steps.push({ description: `Deleted ${value}, promoted its child`, tree: clone(tree) })
  } else {
    steps.push({ description: `${value} has two children, skipping deletion`, tree: clone(tree) })
  }

  for (const n of tree) n.state = 'default'
  return steps
}

export function searchNode(current: TreeNode[], target: number): Step[] {
  const steps: Step[] = []
  const tree = clone(current)

  if (tree.length === 0) {
    steps.push({ description: 'Tree is empty', tree: tree })
    return steps
  }

  let currId: number | null = findRoot(tree)!.id

  while (currId !== null) {
    const found = findNode(tree, currId)
    if (found === undefined) break
    found.state = 'active'
    steps.push({ description: `Visit ${found.value}`, tree: clone(tree) })

    if (found.value === target) {
      found.state = 'found'
      steps.push({ description: `Found ${target}!`, tree: clone(tree) })
      return steps
    }

    found.state = 'default'
    currId = target < found.value ? found.left : found.right
  }

  steps.push({ description: `${target} not found`, tree: clone(tree) })
  return steps
}

function inorderHelper(tree: TreeNode[], nodeId: number | null, steps: Step[]): void {
  if (nodeId === null) return
  const node = findNode(tree, nodeId)!
  inorderHelper(tree, node.left, steps)
  node.state = 'active'
  steps.push({ description: `Visit ${node.value}`, tree: tree.map((n) => ({ ...n })) })
  node.state = 'default'
  inorderHelper(tree, node.right, steps)
}

export function inorderTraversal(current: TreeNode[]): Step[] {
  const steps: Step[] = []
  const tree = clone(current)
  if (tree.length > 0) {
    const root = findRoot(tree)
    if (root) inorderHelper(tree, root.id, steps)
  }
  steps.push({ description: 'Inorder traversal complete', tree: tree.map((n) => ({ ...n })) })
  return steps
}

function preorderHelper(tree: TreeNode[], nodeId: number | null, steps: Step[]): void {
  if (nodeId === null) return
  const node = findNode(tree, nodeId)!
  node.state = 'active'
  steps.push({ description: `Visit ${node.value}`, tree: tree.map((n) => ({ ...n })) })
  node.state = 'default'
  preorderHelper(tree, node.left, steps)
  preorderHelper(tree, node.right, steps)
}

export function preorderTraversal(current: TreeNode[]): Step[] {
  const steps: Step[] = []
  const tree = clone(current)
  if (tree.length > 0) {
    const root = findRoot(tree)
    if (root) preorderHelper(tree, root.id, steps)
  }
  steps.push({ description: 'Preorder traversal complete', tree: tree.map((n) => ({ ...n })) })
  return steps
}

function postorderHelper(tree: TreeNode[], nodeId: number | null, steps: Step[]): void {
  if (nodeId === null) return
  const node = findNode(tree, nodeId)!
  postorderHelper(tree, node.left, steps)
  postorderHelper(tree, node.right, steps)
  node.state = 'active'
  steps.push({ description: `Visit ${node.value}`, tree: tree.map((n) => ({ ...n })) })
  node.state = 'default'
}

export function postorderTraversal(current: TreeNode[]): Step[] {
  const steps: Step[] = []
  const tree = clone(current)
  if (tree.length > 0) {
    const root = findRoot(tree)
    if (root) postorderHelper(tree, root.id, steps)
  }
  steps.push({ description: 'Postorder traversal complete', tree: tree.map((n) => ({ ...n })) })
  return steps
}
