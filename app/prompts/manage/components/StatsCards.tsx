import { FileText, CheckCircle, Edit3, Archive } from 'lucide-react'

interface StatsCardsProps {
  stats: {
    total: number
    published: number
    drafts: number
    archived: number
  }
}

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard
        label="Total de Prompts"
        value={stats.total}
        icon={FileText}
      />
      <StatCard
        label="Publicados"
        value={stats.published}
        icon={CheckCircle}
      />
      <StatCard
        label="Rascunhos"
        value={stats.drafts}
        icon={Edit3}
      />
      <StatCard
        label="Arquivados"
        value={stats.archived}
        icon={Archive}
      />
    </div>
  )
}

function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string
  value: number
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>
}) {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 transition-colors duration-200">
      <div className="flex items-start justify-between mb-3">
        <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 font-medium">{label}</p>
        <Icon className="h-4 w-4 text-gray-400 dark:text-gray-500" strokeWidth={1.5} />
      </div>
      <p className="text-3xl font-semibold text-gray-900 dark:text-gray-100">{value}</p>
    </div>
  )
}
