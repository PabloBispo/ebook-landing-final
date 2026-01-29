export function PromptContent({ content }: { content: string }) {
  return (
    <div className="glass-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Prompt:</h3>
      </div>
      <pre className="whitespace-pre-wrap text-sm bg-secondary/20 p-4 rounded-lg">
        {content}
      </pre>
    </div>
  )
}
