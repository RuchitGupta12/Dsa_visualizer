'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { randomArray } from '@/utils/dataGenerator'
import type { ArrayElement, Step } from '@/types'
import { createArray, insertOperation, deleteOperation, updateOperation, searchOperation, traverseOperation } from '@/lib/array'
import { COLORS, SPEED_MS } from '@/constants'
import { useVisualizerStore } from '@/stores/visualizerStore'
import { Button } from '@/components/ui'

export function ArrayVisualizer() {
  const { speed, isPlaying, play, pause, reset: storeReset, currentStep, setStep } = useVisualizerStore()
  const [baseItems, setBaseItems] = useState<ArrayElement[]>(() => createArray(randomArray(7)))
  const [steps, setSteps] = useState<Step[]>([])
  const items = useMemo(() => {
    if (steps.length > 0 && currentStep < steps.length) {
      const s = steps[currentStep]
      if (s.array) return s.array
    }
    return baseItems
  }, [steps, currentStep, baseItems])
  const [inputValue, setInputValue] = useState('')
  const [inputIndex, setInputIndex] = useState('')
  const [searchValue, setSearchValue] = useState('')
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

  function handleInsert() {
    const val = parseInt(inputValue)
    const idx = inputIndex === '' ? items.length : parseInt(inputIndex)
    if (isNaN(val)) return
    setInputValue('')
    setInputIndex('')
    runSteps(insertOperation(items, val, idx))
  }

  function handleDelete() {
    const idx = parseInt(inputIndex)
    if (isNaN(idx)) return
    setInputIndex('')
    runSteps(deleteOperation(items, idx))
  }

  function handleUpdate() {
    const idx = parseInt(inputIndex)
    const val = parseInt(inputValue)
    if (isNaN(idx) || isNaN(val)) return
    setInputIndex('')
    setInputValue('')
    runSteps(updateOperation(items, idx, val))
  }

  function handleSearch() {
    const target = parseInt(searchValue)
    if (isNaN(target)) return
    setSearchValue('')
    runSteps(searchOperation(items, target))
  }

  function handleTraverse() {
    runSteps(traverseOperation(items))
  }

  function handleGenerate() {
    storeReset()
    setSteps([])
    setBaseItems(createArray(randomArray(7)))
    setInputValue('')
    setInputIndex('')
    setSearchValue('')
  }

  function handleReset() {
    storeReset()
    setSteps([])
    setInputValue('')
    setInputIndex('')
    setSearchValue('')
  }

  const maxVal = Math.max(...items.map((i) => i.value), 1)

  return (
    <div className="flex flex-col">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-2 border-b border-zinc-200 px-4 py-2 dark:border-zinc-700">
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Value"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-20 rounded-lg border border-zinc-200 bg-white px-2 py-1 text-sm dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
          />
          <input
            type="number"
            placeholder="Index"
            value={inputIndex}
            onChange={(e) => setInputIndex(e.target.value)}
            className="w-20 rounded-lg border border-zinc-200 bg-white px-2 py-1 text-sm dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
          />
          <Button size="sm" onClick={handleInsert}>Insert</Button>
          <Button size="sm" variant="secondary" onClick={handleDelete}>Delete</Button>
          <Button size="sm" variant="ghost" onClick={handleUpdate}>Update</Button>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="w-20 rounded-lg border border-zinc-200 bg-white px-2 py-1 text-sm dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
          />
          <Button size="sm" onClick={handleSearch}>Search</Button>
          <Button size="sm" variant="secondary" onClick={handleTraverse}>Traverse</Button>
          <Button size="sm" variant="ghost" onClick={handleGenerate}>Generate New</Button>
          <Button size="sm" variant="ghost" onClick={handleReset}>Reset</Button>
        </div>
      </div>

      {/* Visualization */}
      <div className="flex items-center justify-center gap-2 px-2 py-4" style={{ minHeight: 260 }}>
        <AnimatePresence mode="popLayout">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                backgroundColor: COLORS[item.state],
              }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: 'spring', damping: 20, stiffness: 200 }}
              className="flex flex-col items-center"
            >
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
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Step description */}
      {steps.length > 0 && currentStep < steps.length && (
        <div className="border-t border-zinc-200 px-4 py-1.5 text-center text-xs text-zinc-600 dark:border-zinc-700 dark:text-zinc-400">
          {steps[currentStep].description}
        </div>
      )}
    </div>
  )
}
