'use client'

import { useState, type ReactNode } from 'react'
import dynamic from 'next/dynamic'
import { useParams, notFound } from 'next/navigation'
import { Navbar } from '@/components/layout/Navbar'
import { Sidebar } from '@/components/layout/Sidebar'
import { Button } from '@/components/ui'
import { DS_LIST, ALGO_LIST } from '@/constants'
import { useVisualizerStore } from '@/stores/visualizerStore'
import type { Speed } from '@/types'
import { LearningPanel } from '@/components/explanation/LearningPanel'
import { AIExplanation } from '@/components/explanation/AIExplanation'

const ArrayVisualizer = dynamic(() => import('@/components/visualizer/ArrayVisualizer').then(m => ({ default: m.ArrayVisualizer })), { ssr: false })
const LinkedListVisualizer = dynamic(() => import('@/components/visualizer/LinkedListVisualizer').then(m => ({ default: m.LinkedListVisualizer })), { ssr: false })
const StackVisualizer = dynamic(() => import('@/components/visualizer/StackVisualizer').then(m => ({ default: m.StackVisualizer })), { ssr: false })
const QueueVisualizer = dynamic(() => import('@/components/visualizer/QueueVisualizer').then(m => ({ default: m.QueueVisualizer })), { ssr: false })
const TreeVisualizer = dynamic(() => import('@/components/visualizer/TreeVisualizer').then(m => ({ default: m.TreeVisualizer })), { ssr: false })
const SearchingVisualizer = dynamic(() => import('@/components/visualizer/SearchingVisualizer').then(m => ({ default: m.SearchingVisualizer })), { ssr: false })
const SortingVisualizer = dynamic(() => import('@/components/visualizer/SortingVisualizer').then(m => ({ default: m.SortingVisualizer })), { ssr: false })

const allItems = [...DS_LIST, ...ALGO_LIST]

const visualizerRegistry: Record<string, ReactNode> = {
  array: <ArrayVisualizer />,
  linkedList: <LinkedListVisualizer />,
  stack: <StackVisualizer />,
  queue: <QueueVisualizer />,
  tree: <TreeVisualizer />,
  bst: <TreeVisualizer />,
  linearSearch: <SearchingVisualizer type="linearSearch" />,
  binarySearch: <SearchingVisualizer type="binarySearch" />,
  bubbleSort: <SortingVisualizer type="bubbleSort" />,
  selectionSort: <SortingVisualizer type="selectionSort" />,
  insertionSort: <SortingVisualizer type="insertionSort" />,
  mergeSort: <SortingVisualizer type="mergeSort" />,
  quickSort: <SortingVisualizer type="quickSort" />,
}

export default function VisualizerPage() {
  const params = useParams()
  const type = params.type as string
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { speed, setSpeed, isPlaying, play, pause, reset } = useVisualizerStore()

  const item = allItems.find((i) => i.id === type)
  if (!item) notFound()

  const isDS = DS_LIST.some((d) => d.id === type)
  const visualizer = visualizerRegistry[type] || null

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex flex-1">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex flex-1 flex-col overflow-hidden">
          {/* Controls bar */}
          <div className="flex flex-wrap items-center gap-3 border-b border-zinc-200 bg-white px-4 py-2 dark:border-zinc-700 dark:bg-zinc-900">
            <h2 className="mr-4 text-base font-semibold text-zinc-900 dark:text-white">
              {item.label}
            </h2>

            <div className="flex items-center gap-2">
              <Button size="sm" variant="secondary" onClick={isPlaying ? pause : play}>
                {isPlaying ? 'Pause' : 'Play'}
              </Button>
              <Button size="sm" variant="ghost" onClick={reset}>
                Reset
              </Button>
            </div>

            <div className="ml-auto flex items-center gap-2">
              <span className="text-xs text-zinc-500 dark:text-zinc-400">Speed:</span>
              <select
                value={speed}
                onChange={(e) => setSpeed(e.target.value as Speed)}
                className="rounded-lg border border-zinc-200 bg-white px-2 py-1 text-sm dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
              >
                <option value="slow">Slow</option>
                <option value="normal">Normal</option>
                <option value="fast">Fast</option>
              </select>
            </div>
          </div>

          {/* Main content */}
          <div className="flex flex-1 flex-col lg:flex-row">
            {/* Visualization canvas */}
            <div className="flex flex-1 items-start border-b border-zinc-200 bg-zinc-50 lg:border-b-0 lg:border-r dark:border-zinc-700 dark:bg-zinc-900">
              {visualizer ? (
                visualizer
              ) : (
                <div className="text-center text-zinc-400 dark:text-zinc-500">
                  <div className="mb-4 text-6xl">{isDS ? '📊' : '🔍'}</div>
                  <p className="text-lg font-medium">Visualization Canvas</p>
                  <p className="mt-1 text-sm">{item.label} visualization coming soon</p>
                </div>
              )}
            </div>

            {/* Side panel: explanation + complexity */}
            <div className="w-full overflow-y-auto p-6 lg:w-80 xl:w-96">
              <LearningPanel type={type} />
              <div className="mt-4">
                <AIExplanation type={type} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
