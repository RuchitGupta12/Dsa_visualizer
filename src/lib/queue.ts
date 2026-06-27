import type { QueueElement, Step } from '@/types'

let idCounter = 0

function toElement(value: number, state: QueueElement['state'] = 'default'): QueueElement {
  return { id: idCounter++, value, state }
}

export function createQueue(arr: number[]): QueueElement[] {
  return arr.map((v) => toElement(v))
}

export function enqueueOperation(current: QueueElement[], value: number): Step[] {
  const steps: Step[] = []
  const queue = current.map((e) => ({ ...e }))

  const el = toElement(value, 'enqueuing')
  queue.push(el)
  steps.push({ description: `Enqueue ${value} at rear`, queue: queue.map((e) => ({ ...e })) })

  el.state = 'default'
  steps.push({ description: `${value} enqueued`, queue: queue.map((e) => ({ ...e })) })

  return steps
}

export function dequeueOperation(current: QueueElement[]): Step[] {
  const steps: Step[] = []
  const queue = current.map((e) => ({ ...e }))

  if (queue.length === 0) {
    steps.push({ description: 'Queue is empty, nothing to dequeue', queue: queue })
    return steps
  }

  queue[0].state = 'dequeuing'
  steps.push({ description: `Dequeue ${queue[0].value} from front`, queue: queue.map((e) => ({ ...e })) })

  queue.shift()

  if (queue.length > 0) {
    queue[0].state = 'front'
    queue[queue.length - 1].state = 'rear'
    steps.push({ description: `New front: ${queue[0].value}, rear: ${queue[queue.length - 1].value}`, queue: queue.map((e) => ({ ...e })) })
    queue[0].state = 'default'
    queue[queue.length - 1].state = 'default'
  } else {
    steps.push({ description: 'Queue is now empty', queue: [] })
  }

  return steps
}

export function peekOperation(current: QueueElement[]): Step[] {
  const steps: Step[] = []
  const queue = current.map((e) => ({ ...e }))

  if (queue.length === 0) {
    steps.push({ description: 'Queue is empty', queue: queue })
    return steps
  }

  queue[0].state = 'front'
  queue[queue.length - 1].state = 'rear'
  steps.push({ description: `Front: ${queue[0].value}, Rear: ${queue[queue.length - 1].value}`, queue: queue.map((e) => ({ ...e })) })

  queue[0].state = 'default'
  queue[queue.length - 1].state = 'default'
  steps.push({ description: 'Peek complete', queue: queue.map((e) => ({ ...e })) })

  return steps
}


