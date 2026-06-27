'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { StackElement, Step } from '@/types'
import { createStack, pushOperation, popOperation, peekOperation, clearOperation } from '@/lib/stack'
import { randomStack } from '@/utils/dataGenerator'
import { COLORS, SPEED_MS } from '@/constants'
import { useVisualizerStore } from '@/stores/visualizerStore'
import { Button } from '@/components/ui'

export function StackVisualizer() {
  const { speed, isPlaying, play, pause, reset: storeReset, currentStep, setStep } = useVisualizerStore()
  const [baseItems, setBaseItems] = useState<StackElement[]>(() => createStack(randomStack()))
  const [steps, setSteps] = useState<Step[]>([])
  const items = useMemo(() => {
    if (steps.length > 0 && currentStep < steps.length) {
      const s = steps[currentStep]
      if (s.stack) return s.stack
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

  function handlePush() {
    const val = parseInt(inputValue)
    if (isNaN(val)) return
    setInputValue('')
    runSteps(pushOperation(items, val))
  }

  function handlePop() {
    runSteps(popOperation(items))
  }

  function handlePeek() {
    runSteps(peekOperation(items))
  }

  function handleClear() {
    runSteps(clearOperation(items))
  }

  function handleReset() {
    storeReset()
    setSteps([])
    setBaseItems(createStack(randomStack()))
    setInputValue('')
  }

  function handleGenerateNew() {
    storeReset()
    setSteps([])
    setBaseItems(createStack(randomStack()))
    setInputValue('')
  }

  const isOverflow = items.length >= 10
  const isEmpty = items.length === 0

  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap items-center gap-2 border-b border-zinc-200 px-4 py-2 dark:border-zinc-700">
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Value"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handlePush()}
            className="w-20 rounded-lg border border-zinc-200 bg-white px-2 py-1 text-sm dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
          />
          <Button size="sm" onClick={handlePush}>Push</Button>
          <Button size="sm" variant="secondary" onClick={handlePop}>Pop</Button>
          <Button size="sm" variant="ghost" onClick={handlePeek}>Peek</Button>
          <Button size="sm" variant="ghost" onClick={handleClear}>Clear</Button>
          <Button size="sm" variant="ghost" onClick={handleReset}>Reset</Button>
          <Button size="sm" variant="secondary" onClick={handleGenerateNew}>Generate New</Button>
        </div>
        {isOverflow && (
          <span className="text-xs font-medium text-red-500">Stack almost full ({items.length}/10)</span>
        )}
      </div>

      <div className="relative flex flex-col items-center px-2 py-4" style={{ minHeight: 260 }}>
        <div className="flex w-full max-w-md flex-col items-center gap-1">
          {items.length > 0 && (
            <div className="mb-1 text-xs font-semibold text-zinc-500 dark:text-zinc-400">TOP</div>
          )}
          <AnimatePresence mode="popLayout">
            {[...items].reverse().map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: -80 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  backgroundColor: COLORS[item.state] || COLORS.default,
                }}
                exit={{ opacity: 0, y: -80 }}
                transition={{ type: 'spring', damping: 20, stiffness: 200 }}
                className="flex h-10 w-full items-center justify-center rounded-lg text-sm font-bold text-white shadow-sm"
              >
                {item.value}
              </motion.div>
            ))}
          </AnimatePresence>
          {isEmpty && (
            <div className="flex h-32 items-center justify-center text-sm text-zinc-400 dark:text-zinc-500">
              Stack is empty
            </div>
          )}
          {steps[currentStep]?.description.toLowerCase().includes('underflow') && (
            <div className="text-xs font-medium text-amber-500">Underflow: cannot pop from empty stack</div>
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
