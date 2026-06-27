'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { LearningData } from '@/types'
import { learningData } from '@/constants/learningData'
import {
  HiOutlineLightBulb,
  HiOutlineChartBar,
  HiOutlineCog6Tooth,
  HiOutlineBriefcase,
  HiOutlineHandThumbUp,
  HiOutlineHandThumbDown,
  HiOutlineClock,
  HiOutlinePlay,
} from 'react-icons/hi2'

interface Props {
  type: string
}

type TabKey = 'concept' | 'complexity' | 'videos'

export function LearningPanel({ type }: Props) {
  const [tab, setTab] = useState<TabKey>('concept')
  const data: LearningData | undefined = learningData[type]

  const tabs: { key: TabKey; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { key: 'concept', label: 'Concept', icon: HiOutlineLightBulb },
    { key: 'complexity', label: 'Complexity', icon: HiOutlineChartBar },
    ...(data?.videos ? [{ key: 'videos' as const, label: 'Videos', icon: HiOutlinePlay }] : []),
  ]

  if (!data) {
    return (
      <div className="rounded-lg border border-dashed border-zinc-300 p-6 text-center dark:border-zinc-600">
        <HiOutlineLightBulb className="mx-auto size-8 text-zinc-300 dark:text-zinc-600" />
        <h3 className="mt-3 font-semibold text-zinc-900 dark:text-white">Learning Panel</h3>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Content coming soon for this topic.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-1 rounded-lg bg-zinc-100 p-1 dark:bg-zinc-800">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-all ${
              tab === t.key
                ? 'bg-white text-indigo-600 shadow-sm dark:bg-zinc-700 dark:text-indigo-400'
                : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200'
            }`}
          >
            <t.icon className="size-4" />
            {t.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {tab === 'concept' && (
          <motion.div
            key="concept"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-3"
          >
            <div className="rounded-lg border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-800">
              <div className="flex items-center gap-2 border-b border-zinc-100 px-4 py-3 dark:border-zinc-700">
                <HiOutlineLightBulb className="size-4 text-amber-500" />
                <h4 className="text-sm font-semibold text-zinc-900 dark:text-white">Concept</h4>
              </div>
              <div className="p-4">
                <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {data.concept}
                </p>
              </div>
            </div>

            <div className="rounded-lg border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-800">
              <div className="flex items-center gap-2 border-b border-zinc-100 px-4 py-3 dark:border-zinc-700">
                <HiOutlineCog6Tooth className="size-4 text-blue-500" />
                <h4 className="text-sm font-semibold text-zinc-900 dark:text-white">How It Works</h4>
              </div>
              <ol className="space-y-2 p-4 pt-2">
                {data.working.map((step, i) => (
                  <li key={i} className="flex gap-3 text-sm">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-[11px] font-bold text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400">
                      {i + 1}
                    </span>
                    <span className="pt-0.5 text-zinc-600 dark:text-zinc-400">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-lg border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-800">
              <div className="flex items-center gap-2 border-b border-zinc-100 px-4 py-3 dark:border-zinc-700">
                <HiOutlineBriefcase className="size-4 text-purple-500" />
                <h4 className="text-sm font-semibold text-zinc-900 dark:text-white">Applications</h4>
              </div>
              <div className="flex flex-wrap gap-1.5 p-4 pt-3">
                {data.applications.map((app, i) => (
                  <span
                    key={i}
                    className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300"
                  >
                    {app}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="rounded-lg border border-emerald-200 bg-emerald-50/50 dark:border-emerald-900 dark:bg-emerald-950/20">
                <div className="flex items-center gap-2 border-b border-emerald-100 px-4 py-3 dark:border-emerald-900/50">
                  <HiOutlineHandThumbUp className="size-4 text-emerald-600 dark:text-emerald-400" />
                  <h4 className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                    Advantages
                  </h4>
                </div>
                <ul className="space-y-1 p-4 pt-3">
                  {data.advantages.map((a, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-emerald-700 dark:text-emerald-400">
                      <span className="mt-0.5 size-1.5 shrink-0 rounded-full bg-emerald-500" />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-lg border border-red-200 bg-red-50/50 dark:border-red-900 dark:bg-red-950/20">
                <div className="flex items-center gap-2 border-b border-red-100 px-4 py-3 dark:border-red-900/50">
                  <HiOutlineHandThumbDown className="size-4 text-red-600 dark:text-red-400" />
                  <h4 className="text-sm font-semibold text-red-800 dark:text-red-300">
                    Disadvantages
                  </h4>
                </div>
                <ul className="space-y-1 p-4 pt-3">
                  {data.disadvantages.map((d, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-red-700 dark:text-red-400">
                      <span className="mt-0.5 size-1.5 shrink-0 rounded-full bg-red-500" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}

        {tab === 'videos' && data.videos && (
          <motion.div
            key="videos"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-3"
          >
            {data.videos.map((v, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-lg border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-800"
              >
                <div className="aspect-video w-full">
                  <iframe
                    src={`https://www.youtube.com/embed/${new URL(v.url).searchParams.get('v')}`}
                    title={v.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="size-full"
                  />
                </div>
                <div className="border-t border-zinc-100 px-4 py-3 dark:border-zinc-700">
                  <h4 className="text-sm font-semibold text-zinc-900 dark:text-white">{v.title}</h4>
                  <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">{v.channel}</p>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {tab === 'complexity' && (
          <motion.div
            key="complexity"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <div className="rounded-lg border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-800">
              <div className="flex items-center gap-2 border-b border-zinc-100 px-4 py-3 dark:border-zinc-700">
                <HiOutlineClock className="size-4 text-indigo-500" />
                <h4 className="text-sm font-semibold text-zinc-900 dark:text-white">
                  Time &amp; Space Complexity
                </h4>
              </div>
              <div className="overflow-x-auto p-4 pt-3">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-zinc-200 dark:border-zinc-700">
                      <th className="pb-2 pr-3 font-semibold text-zinc-600 dark:text-zinc-400">Operation</th>
                      <th className="pb-2 pr-3 font-semibold text-emerald-600">Best</th>
                      <th className="pb-2 pr-3 font-semibold text-amber-600">Average</th>
                      <th className="pb-2 pr-3 font-semibold text-red-600">Worst</th>
                      <th className="pb-2 font-semibold text-zinc-500">Space</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.complexity.map((c, i) => (
                      <tr
                        key={i}
                        className="border-b border-zinc-100 last:border-0 dark:border-zinc-800"
                      >
                        <td className="py-2 pr-3 font-medium text-zinc-800 dark:text-zinc-200">
                          {c.operation}
                        </td>
                        <td className="py-2 pr-3 text-emerald-600">
                          <code className="rounded bg-emerald-50 px-1.5 py-0.5 dark:bg-emerald-950/50">
                            {c.best}
                          </code>
                        </td>
                        <td className="py-2 pr-3 text-amber-600">
                          <code className="rounded bg-amber-50 px-1.5 py-0.5 dark:bg-amber-950/50">
                            {c.average}
                          </code>
                        </td>
                        <td className="py-2 pr-3 text-red-600">
                          <code className="rounded bg-red-50 px-1.5 py-0.5 dark:bg-red-950/50">
                            {c.worst}
                          </code>
                        </td>
                        <td className="py-2 text-zinc-500">
                          <code className="rounded bg-zinc-100 px-1.5 py-0.5 dark:bg-zinc-700">
                            {c.space}
                          </code>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
