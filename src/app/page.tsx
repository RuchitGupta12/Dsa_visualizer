'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Button } from '@/components/ui'
import {
  HiOutlineQueueList,
  HiOutlineLink,
  HiOutlineViewColumns,
  HiOutlineCircleStack,
  HiOutlineMagnifyingGlass,
  HiOutlineBarsArrowDown,
  HiOutlineArrowsRightLeft,
  HiOutlineArrowPath,
  HiOutlineCpuChip,
  HiOutlineSparkles,
  HiOutlineChartBar,
  HiOutlineAcademicCap,
} from 'react-icons/hi2'

function useScrollReveal() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) controls.start('visible')
  }, [isInView, controls])

  return { ref, controls, variants: { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } } }
}

function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { ref, controls, variants } = useScrollReveal()
  return (
    <motion.section ref={ref} variants={variants} initial="hidden" animate={controls} className={className}>
      {children}
    </motion.section>
  )
}

const features = [
  { icon: HiOutlineSparkles, title: 'Interactive Learning', desc: 'Manipulate data structures in real time. See every operation animate before your eyes.' },
  { icon: HiOutlineChartBar, title: 'Live Visualization', desc: 'Watch algorithms execute step by step with color-coded highlights for each operation.' },
  { icon: HiOutlineCpuChip, title: 'Complexity Analysis', desc: 'Understand time and space complexity with detailed breakdowns for every operation.' },
  { icon: HiOutlineAcademicCap, title: 'Interview Preparation', desc: 'Master DSA concepts with interactive visualizations built for coding interview prep.' },
]

const dsItems = [
  { icon: HiOutlineQueueList, name: 'Array', desc: 'Indexed, contiguous memory', href: '/visualizer/array' },
  { icon: HiOutlineLink, name: 'Linked List', desc: 'Nodes with pointers', href: '/visualizer/linkedList' },
  { icon: HiOutlineViewColumns, name: 'Stack', desc: 'LIFO structure', href: '/visualizer/stack' },
  { icon: HiOutlineQueueList, name: 'Queue', desc: 'FIFO structure', href: '/visualizer/queue' },
  { icon: HiOutlineCircleStack, name: 'Tree', desc: 'Hierarchical data', href: '/visualizer/tree' },
  { icon: HiOutlineCircleStack, name: 'BST', desc: 'Sorted binary tree', href: '/visualizer/bst' },
]

const algoItems = [
  { icon: HiOutlineMagnifyingGlass, name: 'Linear Search', desc: 'O(n)', href: '/visualizer/linearSearch' },
  { icon: HiOutlineMagnifyingGlass, name: 'Binary Search', desc: 'O(log n)', href: '/visualizer/binarySearch' },
  { icon: HiOutlineBarsArrowDown, name: 'Bubble Sort', desc: 'O(n²)', href: '/visualizer/bubbleSort' },
  { icon: HiOutlineBarsArrowDown, name: 'Selection Sort', desc: 'O(n²)', href: '/visualizer/selectionSort' },
  { icon: HiOutlineQueueList, name: 'Insertion Sort', desc: 'O(n²)', href: '/visualizer/insertionSort' },
  { icon: HiOutlineArrowsRightLeft, name: 'Merge Sort', desc: 'O(n log n)', href: '/visualizer/mergeSort' },
  { icon: HiOutlineArrowPath, name: 'Quick Sort', desc: 'O(n log n)', href: '/visualizer/quickSort' },
]

function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full opacity-20 dark:opacity-10"
          style={{
            width: `${80 + i * 40}px`,
            height: `${80 + i * 40}px`,
            background: i % 2 === 0 ? '#6366f1' : '#a855f7',
            left: `${10 + i * 15}%`,
            top: `${15 + i * 12}%`,
          }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -40, 20, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 1.5,
          }}
        />
      ))}
    </div>
  )
}

function SpotlightGradient() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-500/5" />
      <div className="absolute -bottom-40 left-0 h-[400px] w-[400px] rounded-full bg-purple-500/10 blur-3xl dark:bg-purple-500/5" />
    </div>
  )
}

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden py-24 sm:py-32">
          <FloatingShapes />
          <SpotlightGradient />
          <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-6xl dark:text-white">
                Master Data Structures{' '}
                <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                  & Algorithms
                </span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
                Learn DSA through interactive visualizations. Watch algorithms execute step by step,
                manipulate data structures in real time, and build interview confidence.
              </p>
              <div className="mt-10 flex items-center justify-center gap-4">
                <Link href="/dashboard">
                  <Button size="lg">
                    <HiOutlineSparkles className="size-5" />
                    Get Started
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button variant="secondary" size="lg">
                    Explore Visualizers
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features */}
        <AnimatedSection className="border-t border-zinc-200 py-12 dark:border-zinc-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <h2 className="text-center text-2xl font-bold text-zinc-900 dark:text-white">
              Why DSA Viz?
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-center text-sm text-zinc-600 dark:text-zinc-400">
              Built for students who learn better by seeing concepts in action.
            </p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((f) => (
                <motion.div
                  key={f.title}
                  whileHover={{ y: -4 }}
                  className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition-colors dark:border-zinc-700 dark:bg-zinc-800"
                >
                  <f.icon className="size-7 text-indigo-500" />
                  <h3 className="mt-3 font-semibold text-zinc-900 dark:text-white">{f.title}</h3>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Data Structures */}
        <AnimatedSection className="bg-zinc-50 py-12 dark:bg-zinc-900">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <h2 className="text-center text-2xl font-bold text-zinc-900 dark:text-white">
              Supported Data Structures
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-center text-sm text-zinc-600 dark:text-zinc-400">
              Interactive visualizers for fundamental data structures.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {dsItems.map((ds) => (
                <Link key={ds.name} href={ds.href}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white p-3.5 shadow-sm dark:border-zinc-700 dark:bg-zinc-800"
                  >
                    <ds.icon className="size-7 shrink-0 text-indigo-500" />
                    <div>
                      <h3 className="font-semibold text-zinc-900 dark:text-white">{ds.name}</h3>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">{ds.desc}</p>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Algorithms */}
        <AnimatedSection className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <h2 className="text-center text-2xl font-bold text-zinc-900 dark:text-white">
              Supported Algorithms
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-center text-sm text-zinc-600 dark:text-zinc-400">
              Step-by-step visualization of sorting and searching algorithms.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {algoItems.map((algo) => (
                <Link key={algo.name} href={algo.href}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white p-3.5 shadow-sm dark:border-zinc-700 dark:bg-zinc-800"
                  >
                    <algo.icon className="size-7 shrink-0 text-purple-500" />
                    <div>
                      <h3 className="font-semibold text-zinc-900 dark:text-white">{algo.name}</h3>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">{algo.desc}</p>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </AnimatedSection>


      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 py-8 dark:border-zinc-800">
        <div className="mx-auto max-w-7xl px-4 text-center text-sm text-zinc-500 dark:text-zinc-400 sm:px-6">
          <p>DSA Viz — Learn Data Structures &amp; Algorithms Visually</p>
        </div>
      </footer>
    </>
  )
}
