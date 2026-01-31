# Task #44: Code Snippets & Examples

Quick reference guide with copy-paste ready code snippets.

---

## Component Usage Examples

### 1. Using VersionManager in Edit Page

```tsx
// app/prompts/manage/[slug]/edit/page.tsx
import { VersionManager } from '../../components/VersionManager'

export default function EditPromptPage() {
  const [prompt, setPrompt] = useState(null)

  const fetchPrompt = () => {
    fetch(`/api/prompts/${params.slug}`)
      .then(res => res.json())
      .then(data => setPrompt(data.data))
  }

  return (
    <VersionManager
      promptId={prompt.id}
      versions={prompt.versions || []}
      onVersionCreated={fetchPrompt}
    />
  )
}
```

### 2. Model Tab Navigation

```tsx
// Select model tab
<button
  onClick={() => setSelectedModel('CHATGPT_4')}
  className={`px-4 py-2.5 text-sm font-medium border-b-2 ${
    selectedModel === 'CHATGPT_4'
      ? 'border-black text-black'
      : 'border-transparent text-gray-600'
  }`}
>
  GPT-4 ({versionCount})
</button>
```

### 3. Version Card with Expand/Collapse

```tsx
// Version card
<div className="border border-gray-200 rounded-md">
  {/* Header */}
  <div className="p-4">
    <h3 className="font-mono text-sm">v1</h3>
    {isRecommended && (
      <span className="bg-green-50 text-green-700 border border-green-200">
        Recomendada
      </span>
    )}
    <button onClick={() => toggleExpand(version.id)}>
      {isExpanded ? 'Ocultar' : 'Ver conteúdo'}
    </button>
  </div>

  {/* Content (conditional) */}
  {isExpanded && (
    <div className="border-t bg-gray-50 p-4">
      <pre className="whitespace-pre-wrap">{version.content}</pre>
    </div>
  )}
</div>
```

### 4. Modal with Backdrop Blur

```tsx
// Modal overlay
<div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm
                flex items-center justify-center z-50">
  <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full">
    {/* Modal content */}
  </div>
</div>
```

---

## API Integration Examples

### 1. Create New Version

```typescript
// POST /api/admin/prompts/[id]/versions
const createVersion = async (promptId: string) => {
  const response = await fetch(`/api/admin/prompts/${promptId}/versions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      modelTag: 'CHATGPT_4',
      content: 'Your optimized prompt here...',
      notes: 'Optimized for GPT-4 with better context',
      isRecommended: true
    })
  })

  const data = await response.json()

  if (data.success) {
    console.log('Version created:', data.data)
  } else {
    console.error('Error:', data.error)
  }
}
```

### 2. Mark Version as Recommended

```typescript
// PATCH /api/admin/prompts/[id]/versions/[vid]/recommend
const markRecommended = async (
  promptId: string,
  versionId: string,
  modelTag: string
) => {
  const response = await fetch(
    `/api/admin/prompts/${promptId}/versions/${versionId}/recommend`,
    {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ modelTag })
    }
  )

  const data = await response.json()

  if (data.success) {
    console.log('Marked as recommended:', data.data)
    // Other versions for this model are automatically unmarked
  }
}
```

### 3. Delete Version

```typescript
// DELETE /api/admin/prompts/[id]/versions/[vid]
const deleteVersion = async (promptId: string, versionId: string) => {
  if (!confirm('Tem certeza que deseja deletar esta versão?')) {
    return
  }

  const response = await fetch(
    `/api/admin/prompts/${promptId}/versions/${versionId}`,
    { method: 'DELETE' }
  )

  const data = await response.json()

  if (data.success) {
    console.log('Version deleted')
  } else {
    alert(data.error) // e.g., "Cannot delete last version"
  }
}
```

### 4. Fetch Prompt with Versions

```typescript
// GET /api/prompts/[slug]
const fetchPrompt = async (slug: string) => {
  const response = await fetch(`/api/prompts/${slug}`)
  const data = await response.json()

  if (data.success) {
    const prompt = data.data
    console.log('Versions:', prompt.versions)
    /*
    versions: [
      {
        id: "clx...",
        version: "v1",
        modelTag: "CHATGPT_4",
        content: "...",
        isRecommended: true,
        notes: "...",
        createdAt: "2024-01-30T..."
      },
      // ...
    ]
    */
  }
}
```

---

## State Management Patterns

### 1. Version List State

```typescript
// Group versions by model
const [versionsByModel, setVersionsByModel] = useState<
  Record<string, PromptVersion[]>
