'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { QueueElement, Step } from '@/types'
import { createQueue, enqueueOperation, dequeueOperation, peekOperation } from '@/lib/queue'
import { randomQueue } from '@/utils/dataGenerator'
import { COLORS, SPEED_MS } from '@/constants'
import { useVisualizerStore } from '@/stores/visualizerStore'
import { Button } from '@/components/ui'

export function QueueVisualizer() {
  const { speed, isPlaying, play, pause, reset: storeReset, currentStep, setStep } = useVisualizerStore()
  const [baseItems, setBaseItems] = useState<QueueElement[]>(() => createQueue(randomQueue()))
  const [steps, setSteps] = useState<Step[]>([])
  const items = useMemo(() => {
    if (steps.length > 0 && currentStep < steps.length) {
      const s = steps[currentStep]
      if (s.queue) return s.queue
    }
    return baseItems
  }, [steps, currentStep, baseItems])
  const [inputValue, setInputValue] = useState('')
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

  function handleEnqueue() {
    const val = parseInt(inputValue)
    if (isNaN(val)) return
    setInputValue('')
    runSteps(enqueueOperation(items, val))
  }

  function handleDequeue() {
    runSteps(dequeueOperation(items))
  }

  function handlePeek() {
    runSteps(peekOperation(items))
  }

  function handleReset() {
    storeReset()
    setSteps([])
    setBaseItems(createQueue(randomQueue()))
    setInputValue('')
  }

  function handleGenerateNew() {
    storeReset()
    setSteps([])
    setBaseItems(createQueue(randomQueue()))
    setInputValue('')
  }

  function getColor(state: QueueElement['state']) {
    if (state === 'front') return '#6366f1'
    if (state === 'rear') return '#a855f7'
    return COLORS[state] || '#6366f1'
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap items-center gap-2 border-b border-zinc-200 px-4 py-2 dark:border-zinc-700">
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Value"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleEnqueue()}
            className="w-20 rounded-lg border border-zinc-200 bg-white px-2 py-1 text-sm dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
          />
          <Button size="sm" onClick={handleEnqueue}>Enqueue</Button>
          <Button size="sm" variant="secondary" onClick={handleDequeue}>Dequeue</Button>
          <Button size="sm" variant="ghost" onClick={handlePeek}>Peek</Button>
          <Button size="sm" variant="ghost" onClick={handleReset}>Reset</Button>
          <Button size="sm" variant="secondary" onClick={handleGenerateNew}>Generate New</Button>
        </div>
      </div>

      <div className="flex items-center justify-center overflow-x-auto px-2 py-4" style={{ minHeight: 260 }}>
        <div className="flex items-center gap-1">
          <AnimatePresence mode="popLayout">
            {items.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, x: 100 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  backgroundColor: getColor(item.state),
                }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ type: 'spring', damping: 20, stiffness: 200 }}
                className="relative flex shrink-0 flex-col items-center"
              >
                {(i === 0 || item.state === 'front') && items.length > 0 && (
                  <span className="mb-1 whitespace-nowrap text-xs font-semibold text-indigo-500">Front</span>
                )}
                <div
                  className="flex h-12 w-14 items-center justify-center rounded-lg text-sm font-bold text-white shadow-sm sm:h-14 sm:w-16"
                  style={{ backgroundColor: getColor(item.state) }}
                >
                  {item.value}
                </div>
                {(i === items.length - 1 || item.state === 'rear') && items.length > 0 && (
                  <span className="mt-1 whitespace-nowrap text-xs font-semibold text-purple-500">Rear</span>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          {items.length === 0 && (
            <p className="text-sm text-zinc-400 dark:text-zinc-500">Queue is empty</p>
          )}
        </div>
      </div>

      {steps.length > 0 && currentStep < steps.length && (
        <div className="border-t border-zinc-200 px-4 py-1.5 text-center text-xs text-zinc-600 dark:border-zinc-700 dark:text-zinc-400">
          {steps[currentStep].description}
        </div>
      )}
    </div>
  )
}
