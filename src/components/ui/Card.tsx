'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
  hover?: boolean
}

export function Card({ children, className = '', hover = false }: Props) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, boxShadow: '0 12px 24px rgba(0,0,0,0.12)' } : undefined}
      className={`rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition-colors dark:border-zinc-700 dark:bg-zinc-800 ${className}`}
    >
      {children}
    </motion.div>
  )
}