>({})

useEffect(() => {
  const grouped = versions.reduce((acc, version) => {
    const model = version.modelTag || 'UNIVERSAL'
    if (!acc[model]) acc[model] = []
    acc[model].push(version)
    return acc
  }, {} as Record<string, PromptVersion[]>)

  setVersionsByModel(grouped)
}, [versions])
```

### 2. Loading States

```typescript
// Multiple loading states for different operations
const [deletingVersion, setDeletingVersion] = useState<string | null>(null)
const [creatingVersion, setCreatingVersion] = useState(false)

// During delete
setDeletingVersion(versionId)
// ... delete operation
setDeletingVersion(null)

// Disable button while loading
<button
  disabled={deletingVersion === version.id}
  className="disabled:opacity-50"
>
  {deletingVersion === version.id ? 'Deletando...' : 'Deletar'}
</button>
```

### 3. Modal State

```typescript
const [showCreator, setShowCreator] = useState(false)
const [defaultModel, setDefaultModel] = useState('UNIVERSAL')

// Open with preselected model
const openCreator = (model: string) => {
  setDefaultModel(model)
  setShowCreator(true)
}

// Modal component
{showCreator && (
  <VersionCreator
    promptId={promptId}
    defaultModel={defaultModel}
    onClose={() => setShowCreator(false)}
    onCreated={() => {
      setShowCreator(false)
      fetchPrompt() // Refresh
    }}
  />
)}
```

---

## Styling Patterns

### 1. Tab System

```tsx
// Container
<div className="border-b border-gray-200">
  <div className="flex gap-4 overflow-x-auto">
    {/* Tabs */}
  </div>
</div>

// Active tab
className="border-b-2 border-black text-black"

// Inactive tab
className="border-b-2 border-transparent text-gray-600
           hover:text-gray-900 hover:border-gray-300"
```

### 2. Card with Hover

```tsx
<div className="border border-gray-200 rounded-md bg-white
                hover:border-gray-300 transition-colors">
  {/* Card content */}
</div>
```

### 3. Badge Components

```tsx
// Recommended badge
<span className="inline-flex items-center gap-1.5 px-2.5 py-0.5
                 rounded-full text-xs font-medium
                 bg-green-50 text-green-700 border border-green-200">
  <Check className="h-3 w-3" />
  Recomendada
</span>

// Model badge (different colors per model)
<span className="bg-blue-50 text-blue-700 border border-blue-200">
  GPT-4
</span>
```

### 4. Button Styles

```tsx
// Primary button
<button className="px-6 py-2 bg-black text-white rounded-md
                   hover:bg-gray-800 transition-colors
                   disabled:opacity-50 disabled:cursor-not-allowed">
  Criar Versão
</button>

// Secondary button
<button className="px-4 py-2 border border-gray-300 text-gray-700
                   rounded-md hover:bg-gray-50 transition-colors">
  Cancelar
</button>

// Danger button (icon only)
<button className="p-2 text-gray-400 hover:text-red-600
                   hover:bg-red-50 rounded-md transition-colors">
  <Trash2 className="h-4 w-4" />
</button>
```

### 5. Form Inputs

```tsx
// Text input
<input
  className="w-full px-4 py-2.5 border border-gray-300 rounded-md
             bg-white transition-colors
             focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600
             placeholder:text-gray-400"
/>

// Textarea (mono font for code)
<textarea
  className="w-full px-4 py-3 border border-gray-300 rounded-md
             resize-none font-mono text-sm bg-white
             focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
  rows={12}
/>

// Select
<div className="relative">
  <select className="w-full px-4 py-2.5 border border-gray-300 rounded-md
                     appearance-none bg-white cursor-pointer">
    <option>Option 1</option>
  </select>
  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
    <svg className="w-5 h-5 text-gray-400">
      {/* Chevron down icon */}
    </svg>
  </div>
