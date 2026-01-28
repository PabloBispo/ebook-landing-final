'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Only render after component is mounted to avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="relative h-9 w-16 rounded-full bg-secondary/50" />
    )
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="group relative inline-flex h-9 w-16 items-center rounded-full bg-secondary transition-colors hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      aria-label="Toggle theme"
    >
      {/* Track */}
      <span className="sr-only">Toggle theme</span>

      {/* Sliding circle */}
      <span
        className={`absolute top-1 inline-flex h-7 w-7 items-center justify-center rounded-full bg-background shadow-sm transition-transform duration-200 ease-in-out ${
          theme === 'dark' ? 'translate-x-8' : 'translate-x-1'
        }`}
      >
        {theme === 'dark' ? (
          <Moon className="h-4 w-4 text-foreground" />
        ) : (
          <Sun className="h-4 w-4 text-foreground" />
        )}
      </span>
    </button>
  )
}
