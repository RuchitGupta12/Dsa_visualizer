'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { TreeNode, Step } from '@/types'
import { createTree, insertNode, deleteNode, searchNode, inorderTraversal, preorderTraversal, postorderTraversal } from '@/lib/tree'
import { randomTreeValues } from '@/utils/dataGenerator'
import { COLORS, SPEED_MS } from '@/constants'
import { useVisualizerStore } from '@/stores/visualizerStore'
import { Button } from '@/components/ui'

export function TreeVisualizer() {
  const { speed, isPlaying, play, pause, reset: storeReset, currentStep, setStep } = useVisualizerStore()
  const [baseItems, setBaseItems] = useState<TreeNode[]>(() => createTree(randomTreeValues()))
  const [steps, setSteps] = useState<Step[]>([])
  const items = useMemo(() => {
    if (steps.length > 0 && currentStep < steps.length) {
      const s = steps[currentStep]
      if (s.tree) return s.tree
    }
    return baseItems
  }, [steps, currentStep, baseItems])
  const [inputValue, setInputValue] = useState('')
  const [deleteValue, setDeleteValue] = useState('')
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
    if (isNaN(val)) return
    setInputValue('')
    runSteps(insertNode(items, val))
  }

  function handleDelete() {
    const val = parseInt(deleteValue)
    if (isNaN(val)) return
    setDeleteValue('')
    runSteps(deleteNode(items, val))
  }

  function handleSearch() {
    const target = parseInt(searchValue)
    if (isNaN(target)) return
    setSearchValue('')
    runSteps(searchNode(items, target))
  }

  function handleInorder() {
    runSteps(inorderTraversal(items))
  }

  function handlePreorder() {
    runSteps(preorderTraversal(items))
  }

  function handlePostorder() {
    runSteps(postorderTraversal(items))
  }

  function handleReset() {
    storeReset()
    setSteps([])
    setBaseItems(createTree(randomTreeValues()))
    setInputValue('')
    setDeleteValue('')
    setSearchValue('')
  }

  function handleGenerateNew() {
    storeReset()
    setSteps([])
    setBaseItems(createTree(randomTreeValues()))
    setInputValue('')
    setDeleteValue('')
    setSearchValue('')
  }

  const edges: { x1: number; y1: number; x2: number; y2: number; key: string }[] = []

  if (items.length > 0) {
    for (const node of items) {
      if (node.left !== null) {
        const child = items.find((n) => n.id === node.left)
        if (child) {
          edges.push({
            key: `${node.id}-${child.id}`,
            x1: node.x,
            y1: node.y,
            x2: child.x,
            y2: child.y,
          })
        }
      }
      if (node.right !== null) {
        const child = items.find((n) => n.id === node.right)
        if (child) {
          edges.push({
            key: `${node.id}-${child.id}`,
            x1: node.x,
            y1: node.y,
            x2: child.x,
            y2: child.y,
          })
        }
      }
    }
  }

  const xs = items.map((n) => n.x)
  const ys = items.map((n) => n.y)
  const minX = Math.min(...xs, 0) - 60
  const maxX = Math.max(...xs, 400) + 60
  const minY = Math.min(...ys, 0) - 60
  const maxY = Math.max(...ys, 0) + 80
  const viewBox = `${minX} ${minY} ${maxX - minX} ${maxY - minY}`

  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap items-center gap-2 border-b border-zinc-200 px-4 py-2 dark:border-zinc-700">
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Value"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleInsert()}
            className="w-20 rounded-lg border border-zinc-200 bg-white px-2 py-1 text-sm dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
          />
          <Button size="sm" onClick={handleInsert}>Insert</Button>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Delete"
            value={deleteValue}
            onChange={(e) => setDeleteValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleDelete()}
            className="w-20 rounded-lg border border-zinc-200 bg-white px-2 py-1 text-sm dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
          />
          <Button size="sm" variant="secondary" onClick={handleDelete}>Delete</Button>
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
          <Button size="sm" variant="secondary" onClick={handleSearch}>Search</Button>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="ghost" onClick={handleInorder}>Inorder</Button>
          <Button size="sm" variant="ghost" onClick={handlePreorder}>Preorder</Button>
          <Button size="sm" variant="ghost" onClick={handlePostorder}>Postorder</Button>
          <Button size="sm" variant="ghost" onClick={handleReset}>Reset</Button>
          <Button size="sm" variant="secondary" onClick={handleGenerateNew}>Generate New</Button>
        </div>
      </div>

      <div className="flex items-center justify-center px-2 py-4" style={{ minHeight: 260 }}>
        <svg viewBox={viewBox} className="max-h-[300px] w-full" preserveAspectRatio="xMidYMid meet">
          {edges.map((edge) => (
            <line
              key={edge.key}
              x1={edge.x1}
              y1={edge.y1}
              x2={edge.x2}
              y2={edge.y2}
              stroke="#71717a"
              strokeWidth={2}
            />
          ))}
          <AnimatePresence>
            {items.map((node) => (
              <motion.g
                key={node.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  transition: { type: 'spring', damping: 20, stiffness: 200 },
                }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: 'spring', damping: 20, stiffness: 200 }}
              >
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={24}
                  fill={COLORS[node.state] || '#6366f1'}
                  stroke="#fff"
                  strokeWidth={3}
                />
                <text
                  x={node.x}
                  y={node.y}
                  textAnchor="middle"
                  dy="0.35em"
                  fill="white"
                  fontSize={14}
                  fontWeight="bold"
                >
                  {node.value}
                </text>
              </motion.g>
            ))}
          </AnimatePresence>
        </svg>
        {items.length === 0 && (
          <div className="absolute text-sm text-zinc-400 dark:text-zinc-500">Tree is empty</div>
        )}
      </div>

      {steps.length > 0 && currentStep < steps.length && (
        <div className="border-t border-zinc-200 px-4 py-1.5 text-center text-xs text-zinc-600 dark:border-zinc-700 dark:text-zinc-400">
          {steps[currentStep].description}
        </div>
      )}
    </div>
  )
}