</div>
```

---

## Data Transformation Helpers

### 1. Group Versions by Model

```typescript
function groupVersionsByModel(versions: PromptVersion[]) {
  return versions.reduce((acc, version) => {
    const model = version.modelTag || 'UNIVERSAL'
    if (!acc[model]) {
      acc[model] = []
    }
    acc[model].push(version)
    return acc
  }, {} as Record<string, PromptVersion[]>)
}

// Usage
const versionsByModel = groupVersionsByModel(prompt.versions)
const chatGptVersions = versionsByModel['CHATGPT_4'] || []
```

### 2. Get Recommended Version

```typescript
function getRecommendedVersion(
  versions: PromptVersion[],
  modelTag: string
): PromptVersion | null {
  return versions.find(
    v => v.modelTag === modelTag && v.isRecommended
  ) || null
}

// Usage
const recommendedGpt4 = getRecommendedVersion(versions, 'CHATGPT_4')
```

### 3. Format Date

```typescript
function formatVersionDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

// Usage
formatVersionDate('2024-01-30T10:30:00Z') // "30 jan 2024, 10:30"
```

### 4. Sort Versions

```typescript
function sortVersions(versions: PromptVersion[]): PromptVersion[] {
  return [...versions].sort((a, b) => {
    // Recommended first
    if (a.isRecommended && !b.isRecommended) return -1
    if (!a.isRecommended && b.isRecommended) return 1

    // Then by creation date (newest first)
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })
}
```

---

## Validation Examples

### 1. Client-side Form Validation

```typescript
function validateVersionForm(formData: {
  modelTag: string
  content: string
  notes: string
}): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!formData.modelTag) {
    errors.push('Selecione um modelo de IA')
  }

  if (formData.content.length < 10) {
    errors.push('Conteúdo deve ter no mínimo 10 caracteres')
  }

  return {
    valid: errors.length === 0,
    errors
  }
}
```

### 2. Server-side Validation (Zod)

```typescript
import { z } from 'zod'

const versionCreateSchema = z.object({
  modelTag: z.enum([
    'UNIVERSAL',
    'CHATGPT_4',
    'CHATGPT_35',
    'CLAUDE_OPUS',
    'CLAUDE_SONNET',
    'GEMINI_2_FLASH',
    'GEMINI_15_PRO'
  ]),
  version: z.string().optional(),
  content: z.string().min(10, 'Conteúdo muito curto'),
  notes: z.string().optional(),
  isRecommended: z.boolean().optional(),
})

// Usage in API
try {
  const validated = versionCreateSchema.parse(body)
  // ... proceed with validated data
} catch (error) {
  if (error instanceof z.ZodError) {
    return NextResponse.json(
      { error: 'Validation failed', issues: error.issues },
      { status: 400 }
    )
  }
}
```

---

## Error Handling Patterns

### 1. Try-Catch with User Feedback

```typescript
const handleSubmit = async () => {
  setError(null)
  setLoading(true)

  try {
    const response = await fetch('/api/...')
    const data = await response.json()

    if (response.ok) {
      onSuccess(data)
    } else {
      setError(data.error || 'Erro desconhecido')
    }
  } catch (err) {
    console.error('Network error:', err)
    setError('Erro de conexão. Tente novamente.')
  } finally {
    setLoading(false)
  }
}
```

### 2. Error Display Component

```tsx
{error && (
  <div className="flex items-start gap-3 p-4
                  bg-red-50 border border-red-200 rounded-md">
    <svg className="w-5 h-5 text-red-600 flex-shrink-0">
      {/* Error icon */}
    </svg>
    <p className="text-sm font-medium text-red-800">{error}</p>
  </div>
)}
```

---

## Performance Optimization

### 1. Memoize Grouped Versions

```typescript
import { useMemo } from 'react'

const versionsByModel = useMemo(() => {
  return versions.reduce((acc, version) => {
    const model = version.modelTag || 'UNIVERSAL'
    if (!acc[model]) acc[model] = []
    acc[model].push(version)
    return acc
  }, {} as Record<string, PromptVersion[]>)
}, [versions])
```

### 2. Debounced Search

```typescript
import { useState, useCallback } from 'react'
import { debounce } from 'lodash'

