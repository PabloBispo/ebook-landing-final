interface ModelSelectorProps {
  versions: { modelTag: string; isRecommended: boolean }[]
  selected: string
  onChange: (modelTag: string) => void
}

export function ModelSelector({ versions, selected, onChange }: ModelSelectorProps) {
  const modelNames: Record<string, string> = {
    'chatgpt-4': 'ChatGPT-4',
    'claude-opus': 'Claude Opus',
    'gemini-2-flash': 'Gemini 2.0 Flash',
    'universal': 'Universal',
  }

  return (
    <div className="flex flex-wrap gap-2">
      {versions.map(v => (
        <button
          key={v.modelTag}
          onClick={() => onChange(v.modelTag)}
          className={`px-4 py-2 rounded-lg transition-colors ${
            selected === v.modelTag
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary hover:bg-secondary/80'
          }`}
        >
          {modelNames[v.modelTag] || v.modelTag}
          {v.isRecommended && ' ⭐'}
        </button>
      ))}
    </div>
  )
}
