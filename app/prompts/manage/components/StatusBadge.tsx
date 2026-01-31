import { Check } from 'lucide-react'

interface StatusBadgeProps {
  status: string
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const statusConfig: Record<string, {
    label: string
    textColor: string
    bgColor: string
    borderColor: string
    showCheck: boolean
  }> = {
    PUBLISHED: {
      label: 'Publicado',
      textColor: 'text-green-700 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-950',
      borderColor: 'border-green-200 dark:border-green-800',
      showCheck: true
    },
    DRAFT: {
      label: 'Rascunho',
      textColor: 'text-gray-700 dark:text-gray-300',
      bgColor: 'bg-gray-100 dark:bg-gray-800',
      borderColor: 'border-gray-200 dark:border-gray-700',
      showCheck: false
    },
    ARCHIVED: {
      label: 'Arquivado',
      textColor: 'text-gray-600 dark:text-gray-400',
      bgColor: 'bg-gray-100 dark:bg-gray-800',
      borderColor: 'border-gray-200 dark:border-gray-700',
      showCheck: false
    }
  }

  const config = statusConfig[status] || statusConfig.DRAFT

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium ${config.textColor} ${config.bgColor} border ${config.borderColor} rounded`}>
      {config.showCheck && <Check className="h-3 w-3" strokeWidth={2} />}
      {config.label}
    </span>
  )
}
