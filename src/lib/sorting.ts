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

export function bubbleSort(current: ArrayElement[]): Step[] {
  const steps: Step[] = []
  const arr = clone(current)
  const n = arr.length

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      arr[j].state = 'comparing'
      arr[j + 1].state = 'comparing'
      steps.push({ description: `Compare ${arr[j].value} and ${arr[j + 1].value}`, array: clone(arr) })

      if (arr[j].value > arr[j + 1].value) {
        arr[j].state = 'swapping'
        arr[j + 1].state = 'swapping'
        steps.push({ description: `Swap ${arr[j].value} and ${arr[j + 1].value}`, array: clone(arr) })

        const temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = temp

        arr[j].state = 'default'
        arr[j + 1].state = 'default'
      } else {
        arr[j].state = 'default'
        arr[j + 1].state = 'default'
      }
    }
    arr[n - 1 - i].state = 'sorted'
    steps.push({ description: `Element ${arr[n - 1 - i].value} bubbled to index ${n - 1 - i}`, array: clone(arr) })
  }

  arr[0].state = 'sorted'
  steps.push({ description: 'Array sorted', array: clone(arr) })

  return steps
}

export function selectionSort(current: ArrayElement[]): Step[] {
  const steps: Step[] = []
  const arr = clone(current)
  const n = arr.length

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i
    arr[minIdx].state = 'active'
    steps.push({ description: `Start: assume minimum is ${arr[minIdx].value} at index ${minIdx}`, array: clone(arr) })

    for (let j = i + 1; j < n; j++) {
      arr[j].state = 'comparing'
      steps.push({ description: `Compare with ${arr[j].value} at index ${j}`, array: clone(arr) })

      if (arr[j].value < arr[minIdx].value) {
        arr[minIdx].state = 'default'
        minIdx = j
        arr[minIdx].state = 'active'
        steps.push({ description: `New minimum: ${arr[minIdx].value} at index ${minIdx}`, array: clone(arr) })
      } else {
        arr[j].state = 'default'
      }
    }

    if (minIdx !== i) {
      arr[i].state = 'swapping'
      arr[minIdx].state = 'swapping'
      steps.push({ description: `Swap ${arr[i].value} (index ${i}) with ${arr[minIdx].value} (index ${minIdx})`, array: clone(arr) })

      const temp = arr[i]
      arr[i] = arr[minIdx]
      arr[minIdx] = temp

      arr[minIdx].state = 'default'
    } else {
      arr[i].state = 'default'
    }

    arr[i].state = 'sorted'
    steps.push({ description: `Element ${arr[i].value} placed at index ${i}`, array: clone(arr) })
  }

  arr[n - 1].state = 'sorted'
  steps.push({ description: 'Array sorted', array: clone(arr) })

  return steps
}

export function insertionSort(current: ArrayElement[]): Step[] {
  const steps: Step[] = []
  const arr = clone(current)
  const n = arr.length

  arr[0].state = 'sorted'
  steps.push({ description: `Start with first element ${arr[0].value} as sorted`, array: clone(arr) })

  for (let i = 1; i < n; i++) {
    const key = arr[i].value
    let j = i - 1

    arr[i].state = 'active'
    steps.push({ description: `Pick ${key} at index ${i} to insert`, array: clone(arr) })

    while (j >= 0 && arr[j].value > key) {
      arr[j].state = 'comparing'
      arr[j + 1].state = 'comparing'
      steps.push({ description: `Shift ${arr[j].value} right from index ${j} to ${j + 1}`, array: clone(arr) })

      arr[j + 1] = { ...arr[j], state: 'default' }
      arr[j].state = 'default'

      if (j + 1 !== i) arr[j + 1].state = 'default'

      j--
    }

    arr[j + 1] = toElement(key, 'swapping')
    steps.push({ description: `Insert ${key} at index ${j + 1}`, array: clone(arr) })

    for (let k = 0; k <= j + 1; k++) {
      arr[k].state = 'sorted'
    }
  }

  for (let i = 0; i < n; i++) arr[i].state = 'sorted'
  steps.push({ description: 'Array sorted', array: clone(arr) })

  return steps
}

