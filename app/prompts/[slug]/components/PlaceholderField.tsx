'use client'

import type { Placeholder } from '@/lib/prompts/types'

interface PlaceholderFieldProps {
  placeholder: Placeholder
  value: string
  onChange: (value: string) => void
  error?: string
  onBlur?: () => void
}

export function PlaceholderField({
  placeholder,
  value,
  onChange,
  error,
  onBlur,
}: PlaceholderFieldProps) {
  const baseInputClasses = `
    w-full px-4 py-2.5 rounded-lg border bg-background
    transition-colors duration-200
    focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
    ${error ? 'border-red-500 focus:ring-red-500' : 'border-input'}
  `

  const renderInput = () => {
    switch (placeholder.type) {
      case 'textarea':
        return (
          <textarea
            value={value}
            onChange={e => onChange(e.target.value)}
            onBlur={onBlur}
            placeholder={placeholder.placeholder || placeholder.description}
            maxLength={placeholder.maxLength}
            rows={4}
            className={baseInputClasses}
          />
        )

      case 'select':
        return (
          <select
            value={value}
            onChange={e => onChange(e.target.value)}
            onBlur={onBlur}
            className={baseInputClasses}
          >
            <option value="">Selecione uma opção...</option>
            {placeholder.options?.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        )

      case 'number':
        return (
          <input
            type="number"
            value={value}
            onChange={e => onChange(e.target.value)}
            onBlur={onBlur}
            placeholder={placeholder.placeholder || placeholder.description}
            maxLength={placeholder.maxLength}
            className={baseInputClasses}
          />
        )

      case 'email':
        return (
          <input
            type="email"
            value={value}
            onChange={e => onChange(e.target.value)}
            onBlur={onBlur}
            placeholder={placeholder.placeholder || placeholder.description}
            maxLength={placeholder.maxLength}
            className={baseInputClasses}
          />
        )

      case 'url':
        return (
          <input
            type="url"
            value={value}
            onChange={e => onChange(e.target.value)}
            onBlur={onBlur}
            placeholder={placeholder.placeholder || placeholder.description}
            maxLength={placeholder.maxLength}
            className={baseInputClasses}
          />
        )

      default: // text
        return (
          <input
            type="text"
            value={value}
            onChange={e => onChange(e.target.value)}
            onBlur={onBlur}
            placeholder={placeholder.placeholder || placeholder.description}
            maxLength={placeholder.maxLength}
            className={baseInputClasses}
          />
        )
    }
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">
        {placeholder.label}
        {placeholder.required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {placeholder.description && (
        <p className="text-sm text-muted-foreground">{placeholder.description}</p>
      )}

      {renderInput()}

      {error && (
        <p className="text-sm text-red-500 flex items-center gap-1">
          <span>⚠️</span>
          {error}
        </p>
      )}

      {placeholder.maxLength && !error && (
        <p className="text-xs text-muted-foreground text-right">
          {value.length} / {placeholder.maxLength}
        </p>
      )}
    </div>
  )
}
