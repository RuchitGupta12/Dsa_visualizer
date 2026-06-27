import type { ArrayElement, Step } from '@/types'

let idCounter = 0

function toElement(value: number, state: ArrayElement['state'] = 'default'): ArrayElement {
  return { id: idCounter++, value, state }
}

function clone(arr: ArrayElement[]): ArrayElement[] {
  return arr.map((e) => ({ ...e }))
}

export function createArray(arr: number[]): ArrayElement[] {
  return arr.map((v) => toElement(v))
}

export function linearSearch(current: ArrayElement[], target: number): Step[] {
  const steps: Step[] = []
  const arr = clone(current)

  let found = false
  for (let i = 0; i < arr.length; i++) {
    arr[i].state = 'comparing'
    steps.push({ description: `Check index ${i}: value ${arr[i].value}`, array: clone(arr) })

    if (arr[i].value === target) {
      arr[i].state = 'found'
      steps.push({ description: `Found ${target} at index ${i}!`, array: clone(arr) })
      found = true
      break
    }

    arr[i].state = 'default'
  }

  if (!found) {
    steps.push({ description: `${target} not found in array`, array: clone(arr) })
  }

  return steps
}

export function binarySearch(current: ArrayElement[], target: number): Step[] {
  const steps: Step[] = []
  const arr = clone(current)
  const n = arr.length

  let left = 0
  let right = n - 1

  while (left <= right) {
    for (let i = 0; i < n; i++) arr[i].state = 'default'

    for (let i = left; i <= right; i++) arr[i].state = 'comparing'
    steps.push({ description: `Search range [${left}..${right}]`, array: clone(arr) })

    const mid = Math.floor((left + right) / 2)
    for (let i = left; i <= right; i++) arr[i].state = 'default'
    arr[mid].state = 'active'
    steps.push({ description: `Midpoint at index ${mid}: value ${arr[mid].value}`, array: clone(arr) })

    if (arr[mid].value === target) {
      arr[mid].state = 'found'
      steps.push({ description: `Found ${target} at index ${mid}!`, array: clone(arr) })
      return steps
    }

    if (arr[mid].value > target) {
      arr[mid].state = 'default'
      steps.push({ description: `${arr[mid].value} > ${target}, search left half`, array: clone(arr) })
      right = mid - 1
    } else {
      arr[mid].state = 'default'
      steps.push({ description: `${arr[mid].value} < ${target}, search right half`, array: clone(arr) })
      left = mid + 1
    }
  }

  for (let i = 0; i < n; i++) arr[i].state = 'default'
  steps.push({ description: `${target} not found in array`, array: clone(arr) })

  return steps
}
