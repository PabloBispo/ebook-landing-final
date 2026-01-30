'use client'

import { useState } from 'react'

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void
  selectedEmoji?: string
}

const EMOJI_CATEGORIES = {
  'Objetos': ['📚', '📖', '📝', '✏️', '📋', '📌', '📍', '🔖', '💡', '🔍', '🔎', '⚡', '✨', '🎯', '🎪', '🎨'],
  'Símbolos': ['✅', '❌', '⭐', '🌟', '💫', '🔥', '💎', '🏆', '🎖️', '🎗️', '🔔', '⚙️', '🔧', '🔨', '🛠️', '⚔️'],
  'Pessoas': ['👤', '👥', '👨‍💻', '👩‍💻', '🧑‍💼', '👨‍🏫', '👩‍🏫', '🧠', '💪', '👋', '👍', '✌️', '🤝', '👏', '🙌', '💼'],
  'Natureza': ['🌍', '🌎', '🌏', '🌐', '🌱', '🌿', '🍀', '🌸', '🌺', '🌻', '🌼', '💐', '🌹', '🌲', '🌳', '🌴'],
  'Comunicação': ['💬', '💭', '🗨️', '🗯️', '💡', '📢', '📣', '🔊', '📱', '💻', '⌨️', '🖥️', '📧', '📨', '📩', '📤'],
  'Gráficos': ['📊', '📈', '📉', '💹', '🔢', '🔤', '🔡', '🔠', '#️⃣', '*️⃣', '🆕', '🆙', '🆒', '🆓', '🔝', '🔜'],
  'Educação': ['🎓', '📚', '📖', '✏️', '📝', '🖊️', '🖍️', '📐', '📏', '🧮', '🔬', '🔭', '🧪', '🧬', '🎒', '📓'],
}

export function EmojiPicker({ onEmojiSelect, selectedEmoji }: EmojiPickerProps) {
  const [activeCategory, setActiveCategory] = useState<string>('Objetos')

  return (
    <div className="border rounded-lg bg-white shadow-lg">
      {/* Category Tabs */}
      <div className="flex gap-1 p-2 border-b overflow-x-auto">
        {Object.keys(EMOJI_CATEGORIES).map(category => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            className={`px-3 py-1 rounded text-xs whitespace-nowrap transition-colors ${
              activeCategory === category
                ? 'bg-primary text-white'
                : 'bg-muted hover:bg-muted/70'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Emoji Grid */}
      <div className="p-3">
        <div className="grid grid-cols-8 gap-1">
          {EMOJI_CATEGORIES[activeCategory as keyof typeof EMOJI_CATEGORIES].map(emoji => (
            <button
              key={emoji}
              type="button"
              onClick={() => onEmojiSelect(emoji)}
              className={`p-2 text-2xl hover:bg-muted rounded transition-all hover:scale-110 ${
                selectedEmoji === emoji
                  ? 'bg-primary/10 ring-2 ring-primary'
                  : ''
              }`}
              title={emoji}
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>

      {/* Current Selection */}
      {selectedEmoji && (
        <div className="p-2 border-t bg-muted/30 text-center">
          <span className="text-sm text-muted-foreground">Selecionado: </span>
          <span className="text-2xl ml-2">{selectedEmoji}</span>
        </div>
      )}
    </div>
  )
}
