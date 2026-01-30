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
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <StatCard label="Total" value={stats.total} icon="📚" />
      <StatCard label="Publicados" value={stats.published} icon="✅" />
      <StatCard label="Rascunhos" value={stats.drafts} icon="📝" />
      <StatCard label="Arquivados" value={stats.archived} icon="📦" />
    </div>
  )
}

function StatCard({
  label,
  value,
  icon,
}: {
  label: string
  value: number
  icon: string
}) {
  return (
    <div className="p-6 bg-card border rounded-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-3xl font-bold mt-1">{value}</p>
        </div>
        <span className="text-4xl">{icon}</span>
      </div>
    </div>
  )
}
