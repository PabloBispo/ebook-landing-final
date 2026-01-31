# Task #44: Technical Implementation Guide

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Edit Prompt Page                          │
│              /prompts/manage/[slug]/edit                     │
│                                                               │
│  ┌─────────────────────┐  ┌───────────────────────────┐    │
│  │   Tab: Detalhes     │  │    Tab: Versões          │    │
│  │                     │  │                           │    │
│  │  ┌───────────────┐  │  │  ┌────────────────────┐  │    │
│  │  │  PromptForm   │  │  │  │  VersionManager    │  │    │
│  │  │  (existing)   │  │  │  │  (NEW)             │  │    │
│  │  └───────────────┘  │  │  │                    │  │    │
│  │                     │  │  │  • Model Tabs      │  │    │
│  └─────────────────────┘  │  │  • Version List    │  │    │
│                           │  │  • Actions         │  │    │
│                           │  │                    │  │    │
│                           │  │  ┌──────────────┐  │  │    │
│                           │  │  │VersionCreator│  │  │    │
│                           │  │  │   (Modal)    │  │  │    │
│                           │  │  └──────────────┘  │  │    │
│                           │  └────────────────────┘  │    │
│                           └───────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

## Component Hierarchy

```
EditPromptPage (page.tsx)
│
├─── PromptForm (existing)
│    └─── Form fields for prompt metadata
│
└─── VersionManager (NEW)
     │
     ├─── Model Tabs
     │    └─── Tab buttons for each AI model
     │
     ├─── Version List
     │    └─── Version Cards (expandable)
     │         ├─── Header (version, badge, date, actions)
     │         └─── Content (expandable text area)
     │
     └─── VersionCreator Modal
          └─── Form (model, content, notes, isRecommended)
```

## API Flow Diagram

```
┌──────────────────────┐
│  VersionManager      │
│  Component           │
└──────────┬───────────┘
           │
           ├─── GET /api/prompts/[slug]
           │    └─── Fetch prompt with all versions
           │
           ├─── POST /api/admin/prompts/[id]/versions
           │    └─── Create new version
           │
           ├─── DELETE /api/admin/prompts/[id]/versions/[vid]
           │    └─── Delete version (if not last)
           │
           └─── PATCH /api/admin/prompts/[id]/versions/[vid]/recommend
                └─── Mark version as recommended
```

## Data Flow

### 1. Page Load
```typescript
// edit/page.tsx
useEffect(() => {
  fetchPrompt() // GET /api/prompts/[slug]
}, [params.slug])

// Response includes:
{
  id: string
  slug: string
  title: string
  versions: PromptVersion[] // All versions for all models
  category: Category
  tags: Tag[]
  // ...
}
```

### 2. Create Version
```typescript
// VersionCreator.tsx
const handleSubmit = async () => {
  const response = await fetch(
    `/api/admin/prompts/${promptId}/versions`,
    {
      method: 'POST',
      body: JSON.stringify({
        modelTag: 'CHATGPT_4',
        content: '...',
        notes: '...',
        isRecommended: false
      })
    }
  )

  onCreated() // Refresh list
}
```

### 3. Mark Recommended
```typescript
// VersionManager.tsx
const handleMarkRecommended = async (versionId, modelTag) => {
  await fetch(
    `/api/admin/prompts/${promptId}/versions/${versionId}/recommend`,
    {
      method: 'PATCH',
      body: JSON.stringify({ modelTag })
    }
  )

  // Server automatically unmarks other versions for this model
  onVersionCreated() // Refresh list
}
```

### 4. Delete Version
```typescript
// VersionManager.tsx
const handleDeleteVersion = async (versionId) => {
  if (!confirm('Sure?')) return

  await fetch(
    `/api/admin/prompts/${promptId}/versions/${versionId}`,
    { method: 'DELETE' }
  )

  onVersionCreated() // Refresh list
}
```

## State Management

### VersionManager State
```typescript
const [selectedModel, setSelectedModel] = useState<string>('UNIVERSAL')
const [showCreator, setShowCreator] = useState(false)
const [expandedVersion, setExpandedVersion] = useState<string | null>(null)
const [deletingVersion, setDeletingVersion] = useState<string | null>(null)
```

### VersionCreator State
```typescript
const [formData, setFormData] = useState({
  modelTag: defaultModel,
  content: '',
  notes: '',
  isRecommended: false,
})
const [loading, setLoading] = useState(false)
const [error, setError] = useState<string | null>(null)
```

