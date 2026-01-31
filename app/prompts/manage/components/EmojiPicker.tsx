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
    <div className="border border-gray-300 rounded-md bg-white shadow-sm overflow-hidden">
      {/* Category Tabs */}
      <div className="flex gap-1 p-2 border-b border-gray-200 overflow-x-auto bg-gray-50">
        {Object.keys(EMOJI_CATEGORIES).map(category => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
              activeCategory === category
                ? 'bg-white text-black shadow-sm'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Emoji Grid */}
      <div className="p-4 bg-white">
        <div className="grid grid-cols-8 gap-1">
          {EMOJI_CATEGORIES[activeCategory as keyof typeof EMOJI_CATEGORIES].map(emoji => (
            <button
              key={emoji}
              type="button"
              onClick={() => onEmojiSelect(emoji)}
              className={`p-2.5 text-2xl rounded-md transition-colors ${
                selectedEmoji === emoji
                  ? 'bg-gray-100 ring-1 ring-black'
                  : 'hover:bg-gray-50'
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
        <div className="px-4 py-3 border-t border-gray-200 bg-white text-center">
          <span className="text-sm font-medium text-gray-700">Selecionado: </span>
          <span className="text-3xl ml-2 inline-block">{selectedEmoji}</span>
        </div>
      )}
    </div>
  )
}
