'use client'

import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi2'
import { useThemeStore } from '@/stores/themeStore'
import { motion } from 'framer-motion'

export function ThemeToggle() {
  const { isDark, toggle } = useThemeStore()

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={toggle}
      className="rounded-lg p-2 text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
      aria-label="Toggle theme"
    >
      {isDark ? <HiOutlineSun className="size-5" /> : <HiOutlineMoon className="size-5" />}
    </motion.button>
  )
}