### Edit Page State
```typescript
const [prompt, setPrompt] = useState(null)
const [loading, setLoading] = useState(false)
const [activeTab, setActiveTab] = useState<'details' | 'versions'>('details')
```

## Database Schema

```prisma
model PromptVersion {
  id            String   @id @default(cuid())
  promptId      String
  prompt        Prompt   @relation(fields: [promptId], references: [id])

  version       String?  // "v1", "v2", "v3", etc
  modelTag      String   // "UNIVERSAL", "CHATGPT_4", etc
  content       String   @db.Text
  isRecommended Boolean  @default(false)
  notes         String?  @db.Text

  createdAt     DateTime @default(now())

  @@unique([promptId, modelTag, version])
  @@index([promptId])
}
```

## Styling Patterns

### Tabs
```tsx
<button
  className={`pb-3 text-sm font-medium border-b-2 ${
    isActive
      ? 'border-black text-black'
      : 'border-transparent text-gray-600 hover:text-gray-900'
  }`}
>
```

### Version Card
```tsx
<div className="border border-gray-200 rounded-md overflow-hidden
                bg-white hover:border-gray-300 transition-colors">
  <div className="p-4 flex items-start justify-between">
    {/* Header */}
  </div>
  {isExpanded && (
    <div className="border-t border-gray-200 bg-gray-50 p-4">
      {/* Content */}
    </div>
  )}
</div>
```

### Modal Overlay
```tsx
<div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm
                flex items-center justify-center z-50">
  <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full
                  max-h-[90vh] overflow-hidden flex flex-col">
    {/* Modal content */}
  </div>
</div>
```

### Badge
```tsx
<span className="inline-flex items-center gap-1.5 px-2.5 py-0.5
                 rounded-full text-xs font-medium
                 bg-green-50 text-green-700 border border-green-200">
  <Check className="h-3 w-3" />
  Recomendada
</span>
```

## Key Features Implementation

### 1. Auto-numbering Versions
```typescript
// API: /api/admin/prompts/[id]/versions/route.ts
const existingVersions = prompt.versions.filter(
  v => v.modelTag === validated.modelTag
)
const versionNumber = validated.version ||
  `v${existingVersions.length + 1}`
```

### 2. Grouping by Model
```typescript
// VersionManager.tsx
const versionsByModel = versions.reduce((acc, version) => {
  const model = version.modelTag || 'UNIVERSAL'
  if (!acc[model]) acc[model] = []
  acc[model].push(version)
  return acc
}, {} as Record<string, PromptVersion[]>)
```

### 3. Recommended Toggle
```typescript
// API: /api/admin/prompts/[id]/versions/[vid]/recommend/route.ts
if (validated.isRecommended) {
  // Unmark others first
  await prisma.promptVersion.updateMany({
    where: {
      promptId: id,
      modelTag: validated.modelTag,
      id: { not: vid }
    },
    data: { isRecommended: false }
  })
}
```

### 4. Expandable Content
```typescript
// VersionManager.tsx
const [expandedVersion, setExpandedVersion] =
  useState<string | null>(null)

const isExpanded = expandedVersion === version.id

<button onClick={() =>
  setExpandedVersion(isExpanded ? null : version.id)
}>
  {isExpanded ? 'Ocultar' : 'Ver conteúdo'}
</button>
```

### 5. Delete Protection
```typescript
// API: /api/admin/prompts/[id]/versions/[vid]/route.ts
const versionCount = await prisma.promptVersion.count({
  where: { promptId: id }
})

if (versionCount <= 1) {
  return NextResponse.json(
    { error: 'Cannot delete last version' },
    { status: 400 }
  )
}
```

## Model Labels Configuration

```typescript
const MODEL_LABELS: Record<string, { name: string; color: string }> = {
  UNIVERSAL: {
    name: 'Universal',
    color: 'bg-purple-50 text-purple-700 border-purple-200'
  },
  CHATGPT_4: {
    name: 'GPT-4',
    color: 'bg-green-50 text-green-700 border-green-200'
  },
  CHATGPT_35: {
    name: 'GPT-3.5',
    color: 'bg-blue-50 text-blue-700 border-blue-200'
  },
  CLAUDE_OPUS: {
    name: 'Claude Opus',
    color: 'bg-orange-50 text-orange-700 border-orange-200'
  },
  CLAUDE_SONNET: {
    name: 'Claude Sonnet',
    color: 'bg-amber-50 text-amber-700 border-amber-200'
  },
  GEMINI_2_FLASH: {
    name: 'Gemini 2.0 Flash',
    color: 'bg-cyan-50 text-cyan-700 border-cyan-200'
  },
  GEMINI_15_PRO: {
    name: 'Gemini 1.5 Pro',
    color: 'bg-teal-50 text-teal-700 border-teal-200'
  },
}
```

