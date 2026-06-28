'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { randomArray, randomSortedArray, randomLinearSearch } from '@/utils/dataGenerator'
import type { ArrayElement, Step } from '@/types'
import { linearSearch, binarySearch, createArray } from '@/lib/searching'
import { COLORS, SPEED_MS } from '@/constants'
import { useVisualizerStore } from '@/stores/visualizerStore'
import { Button } from '@/components/ui'

interface Props {
  type: 'linearSearch' | 'binarySearch'
}

export function SearchingVisualizer({ type }: Props) {
  const { speed, isPlaying, play, pause, reset: storeReset, currentStep, setStep } = useVisualizerStore()
  const [baseItems, setBaseItems] = useState<ArrayElement[]>(() => {
    const arr = type === 'binarySearch' ? randomSortedArray(10) : randomArray(8)
    return createArray(arr)
  })
  const [steps, setSteps] = useState<Step[]>([])
  const items = useMemo(() => {
    if (steps.length > 0 && currentStep < steps.length) {
      const s = steps[currentStep]
      if (s.array) return s.array
    }
    return baseItems
  }, [steps, currentStep, baseItems])
  const [targetValue, setTargetValue] = useState('')
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (isPlaying && steps.length > 1) {
      intervalRef.current = setInterval(() => {
        useVisualizerStore.getState().nextStep()
      }, SPEED_MS[speed])
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isPlaying, steps.length, speed])

  useEffect(() => {
    if (steps.length > 0 && currentStep >= steps.length - 1) {
      pause()
    }
  }, [currentStep, steps.length, pause])

  function runSteps(newSteps: Step[]) {
    setSteps(newSteps)
    setStep(0)
    play()
  }

  function handleSearch() {
    const target = parseInt(targetValue)
    if (isNaN(target)) return
    setTargetValue('')
    const fn = type === 'linearSearch' ? linearSearch : binarySearch
    runSteps(fn([...baseItems], target))
  }

  function handleGenerate() {
    storeReset()
    setSteps([])
    const arr = type === 'binarySearch' ? randomSortedArray(10) : randomArray(8)
    setBaseItems(createArray(arr))
  }

  function handlePlay() {
    if (steps.length > 0 && currentStep >= steps.length - 1) {
      setStep(0)
    }
    play()
  }

  function handleReset() {
    storeReset()
    setSteps([])
    setTargetValue('')
  }

  const maxVal = Math.max(...items.map((i) => i.value), 1)

  let leftIdx = -1, midIdx = -1, rightIdx = -1
  if (type === 'binarySearch') {
    for (let i = 0; i < items.length; i++) {
      if (items[i].state === 'comparing') {
        if (leftIdx === -1) leftIdx = i
        rightIdx = i
      }
      if (items[i].state === 'active' || items[i].state === 'found') midIdx = i
    }
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap items-center gap-2 border-b border-zinc-200 px-4 py-2 dark:border-zinc-700">
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Target"
            value={targetValue}
            onChange={(e) => setTargetValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="w-20 rounded-lg border border-zinc-200 bg-white px-2 py-1 text-sm dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
          />
          <Button size="sm" onClick={handleSearch}>Search</Button>
          <Button size="sm" variant="secondary" onClick={handlePlay} disabled={steps.length === 0}>Play</Button>
          <Button size="sm" variant="ghost" onClick={pause}>Pause</Button>
          <Button size="sm" variant="ghost" onClick={handleGenerate}>Generate New</Button>
          <Button size="sm" variant="ghost" onClick={handleReset}>Reset</Button>
        </div>
      </div>

      <div className="flex items-center justify-center gap-1 overflow-x-auto px-2 py-4 sm:gap-2" style={{ minHeight: 260 }}>
        {items.map((item, i) => (
          <div key={item.id} className="flex shrink-0 flex-col items-center">
            <div
              className="flex w-10 items-end justify-center rounded-t-lg text-xs font-bold text-white transition-all sm:w-12"
              style={{
                height: `${Math.max((item.value / maxVal) * 280, 36)}px`,
                backgroundColor: COLORS[item.state],
              }}
            >
              {item.value}
            </div>
            <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{i}</div>
            {type === 'binarySearch' && (
              <div className="mt-0.5 flex gap-1 text-[10px] font-semibold">
                {i === leftIdx && <span className="text-amber-500">L</span>}
                {i === midIdx && <span className="text-blue-500">M</span>}
                {i === rightIdx && <span className="text-amber-500">R</span>}
              </div>
            )}
          </div>
        ))}
      </div>

      {steps.length > 0 && currentStep < steps.length && (
        <div className="border-t border-zinc-200 px-4 py-1.5 text-center text-xs text-zinc-600 dark:border-zinc-700 dark:text-zinc-400">
          {steps[currentStep].description}
        </div>
      )}
    </div>
  )
}
