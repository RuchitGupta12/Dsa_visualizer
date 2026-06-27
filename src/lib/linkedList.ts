import type { ListNode, Step } from '@/types'

let idCounter = 0

export function createLinkedList(arr: number[]): ListNode[] {
  const nodes: ListNode[] = arr.map((v) => ({ id: idCounter++, value: v, next: null, state: 'default' }))
  for (let i = 0; i < nodes.length - 1; i++) {
    nodes[i].next = nodes[i + 1].id
  }
  return nodes
}

export function insertBeginning(current: ListNode[], value: number): Step[] {
  const steps: Step[] = []
  const list = current.map((n) => ({ ...n }))

  const newNode = { id: idCounter++, value, next: list.length > 0 ? list[0].id : null, state: 'default' as const }
  steps.push({ description: `Create new node with value ${value}`, list: [newNode, ...list.map((n) => ({ ...n }))] })

  list.unshift(newNode)
  steps.push({ description: `Inserted ${value} at the beginning`, list: [...list.map((n) => ({ ...n }))] })

  return steps
}

export function insertEnd(current: ListNode[], value: number): Step[] {
  const steps: Step[] = []
  const list = current.map((n) => ({ ...n }))

  if (list.length === 0) {
    list.push({ id: idCounter++, value, next: null, state: 'default' })
    steps.push({ description: `Inserted ${value} at the end`, list: [...list] })
    return steps
  }

  for (const node of list) {
    node.state = 'active'
    steps.push({ description: `Traverse to node ${node.value}`, list: [...list.map((n) => ({ ...n }))] })
    node.state = 'default'
  }

  const newNode = { id: idCounter++, value, next: null, state: 'default' as const }
  list[list.length - 1].next = newNode.id
  list.push(newNode)
  steps.push({ description: `Inserted ${value} at the end`, list: [...list.map((n) => ({ ...n }))] })

  return steps
}

export function insertAtPosition(current: ListNode[], value: number, position: number): Step[] {
  const steps: Step[] = []
  const list = current.map((n) => ({ ...n }))

  if (position < 0 || position > list.length) {
    steps.push({ description: `Position ${position} out of bounds`, list: [...list] })
    return steps
  }

  if (position === 0) {
    const newNode = { id: idCounter++, value, next: list.length > 0 ? list[0].id : null, state: 'default' as const }
    steps.push({ description: `Insert ${value} at the beginning`, list: [newNode, ...list.map((n) => ({ ...n }))] })
    list.unshift(newNode)
    steps.push({ description: `Inserted ${value} at position 0`, list: [...list.map((n) => ({ ...n }))] })
    return steps
  }

  for (let i = 0; i < position - 1; i++) {
    list[i].state = 'active'
    steps.push({ description: `Traverse to node ${list[i].value} at position ${i}`, list: [...list.map((n) => ({ ...n }))] })
    list[i].state = 'default'
  }

  const prev = list[position - 1]
  prev.state = 'active'
  steps.push({ description: `Insert ${value} after node ${prev.value}`, list: [...list.map((n) => ({ ...n }))] })
  prev.state = 'default'

  const newNode = { id: idCounter++, value, next: prev.next, state: 'default' as const }
  prev.next = newNode.id
  list.splice(position, 0, newNode)
  steps.push({ description: `Inserted ${value} at position ${position}`, list: [...list.map((n) => ({ ...n }))] })

  return steps
}

export function deleteBeginning(current: ListNode[]): Step[] {
  const steps: Step[] = []
  const list = current.map((n) => ({ ...n }))

  if (list.length === 0) {
    steps.push({ description: 'List is empty, nothing to delete', list: [...list] })
    return steps
  }

  list[0].state = 'found'
  steps.push({ description: `Mark head ${list[0].value} for deletion`, list: [...list.map((n) => ({ ...n }))] })

  list.shift()
  steps.push({ description: 'Deleted node from the beginning', list: [...list.map((n) => ({ ...n }))] })

  return steps
}

export function deleteEnd(current: ListNode[]): Step[] {
  const steps: Step[] = []
  const list = current.map((n) => ({ ...n }))

  if (list.length === 0) {
    steps.push({ description: 'List is empty, nothing to delete', list: [...list] })
    return steps
  }

  if (list.length === 1) {
    list[0].state = 'found'
    steps.push({ description: `Mark node ${list[0].value} for deletion`, list: [...list.map((n) => ({ ...n }))] })
    list.pop()
    steps.push({ description: 'Deleted the only node', list: [...list] })
    return steps
  }

  for (let i = 0; i < list.length - 1; i++) {
    list[i].state = 'active'
    steps.push({ description: `Traverse to node ${list[i].value}`, list: [...list.map((n) => ({ ...n }))] })
    list[i].state = 'default'
  }

  const last = list[list.length - 1]
  last.state = 'found'
  steps.push({ description: `Mark last node ${last.value} for deletion`, list: [...list.map((n) => ({ ...n }))] })

  list[list.length - 2].next = null
  list.pop()
  steps.push({ description: 'Deleted the last node', list: [...list.map((n) => ({ ...n }))] })

  return steps
}

export function deleteAtPosition(current: ListNode[], position: number): Step[] {
  const steps: Step[] = []
  const list = current.map((n) => ({ ...n }))

  if (position < 0 || position >= list.length) {
    steps.push({ description: `Position ${position} out of bounds`, list: [...list] })
    return steps
  }

  if (position === 0) {
    list[0].state = 'found'
    steps.push({ description: `Mark head ${list[0].value} for deletion`, list: [...list.map((n) => ({ ...n }))] })
    list.shift()
    steps.push({ description: `Deleted node at position ${position}`, list: [...list.map((n) => ({ ...n }))] })
    return steps
  }

  for (let i = 0; i < position - 1; i++) {
    list[i].state = 'active'
    steps.push({ description: `Traverse to node ${list[i].value}`, list: [...list.map((n) => ({ ...n }))] })
    list[i].state = 'default'
  }

  const target = list[position]
  target.state = 'found'
  steps.push({ description: `Mark node ${target.value} at position ${position} for deletion`, list: [...list.map((n) => ({ ...n }))] })

  list[position - 1].next = target.next
  list.splice(position, 1)
  steps.push({ description: `Deleted node at position ${position}`, list: [...list.map((n) => ({ ...n }))] })

  return steps
}

export function searchOperation(current: ListNode[], target: number): Step[] {
  const steps: Step[] = []
  const list = current.map((n) => ({ ...n }))

  for (const node of list) {
    node.state = 'active'
    steps.push({ description: `Check node with value ${node.value}`, list: [...list.map((n) => ({ ...n }))] })

    if (node.value === target) {
      node.state = 'found'
      steps.push({ description: `Found ${target}!`, list: [...list.map((n) => ({ ...n }))] })
      return steps
    }

    node.state = 'default'
  }

  steps.push({ description: `${target} not found in list`, list: [...list] })
  return steps
}

export function traverseOperation(current: ListNode[]): Step[] {
  const steps: Step[] = []
  const list = current.map((n) => ({ ...n }))

  if (list.length === 0) {
    steps.push({ description: 'List is empty', list: [...list] })
    return steps
  }

  for (const node of list) {
    node.state = 'active'
    steps.push({ description: `Visit node with value ${node.value}`, list: [...list.map((n) => ({ ...n }))] })
    node.state = 'default'
  }

  steps.push({ description: 'Traversal complete', list: [...list.map((n) => ({ ...n }))] })
  return steps
}