## Error Handling

### Client-side
```typescript
// VersionCreator.tsx
try {
  const response = await fetch(...)
  const data = await response.json()

  if (response.ok) {
    onCreated()
  } else {
    setError(data.error || 'Erro ao criar versão')
  }
} catch (err) {
  setError('Erro ao criar versão. Tente novamente.')
} finally {
  setLoading(false)
}
```

### Server-side
```typescript
// API routes
try {
  await requireStaffAuth()
  const validated = schema.parse(body)
  // ... operation
  return NextResponse.json({ success: true, data })
} catch (error) {
  if (error instanceof z.ZodError) {
    return NextResponse.json(
      { success: false, error: 'Validation failed' },
      { status: 400 }
    )
  }
  // ... other error types
}
```

## Testing Checklist

### Component Tests
- [ ] VersionManager renders with empty versions
- [ ] VersionManager groups versions by model
- [ ] VersionCreator validates required fields
- [ ] Modal opens/closes correctly
- [ ] Tab navigation works
- [ ] Expand/collapse works
- [ ] Delete confirmation works

### API Tests
- [ ] POST creates version with auto-number
- [ ] PATCH marks recommended and unmarks others
- [ ] DELETE blocks when only one version
- [ ] DELETE succeeds with multiple versions
- [ ] All endpoints require auth
- [ ] Validation schemas work correctly

### Integration Tests
- [ ] Create version refreshes list
- [ ] Delete version refreshes list
- [ ] Mark recommended updates UI
- [ ] Error messages display correctly
- [ ] Loading states work

## Performance Considerations

1. **Data Fetching:** Single fetch includes all versions
2. **State Updates:** Minimal re-renders with targeted state
3. **Lazy Loading:** Content only rendered when expanded
4. **Optimistic Updates:** Could be added for better UX
5. **Caching:** Consider SWR or React Query for better caching

## Security Checklist

- [x] All write operations require Staff auth
- [x] Version ownership verified before operations
- [x] Input validation on client and server
- [x] SQL injection prevented (Prisma)
- [x] XSS prevented (React escaping)
- [x] CSRF protection (Next.js built-in)

## File Sizes

- VersionManager.tsx: ~9.6 KB
- VersionCreator.tsx: ~8.9 KB
- recommend/route.ts: ~2.1 KB
- Total: ~20.6 KB

## Browser Compatibility

- Chrome/Edge: ✅
- Firefox: ✅
- Safari: ✅
- Mobile: ✅ (responsive design)

## Accessibility

- Keyboard navigation: ✅
- Screen reader labels: ⚠️ (could be improved)
- Focus indicators: ✅
- Color contrast: ✅
- ARIA attributes: ⚠️ (could be improved)

## Future Enhancements

1. **Version Comparison**
   - Side-by-side diff view
   - Highlight changes

2. **Version History**
   - Timeline view
   - Restore previous versions

3. **Batch Operations**
   - Duplicate version to other models
   - Bulk delete

4. **Export/Import**
   - JSON export
   - CSV export
   - Import from file

5. **Analytics**
   - Track version usage
   - Performance metrics
   - A/B testing

6. **Collaboration**
   - Comments on versions
   - Change approval workflow
   - Version locking

---

## Quick Reference

### Create Version
```bash
POST /api/admin/prompts/{id}/versions
{
  "modelTag": "CHATGPT_4",
  "content": "prompt content",
  "notes": "optional notes",
  "isRecommended": false
}
```

### Mark Recommended
```bash
PATCH /api/admin/prompts/{id}/versions/{vid}/recommend
{
  "modelTag": "CHATGPT_4"
}
```

### Delete Version
```bash
DELETE /api/admin/prompts/{id}/versions/{vid}
```

### Get Prompt (includes versions)
```bash
GET /api/prompts/{slug}
```

---

**Documentation Version:** 1.0
**Last Updated:** 2026-01-30
