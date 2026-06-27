import type { StackElement, Step } from '@/types'

let idCounter = 0

const MAX_STACK_SIZE = 10

export function createStack(arr: number[]): StackElement[] {
  return arr.map((v) => ({ id: idCounter++, value: v, state: 'default' as const }))
}

export function pushOperation(current: StackElement[], value: number): Step[] {
  const steps: Step[] = []
  const stack = current.map((e) => ({ ...e }))

  if (stack.length >= MAX_STACK_SIZE) {
    steps.push({ description: 'Stack overflow: cannot push, stack is full', stack: [...stack] })
    return steps
  }

  const newElement: StackElement = { id: idCounter++, value, state: 'pushing' }
  stack.push(newElement)
  steps.push({ description: `Push ${value} onto stack`, stack: [...stack.map((e) => ({ ...e }))] })

  newElement.state = 'default'
  steps.push({ description: `Pushed ${value}`, stack: [...stack.map((e) => ({ ...e }))] })

  return steps
}

export function popOperation(current: StackElement[]): Step[] {
  const steps: Step[] = []
  const stack = current.map((e) => ({ ...e }))

  if (stack.length === 0) {
    steps.push({ description: 'Stack underflow: cannot pop, stack is empty', stack: [...stack] })
    return steps
  }

  const top = stack[stack.length - 1]
  top.state = 'popping'
  steps.push({ description: `Pop ${top.value} from stack`, stack: [...stack.map((e) => ({ ...e }))] })

  stack.pop()
  steps.push({ description: 'Popped element', stack: [...stack.map((e) => ({ ...e }))] })

  return steps
}

export function peekOperation(current: StackElement[]): Step[] {
  const steps: Step[] = []
  const stack = current.map((e) => ({ ...e }))

  if (stack.length === 0) {
    steps.push({ description: 'Stack is empty, nothing to peek', stack: [...stack] })
    return steps
  }

  const top = stack[stack.length - 1]
  top.state = 'pushing'
  steps.push({ description: `Top element is ${top.value}`, stack: [...stack.map((e) => ({ ...e }))] })
  top.state = 'default'
  steps.push({ description: `Peeked ${top.value}`, stack: [...stack.map((e) => ({ ...e }))] })

  return steps
}

export function clearOperation(current: StackElement[]): Step[] {
  const steps: Step[] = []
  const stack = current.map((e) => ({ ...e }))

  if (stack.length === 0) {
    steps.push({ description: 'Stack is already empty', stack: [...stack] })
    return steps
  }

  steps.push({ description: `Clear stack with ${stack.length} elements`, stack: [...stack.map((e) => ({ ...e }))] })
  steps.push({ description: 'Stack cleared', stack: [] })

  return steps
}
