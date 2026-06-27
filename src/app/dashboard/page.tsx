'use client'

import { useState } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Sidebar } from '@/components/layout/Sidebar'
import Link from 'next/link'
import { DS_LIST, ALGO_LIST } from '@/constants'
import {
  HiOutlineQueueList,
  HiOutlineLink,
  HiOutlineViewColumns,
  HiOutlineCircleStack,
  HiOutlineMagnifyingGlass,
} from 'react-icons/hi2'
import type { ReactNode } from 'react'

const iconMap: Record<string, ReactNode> = {
  HiOutlineQueueList: <HiOutlineQueueList className="size-8" />,
  HiOutlineLink: <HiOutlineLink className="size-8" />,
  HiOutlineViewColumns: <HiOutlineViewColumns className="size-8" />,
  HiOutlineCircleStack: <HiOutlineCircleStack className="size-8" />,
  HiOutlineMagnifyingGlass: <HiOutlineMagnifyingGlass className="size-8" />,
  HiOutlineMagnifyingGlassPlus: <HiOutlineMagnifyingGlass className="size-8" />,
  HiOutlineBarsArrowDown: <HiOutlineQueueList className="size-8" />,
  HiOutlineBarsArrowUp: <HiOutlineQueueList className="size-8" />,
  HiOutlineBars3CenterLeft: <HiOutlineQueueList className="size-8" />,
  HiOutlineArrowsRightLeft: <HiOutlineQueueList className="size-8" />,
  HiOutlineArrowPath: <HiOutlineQueueList className="size-8" />,
}

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex flex-1">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 overflow-y-auto p-6">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Dashboard</h1>
          <p className="mt-1 text-zinc-600 dark:text-zinc-400">
            Select a data structure or algorithm to start visualizing.
          </p>

          <section className="mt-8">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Data Structures</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {DS_LIST.map((ds) => (
                <Link key={ds.id} href={`/visualizer/${ds.id}`}>
                  <div className="flex items-center gap-4 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition-all hover:border-indigo-300 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-800 dark:hover:border-indigo-600">
                    <div className="text-indigo-500">{iconMap[ds.icon]}</div>
                    <div>
                      <h3 className="font-semibold text-zinc-900 dark:text-white">{ds.label}</h3>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">{ds.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-8">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Algorithms</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {ALGO_LIST.map((algo) => (
                <Link key={algo.id} href={`/visualizer/${algo.id}`}>
                  <div className="flex items-center gap-4 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition-all hover:border-purple-300 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-800 dark:hover:border-purple-600">
                    <div className="text-purple-500">{iconMap[algo.icon]}</div>
                    <div>
                      <h3 className="font-semibold text-zinc-900 dark:text-white">{algo.label}</h3>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">{algo.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
