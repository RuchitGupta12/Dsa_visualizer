'use client'

import Link from 'next/link'
import { HiOutlineBars3 } from 'react-icons/hi2'
import { ThemeToggle } from './ThemeToggle'
import { Button } from '@/components/ui'

interface Props {
  onMenuToggle?: () => void
}

export function Navbar({ onMenuToggle }: Props) {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-700 dark:bg-zinc-900/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuToggle}
            className="rounded-lg p-2 text-zinc-600 hover:bg-zinc-100 lg:hidden dark:text-zinc-400 dark:hover:bg-zinc-800"
          >
            <HiOutlineBars3 className="size-6" />
          </button>
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
              DSA Viz
            </span>
            <span className="hidden text-sm text-zinc-500 dark:text-zinc-400 sm:inline">
              Learn Data Structures &amp; Algorithms
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              Dashboard
            </Button>
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
