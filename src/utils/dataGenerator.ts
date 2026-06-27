function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function shuffle(arr: number[]): number[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function randomArray(size?: number): number[] {
  const n = size ?? randInt(5, 10)
  return Array.from({ length: n }, () => randInt(1, 99))
}

export function randomSortedArray(size?: number): number[] {
  const n = size ?? randInt(8, 15)
  const arr: number[] = []
  let v = randInt(1, 10)
  for (let i = 0; i < n; i++) {
    arr.push(v)
    v += randInt(1, 10)
  }
  return arr
}

export function randomLinkedList(size?: number): number[] {
  const n = size ?? randInt(4, 8)
  return Array.from({ length: n }, (_, i) => (i + 1) * randInt(3, 25))
}

export function randomStack(size?: number): number[] {
  return randomArray(size ?? randInt(3, 6))
}

export function randomQueue(size?: number): number[] {
  return randomArray(size ?? randInt(3, 6))
}

export function randomTreeValues(size?: number): number[] {
  const n = size ?? randInt(5, 9)
  const vals = new Set<number>()
  while (vals.size < n) vals.add(randInt(1, 100))
  const arr = [...vals]
  arr.sort((a, b) => a - b)
  function buildBalanced(start: number, end: number): number[] {
    if (start > end) return []
    const mid = Math.floor((start + end) / 2)
    return [arr[mid], ...buildBalanced(start, mid - 1), ...buildBalanced(mid + 1, end)]
  }
  return buildBalanced(0, arr.length - 1)
}

export function randomSortingArray(size?: number): number[] {
  const n = size ?? randInt(8, 15)
  return Array.from({ length: n }, () => randInt(5, 100))
}

export function randomLinearSearch(): { array: number[]; target: number } {
  const array = randomArray(randInt(5, 10))
  const target = Math.random() > 0.3
    ? array[randInt(0, array.length - 1)]
    : randInt(200, 300)
  return { array, target }
}

export function randomBinarySearch(): { array: number[]; target: number } {
  const array = randomSortedArray(randInt(8, 12))
  const target = Math.random() > 0.3
    ? array[randInt(0, array.length - 1)]
    : randInt(200, 300)
  return { array, target }
}
