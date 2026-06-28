'use client'

import { useEffect, useMemo, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { ListNode, Step } from '@/types'
import {
  createLinkedList,
  insertBeginning,
  insertEnd,
  insertAtPosition,
  deleteBeginning,
  deleteEnd,
  deleteAtPosition,
  searchOperation,
  traverseOperation,
} from '@/lib/linkedList'
import { randomLinkedList } from '@/utils/dataGenerator'
import { COLORS, SPEED_MS } from '@/constants'
import { useVisualizerStore } from '@/stores/visualizerStore'
import { Button } from '@/components/ui'

const NODE_W = 80
const NODE_H = 40
const GAP = 80

export function LinkedListVisualizer() {
  const { speed, isPlaying, play, pause, reset: storeReset, currentStep, setStep } = useVisualizerStore()
  const [baseItems, setBaseItems] = useState<ListNode[]>(() => createLinkedList(randomLinkedList()))
  const [steps, setSteps] = useState<Step[]>([])
  const items = useMemo(() => {
    if (steps.length > 0 && currentStep < steps.length) {
      const s = steps[currentStep]
      if (s.list) return s.list
    }
    return baseItems
  }, [steps, currentStep, baseItems])
  const [inputValue, setInputValue] = useState('')
  const [inputPosition, setInputPosition] = useState('')
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

  function handleInsertBeginning() {
    const val = parseInt(inputValue)
    if (isNaN(val)) return
    setInputValue('')
    runSteps(insertBeginning(items, val))
  }

  function handleInsertEnd() {
    const val = parseInt(inputValue)
    if (isNaN(val)) return
    setInputValue('')
    runSteps(insertEnd(items, val))
  }

  function handleInsertPosition() {
    const val = parseInt(inputValue)
    const pos = parseInt(inputPosition)
    if (isNaN(val) || isNaN(pos)) return
    setInputValue('')
    setInputPosition('')
    runSteps(insertAtPosition(items, val, pos))
  }

  function handleDeleteBeginning() {
    runSteps(deleteBeginning(items))
  }

  function handleDeleteEnd() {
    runSteps(deleteEnd(items))
  }

  function handleDeletePosition() {
    const pos = parseInt(inputPosition)
    if (isNaN(pos)) return
    setInputPosition('')
    runSteps(deleteAtPosition(items, pos))
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

  function handleReset() {
    storeReset()
    setSteps([])
    setBaseItems(createLinkedList(randomLinkedList()))
    setInputValue('')
    setInputPosition('')
    setSearchValue('')
  }

  function handleGenerateNew() {
    storeReset()
    setSteps([])
    setBaseItems(createLinkedList(randomLinkedList()))
    setInputValue('')
    setInputPosition('')
    setSearchValue('')
  }

  const svgWidth = Math.max(items.length * (NODE_W + GAP) + GAP, 400)
  const svgHeight = 260

  const [isMobile, setIsMobile] = useState(false)
  const checkMobile = useCallback(() => setIsMobile(window.innerWidth < 640), [])
  useEffect(() => {
    checkMobile()
    addEventListener('resize', checkMobile)
    return () => removeEventListener('resize', checkMobile)
  }, [checkMobile])

  return (
    <div className="flex flex-col">
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
            placeholder="Position"
            value={inputPosition}
            onChange={(e) => setInputPosition(e.target.value)}
            className="w-20 rounded-lg border border-zinc-200 bg-white px-2 py-1 text-sm dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
          />
          <Button size="sm" onClick={handleInsertBeginning}>Ins Beg</Button>
          <Button size="sm" variant="secondary" onClick={handleInsertEnd}>Ins End</Button>
          <Button size="sm" variant="ghost" onClick={handleInsertPosition}>Ins Pos</Button>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" onClick={handleDeleteBeginning}>Del Beg</Button>
          <Button size="sm" variant="secondary" onClick={handleDeleteEnd}>Del End</Button>
          <Button size="sm" variant="ghost" onClick={handleDeletePosition}>Del Pos</Button>
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
          <Button size="sm" variant="ghost" onClick={handleReset}>Reset</Button>
          <Button size="sm" variant="secondary" onClick={handleGenerateNew}>Generate New</Button>
        </div>
      </div>

      <div className="flex items-center justify-center px-2 py-4" style={{ minHeight: 260 }}>
        <svg
          width={isMobile ? undefined : svgWidth}
          height={isMobile ? undefined : svgHeight}
          viewBox={isMobile ? `0 0 ${svgWidth} ${svgHeight}` : undefined}
          className={isMobile ? 'w-full overflow-visible' : 'overflow-visible'}
          preserveAspectRatio={isMobile ? 'xMidYMid meet' : undefined}
        >
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#71717a" />
            </marker>
          </defs>
          <AnimatePresence>
            {items.map((node, i) => {
              const x = GAP + i * (NODE_W + GAP)
              const y = svgHeight / 2 - NODE_H / 2
              return (
                <motion.g
                  key={node.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ type: 'spring', damping: 20, stiffness: 200 }}
                >
                  {node.next !== null && (
                    <line
                      x1={x + NODE_W}
                      y1={y + NODE_H / 2}
                      x2={x + NODE_W + GAP}
                      y2={y + NODE_H / 2}
                      stroke="#71717a"
                      strokeWidth="2"
                      markerEnd="url(#arrowhead)"
                    />
                  )}
                  <rect
                    x={x}
                    y={y}
                    width={NODE_W}
                    height={NODE_H}
                    rx="8"
                    ry="8"
                    fill={COLORS[node.state] || COLORS.default}
                    className="drop-shadow-md"
                  />
                  <text
                    x={x + NODE_W / 2}
                    y={y + NODE_H / 2}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="white"
                    fontSize="14"
                    fontWeight="bold"
                  >
                    {node.value}
                  </text>
                </motion.g>
              )
            })}
          </AnimatePresence>
        </svg>
      </div>

      {steps.length > 0 && currentStep < steps.length && (
        <div className="border-t border-zinc-200 px-4 py-1.5 text-center text-xs text-zinc-600 dark:border-zinc-700 dark:text-zinc-400">
          {steps[currentStep].description}
        </div>
      )}
    </div>
  )
}