function mergeSortHelper(
  arr: ArrayElement[],
  steps: Step[],
  left: number,
  right: number
): void {
  if (left >= right) return

  const mid = Math.floor((left + right) / 2)

  for (let i = left; i <= right; i++) arr[i].state = 'comparing'
  arr[mid].state = 'active'
  steps.push({ description: `Divide range [${left}..${right}] at midpoint ${mid}`, array: clone(arr) })
  for (let i = left; i <= right; i++) arr[i].state = 'default'

  mergeSortHelper(arr, steps, left, mid)
  mergeSortHelper(arr, steps, mid + 1, right)

  const leftArr = arr.slice(left, mid + 1).map((e) => ({ ...e }))
  const rightArr = arr.slice(mid + 1, right + 1).map((e) => ({ ...e }))
  let i = left, l = 0, r = 0

  while (l < leftArr.length && r < rightArr.length) {
    if (l < leftArr.length) leftArr[l].state = 'comparing'
    if (r < rightArr.length) rightArr[r].state = 'comparing'

    const tempArr = [
      ...arr.slice(0, left).map((e) => ({ ...e })),
      ...leftArr.map((e) => ({ ...e })),
      ...rightArr.map((e) => ({ ...e })),
      ...arr.slice(right + 1).map((e) => ({ ...e })),
    ]
    steps.push({ description: `Compare ${leftArr[l].value} and ${rightArr[r].value}`, array: tempArr })

    if (l < leftArr.length) leftArr[l].state = 'default'
    if (r < rightArr.length) rightArr[r].state = 'default'

    if (leftArr[l].value <= rightArr[r].value) {
      leftArr[l].state = 'swapping'
      const temp = [...arr.slice(0, left).map((e) => ({ ...e })), ...leftArr.map((e) => ({ ...e })), ...rightArr.map((e) => ({ ...e })), ...arr.slice(right + 1).map((e) => ({ ...e }))]
      steps.push({ description: `Place ${leftArr[l].value} from left half`, array: temp })
      leftArr[l].state = 'default'

      arr[i] = { ...leftArr[l], state: 'default' }
      l++
    } else {
      rightArr[r].state = 'swapping'
      const temp = [...arr.slice(0, left).map((e) => ({ ...e })), ...leftArr.map((e) => ({ ...e })), ...rightArr.map((e) => ({ ...e })), ...arr.slice(right + 1).map((e) => ({ ...e }))]
      steps.push({ description: `Place ${rightArr[r].value} from right half`, array: temp })
      rightArr[r].state = 'default'

      arr[i] = { ...rightArr[r], state: 'default' }
      r++
    }
    i++
  }

  while (l < leftArr.length) {
    arr[i] = { ...leftArr[l], state: 'default' }
    l++
    i++
  }
  while (r < rightArr.length) {
    arr[i] = { ...rightArr[r], state: 'default' }
    r++
    i++
  }

  for (let k = left; k <= right; k++) arr[k].state = 'sorted'
  steps.push({ description: `Merged [${left}..${right}]`, array: clone(arr) })
  for (let k = left; k <= right; k++) arr[k].state = 'default'
}

export function mergeSort(current: ArrayElement[]): Step[] {
  const steps: Step[] = []
  const arr = clone(current)

  steps.push({ description: 'Start merge sort', array: clone(arr) })
  mergeSortHelper(arr, steps, 0, arr.length - 1)

  for (let i = 0; i < arr.length; i++) arr[i].state = 'sorted'
  steps.push({ description: 'Array sorted', array: clone(arr) })

  return steps
}

function quickSortHelper(
  arr: ArrayElement[],
  steps: Step[],
  low: number,
  high: number
): void {
  if (low >= high) return

  const pivotValue = arr[high].value
  arr[high].state = 'active'
  steps.push({ description: `Pick pivot ${pivotValue} at index ${high}`, array: clone(arr) })
  arr[high].state = 'default'

  let i = low

  for (let j = low; j < high; j++) {
    arr[j].state = 'comparing'
    steps.push({ description: `Compare ${arr[j].value} with pivot ${pivotValue}`, array: clone(arr) })
    arr[j].state = 'default'

    if (arr[j].value < pivotValue) {
      if (i !== j) {
        arr[i].state = 'swapping'
        arr[j].state = 'swapping'
        steps.push({ description: `Swap ${arr[i].value} (index ${i}) with ${arr[j].value} (index ${j})`, array: clone(arr) })

        const temp = arr[i]
        arr[i] = arr[j]
        arr[j] = temp

        arr[i].state = 'default'
        arr[j].state = 'default'
      }
      i++
    }
  }

  if (i !== high) {
    arr[i].state = 'swapping'
    arr[high].state = 'swapping'
    steps.push({ description: `Place pivot ${pivotValue} at index ${i}`, array: clone(arr) })

    const temp = arr[i]
    arr[i] = arr[high]
    arr[high] = temp

    arr[i].state = 'default'
    arr[high].state = 'default'
  }

  arr[i].state = 'sorted'
  steps.push({ description: `Pivot ${pivotValue} in correct position at index ${i}`, array: clone(arr) })

  quickSortHelper(arr, steps, low, i - 1)
  quickSortHelper(arr, steps, i + 1, high)
}

export function quickSort(current: ArrayElement[]): Step[] {
  const steps: Step[] = []
  const arr = clone(current)

  steps.push({ description: 'Start quick sort', array: clone(arr) })
  quickSortHelper(arr, steps, 0, arr.length - 1)

  for (let i = 0; i < arr.length; i++) arr[i].state = 'sorted'
  steps.push({ description: 'Array sorted', array: clone(arr) })

  return steps
}
