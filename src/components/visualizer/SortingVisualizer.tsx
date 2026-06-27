'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import type { ArrayElement, Step, Speed } from '@/types'
import { bubbleSort, selectionSort, insertionSort, mergeSort, quickSort, createArray } from '@/lib/sorting'
import { COLORS, SPEED_MS } from '@/constants'
import { useVisualizerStore } from '@/stores/visualizerStore'
import { Button } from '@/components/ui'

interface Props {
  type: 'bubbleSort' | 'selectionSort' | 'insertionSort' | 'mergeSort' | 'quickSort'
}

function randomArray(length = 10, min = 5, max = 100): number[] {
  return Array.from({ length }, () => Math.floor(Math.random() * (max - min + 1)) + min)
}

const sortFns: Record<string, (arr: ArrayElement[]) => Step[]> = {
  bubbleSort,
  selectionSort,
  insertionSort,
  mergeSort,
  quickSort,
}

export function SortingVisualizer({ type }: Props) {
  const { speed, isPlaying, play, pause, reset: storeReset, currentStep, setStep, nextStep, prevStep, setSpeed } = useVisualizerStore()
  const [baseItems, setBaseItems] = useState<ArrayElement[]>(() => createArray(randomArray()))
  const [steps, setSteps] = useState<Step[]>([])
  const items = useMemo(() => {
    if (steps.length > 0 && currentStep < steps.length) {
      const s = steps[currentStep]
      if (s.array) return s.array
    }
    return baseItems
  }, [steps, currentStep, baseItems])
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

  function handleGenerate() {
    storeReset()
    setSteps([])
    setBaseItems(createArray(randomArray()))
  }

  function handleSort() {
    const fn = sortFns[type]
    runSteps(fn(items))
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
  }

  const speedLabel = (['slow', 'normal', 'fast'] as Speed[])[['slow', 'normal', 'fast'].indexOf(speed)]
  const speedIndex = ['slow', 'normal', 'fast'].indexOf(speed)
  const maxVal = Math.max(...items.map((i) => i.value), 1)

  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap items-center gap-2 border-b border-zinc-200 px-4 py-2 dark:border-zinc-700">
        <div className="flex items-center gap-2">
          <Button size="sm" onClick={handleGenerate}>Generate New Array</Button>
          <Button size="sm" onClick={handleSort}>Sort</Button>
          <Button size="sm" variant="secondary" onClick={handlePlay} disabled={steps.length === 0}>Play</Button>
          <Button size="sm" variant="ghost" onClick={pause}>Pause</Button>
          <Button size="sm" variant="ghost" onClick={handleReset}>Reset</Button>
        </div>
        <div className="flex items-center gap-1">
          <Button size="sm" variant="secondary" onClick={prevStep} disabled={steps.length === 0}>←</Button>
          <Button size="sm" variant="secondary" onClick={nextStep} disabled={steps.length === 0}>→</Button>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-xs text-zinc-500 dark:text-zinc-400">Speed</label>
          <input
            type="range"
            min="0"
            max="2"
            value={speedIndex}
            onChange={(e) => setSpeed((['slow', 'normal', 'fast'] as Speed[])[parseInt(e.target.value)])}
            className="w-20"
          />
          <span className="text-xs text-zinc-400 w-10">{speedLabel}</span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 px-2 py-4" style={{ minHeight: 260 }}>
        {items.map((item, i) => (
          <div key={item.id} className="flex flex-col items-center">
            <div
              className="flex w-12 items-end justify-center rounded-t-lg text-xs font-bold text-white transition-all"
              style={{
                height: `${Math.max((item.value / maxVal) * 280, 36)}px`,
                backgroundColor: COLORS[item.state],
              }}
            >
              {item.value}
            </div>
            <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{i}</div>
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
