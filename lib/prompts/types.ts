export type PlaceholderType =
  | 'text'
  | 'textarea'
  | 'select'
  | 'number'
  | 'email'
  | 'url'

export interface Placeholder {
  key: string
  label: string
  type: PlaceholderType
  required: boolean
  defaultValue?: string
  options?: string[]
  description?: string
  maxLength?: number
  placeholder?: string // HTML placeholder
}

export interface PlaceholderValue {
  key: string
  value: string
}

export interface PromptWithPlaceholders {
  template: string
  placeholders: Placeholder[]
}
