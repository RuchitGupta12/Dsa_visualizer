'use client'

import { useRouter, usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HiOutlineQueueList,
  HiOutlineLink,
  HiOutlineViewColumns,
  HiOutlineCircleStack,
  HiOutlineMagnifyingGlass,
  HiOutlineMagnifyingGlassPlus,
  HiOutlineBarsArrowDown,
  HiOutlineBarsArrowUp,
  HiOutlineBars3CenterLeft,
  HiOutlineArrowsRightLeft,
  HiOutlineArrowPath,
} from 'react-icons/hi2'
import type { ReactNode } from 'react'

const iconMap: Record<string, ReactNode> = {
  HiOutlineQueueList: <HiOutlineQueueList className="size-5" />,
  HiOutlineLink: <HiOutlineLink className="size-5" />,
  HiOutlineViewColumns: <HiOutlineViewColumns className="size-5" />,
  HiOutlineCircleStack: <HiOutlineCircleStack className="size-5" />,
  HiOutlineMagnifyingGlass: <HiOutlineMagnifyingGlass className="size-5" />,
  HiOutlineMagnifyingGlassPlus: <HiOutlineMagnifyingGlassPlus className="size-5" />,
  HiOutlineBarsArrowDown: <HiOutlineBarsArrowDown className="size-5" />,
  HiOutlineBarsArrowUp: <HiOutlineBarsArrowUp className="size-5" />,
  HiOutlineBars3CenterLeft: <HiOutlineBars3CenterLeft className="size-5" />,
  HiOutlineArrowsRightLeft: <HiOutlineArrowsRightLeft className="size-5" />,
  HiOutlineArrowPath: <HiOutlineArrowPath className="size-5" />,
}

interface SidebarItem {
  id: string
  label: string
  icon: string
  description: string
}

interface Props {
  open: boolean
  onClose: () => void
}

const dsItems: SidebarItem[] = [
  { id: 'array', label: 'Array', icon: 'HiOutlineQueueList', description: 'Contiguous memory, indexed access' },
  { id: 'linkedList', label: 'Linked List', icon: 'HiOutlineLink', description: 'Nodes connected by pointers' },
  { id: 'stack', label: 'Stack', icon: 'HiOutlineViewColumns', description: 'LIFO — Last In, First Out' },
  { id: 'queue', label: 'Queue', icon: 'HiOutlineQueueList', description: 'FIFO — First In, First Out' },
  { id: 'tree', label: 'Tree', icon: 'HiOutlineCircleStack', description: 'Hierarchical nodes' },
  { id: 'bst', label: 'BST', icon: 'HiOutlineCircleStack', description: 'Sorted binary tree' },
]

const algoItems: SidebarItem[] = [
  { id: 'linearSearch', label: 'Linear Search', icon: 'HiOutlineMagnifyingGlass', description: 'Sequential scan O(n)' },
  { id: 'binarySearch', label: 'Binary Search', icon: 'HiOutlineMagnifyingGlassPlus', description: 'Divide & conquer O(log n)' },
  { id: 'bubbleSort', label: 'Bubble Sort', icon: 'HiOutlineBarsArrowDown', description: 'Adjacent swaps O(n²)' },
  { id: 'selectionSort', label: 'Selection Sort', icon: 'HiOutlineBarsArrowDown', description: 'Select minimum O(n²)' },
  { id: 'insertionSort', label: 'Insertion Sort', icon: 'HiOutlineBars3CenterLeft', description: 'Insert in place O(n²)' },
  { id: 'mergeSort', label: 'Merge Sort', icon: 'HiOutlineArrowsRightLeft', description: 'Divide & merge O(n log n)' },
  { id: 'quickSort', label: 'Quick Sort', icon: 'HiOutlineArrowPath', description: 'Partition & pivot O(n log n)' },
]

function SidebarSection({ title, items }: { title: string; items: SidebarItem[] }) {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <div className="mb-6">
      <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
        {title}
      </h3>
      <div className="space-y-1">
        {items.map((item) => {
          const active = pathname === `/visualizer/${item.id}`
          return (
            <button
              key={item.id}
              onClick={() => router.push(`/visualizer/${item.id}`)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                active
                  ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300'
                  : 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800'
              }`}
            >
              {iconMap[item.icon]}
              <div className="flex-1 truncate">
                <div className="font-medium">{item.label}</div>
                <div className="text-xs text-zinc-400 dark:text-zinc-500">{item.description}</div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function Sidebar({ open, onClose }: Props) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={onClose}
        />
      )}

      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed left-0 top-16 z-50 h-[calc(100vh-4rem)] w-64 overflow-y-auto border-r border-zinc-200 bg-white px-3 py-6 lg:hidden dark:border-zinc-700 dark:bg-zinc-900"
          >
            <SidebarSection title="Data Structures" items={dsItems} />
            <SidebarSection title="Algorithms" items={algoItems} />
          </motion.aside>
        )}
      </AnimatePresence>

      <aside className="hidden h-[calc(100vh-4rem)] w-64 overflow-y-auto border-r border-zinc-200 bg-white px-3 py-6 lg:block dark:border-zinc-700 dark:bg-zinc-900">
        <SidebarSection title="Data Structures" items={dsItems} />
        <SidebarSection title="Algorithms" items={algoItems} />
      </aside>
    </>
  )
}
