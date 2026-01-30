'use client'

import { useState, useEffect } from 'react'

interface Category {
  slug: string
  name: string
  icon: string
}

interface FilterBarProps {
  selectedCategory: string | null
  onCategoryChange: (slug: string | null) => void
}

export function FilterBar({ selectedCategory, onCategoryChange }: FilterBarProps) {
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    fetch('/api/prompts/categories')
      .then(res => res.json())
      .then(data => setCategories(data.data || []))
      .catch(console.error)
  }, [])

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onCategoryChange(null)}
        className={`px-4 py-2 rounded-lg transition-colors ${
          !selectedCategory
            ? 'bg-primary text-primary-foreground'
            : 'bg-secondary hover:bg-secondary/80'
        }`}
      >
        Todas
      </button>

      {categories.map(cat => (
        <button
          key={cat.slug}
          onClick={() => onCategoryChange(cat.slug)}
          className={`px-4 py-2 rounded-lg transition-colors ${
            selectedCategory === cat.slug
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary hover:bg-secondary/80'
          }`}
        >
          {cat.icon} {cat.name}
        </button>
      ))}
    </div>
  )
}