const [searchTerm, setSearchTerm] = useState('')

const debouncedSearch = useCallback(
  debounce((term: string) => {
    // Perform search
    filterVersions(term)
  }, 300),
  []
)

<input
  onChange={(e) => {
    setSearchTerm(e.target.value)
    debouncedSearch(e.target.value)
  }}
/>
```

---

## Testing Examples

### 1. Component Test (Jest + React Testing Library)

```typescript
import { render, screen, fireEvent } from '@testing-library/react'
import { VersionManager } from './VersionManager'

describe('VersionManager', () => {
  const mockVersions = [
    {
      id: '1',
      version: 'v1',
      modelTag: 'CHATGPT_4',
      content: 'Test content',
      isRecommended: true,
      createdAt: '2024-01-30T10:00:00Z'
    }
  ]

  it('renders version cards', () => {
    render(
      <VersionManager
        promptId="test-id"
        versions={mockVersions}
        onVersionCreated={jest.fn()}
      />
    )

    expect(screen.getByText('v1')).toBeInTheDocument()
    expect(screen.getByText('Recomendada')).toBeInTheDocument()
  })

  it('expands version content on click', () => {
    render(<VersionManager {...props} />)

    const expandButton = screen.getByText('Ver conteúdo')
    fireEvent.click(expandButton)

    expect(screen.getByText('Test content')).toBeVisible()
  })
})
```

### 2. API Test (Jest)

```typescript
import { POST } from './route'

describe('POST /api/admin/prompts/[id]/versions', () => {
  it('creates new version', async () => {
    const request = new Request('http://localhost/api/...', {
      method: 'POST',
      body: JSON.stringify({
        modelTag: 'CHATGPT_4',
        content: 'Test prompt',
        isRecommended: true
      })
    })

    const response = await POST(request, {
      params: Promise.resolve({ id: 'test-id' })
    })

    const data = await response.json()

    expect(response.status).toBe(201)
    expect(data.success).toBe(true)
    expect(data.data.version).toBe('v1')
  })

  it('rejects short content', async () => {
    const request = new Request('http://localhost/api/...', {
      method: 'POST',
      body: JSON.stringify({
        modelTag: 'CHATGPT_4',
        content: 'Short' // Less than 10 chars
      })
    })

    const response = await POST(request, {
      params: Promise.resolve({ id: 'test-id' })
    })

    expect(response.status).toBe(400)
  })
})
```

---

## Accessibility Examples

### 1. Keyboard Navigation

```tsx
<button
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }}
  tabIndex={0}
>
  Click me
</button>
```

### 2. ARIA Labels

```tsx
<button
  aria-label="Delete version v1"
  aria-describedby="delete-warning"
>
  <Trash2 />
</button>

<p id="delete-warning" className="sr-only">
  This action cannot be undone
</p>
```

### 3. Focus Management

```tsx
const modalRef = useRef<HTMLDivElement>(null)

useEffect(() => {
  if (showModal) {
    // Focus first input when modal opens
    const firstInput = modalRef.current?.querySelector('input')
    firstInput?.focus()
  }
}, [showModal])
```

---

## Environment Variables (if needed)

```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3000
DATABASE_URL=postgresql://...
```

---

## Quick Copy-Paste Checklist

```markdown
## Implementation Checklist

### Components
- [x] Create VersionManager.tsx
- [x] Create VersionCreator.tsx
- [x] Update edit/page.tsx with tabs

### API Routes
- [x] POST /versions (already existed)
- [x] DELETE /versions/[vid] (already existed)
- [x] PATCH /versions/[vid]/recommend (NEW)

### Styling
- [x] Tab navigation
- [x] Version cards
- [x] Modal overlay
- [x] Badges and buttons
- [x] Form inputs

### Features
- [x] Group by model
- [x] Auto-numbering (v1, v2, v3)
- [x] Mark recommended
- [x] Delete protection
- [x] Expand/collapse
- [x] Loading states
- [x] Error handling

### Testing
- [ ] Manual testing
- [ ] Unit tests
- [ ] Integration tests
- [ ] E2E tests
```

---

**Version:** 1.0
**Last Updated:** 2026-01-30
