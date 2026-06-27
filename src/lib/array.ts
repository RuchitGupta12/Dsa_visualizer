import type { ArrayElement, Step } from '@/types'

let idCounter = 0

function toElement(value: number, state: ArrayElement['state'] = 'default'): ArrayElement {
  return { id: idCounter++, value, state }
}

export function createArray(arr: number[]): ArrayElement[] {
  return arr.map((v) => toElement(v))
}

export function insertOperation(
  current: ArrayElement[],
  value: number,
  index: number
): Step[] {
  const steps: Step[] = []
  const arr = current.map((e) => ({ ...e }))

  const desc = `Insert ${value} at index ${index}`
  if (index < 0 || index > arr.length) {
    steps.push({ description: `Index ${index} out of bounds`, array: arr })
    return steps
  }

  arr.splice(index, 0, toElement(value, 'default'))
  arr.forEach((e, i) => {
    if (i >= index) e.state = 'comparing'
  })
  steps.push({ description: `Shift elements right from index ${index}`, array: [...arr.map((e) => ({ ...e }))] })

  arr.forEach((e) => (e.state = 'default'))
  steps.push({ description: desc, array: [...arr] })

  return steps
}

export function deleteOperation(current: ArrayElement[], index: number): Step[] {
  const steps: Step[] = []
  const arr = current.map((e) => ({ ...e }))

  if (index < 0 || index >= arr.length) {
    steps.push({ description: `Index ${index} out of bounds`, array: arr })
    return steps
  }

  arr[index].state = 'swapping'
  steps.push({ description: `Mark element ${arr[index].value} at index ${index} for deletion`, array: [...arr.map((e) => ({ ...e }))] })

  arr.splice(index, 1)
  arr.forEach((e, i) => {
    if (i >= index) e.state = 'comparing'
  })
  steps.push({ description: `Shift elements left from index ${index}`, array: [...arr.map((e) => ({ ...e }))] })

  arr.forEach((e) => (e.state = 'default'))
  steps.push({ description: `Deleted element at index ${index}`, array: [...arr] })

  return steps
}

export function updateOperation(current: ArrayElement[], index: number, value: number): Step[] {
  const steps: Step[] = []
  const arr = current.map((e) => ({ ...e }))

  if (index < 0 || index >= arr.length) {
    steps.push({ description: `Index ${index} out of bounds`, array: arr })
    return steps
  }

  arr[index].state = 'active'
  steps.push({ description: `Found element at index ${index}: ${arr[index].value}`, array: [...arr.map((e) => ({ ...e }))] })

  arr[index].value = value
  arr[index].state = 'found'
  steps.push({ description: `Updated to ${value}`, array: [...arr.map((e) => ({ ...e }))] })

  arr[index].state = 'default'
  return steps
}

export function searchOperation(current: ArrayElement[], target: number): Step[] {
  const steps: Step[] = []
  const arr = current.map((e) => ({ ...e }))

  let found = false
  for (let i = 0; i < arr.length; i++) {
    arr[i].state = 'comparing'
    steps.push({ description: `Check index ${i}: value ${arr[i].value}`, array: [...arr.map((e) => ({ ...e }))] })

    if (arr[i].value === target) {
      arr[i].state = 'found'
      steps.push({ description: `Found ${target} at index ${i}!`, array: [...arr.map((e) => ({ ...e }))] })
      found = true
      break
    }
    arr[i].state = 'default'
  }

  if (!found) {
    steps.push({ description: `${target} not found in array`, array: [...arr] })
  }

  return steps
}

export function traverseOperation(current: ArrayElement[]): Step[] {
  const steps: Step[] = []
  const arr = current.map((e) => ({ ...e }))

  for (let i = 0; i < arr.length; i++) {
    arr[i].state = 'active'
    steps.push({ description: `Visit index ${i}: ${arr[i].value}`, array: [...arr.map((e) => ({ ...e }))] })
    arr[i].state = 'default'
  }

  steps.push({ description: 'Traversal complete', array: [...arr] })
  return steps
}
