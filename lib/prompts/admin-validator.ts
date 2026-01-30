import { z } from 'zod'
import { PromptStatus } from '@prisma/client'

export const promptCreateSchema = z.object({
  slug: z.string().min(3).max(100).regex(/^[a-z0-9-]+$/),
  alias: z.string().min(2).max(20).regex(/^[A-Z0-9-]+$/),
  title: z.string().min(3).max(200),
  description: z.string().min(10).max(1000),
  content: z.string().min(10),
  categoryId: z.string().uuid(),
  status: z.nativeEnum(PromptStatus).optional(),
  sourceChapter: z.string().optional(),
  placeholders: z.array(z.any()).optional(),
  modelTag: z.string().optional(),
  tagIds: z.array(z.string().uuid()).optional(),
})

export const promptUpdateSchema = z.object({
  title: z.string().min(3).max(200).optional(),
  description: z.string().min(10).max(1000).optional(),
  categoryId: z.string().uuid().optional(),
  status: z.nativeEnum(PromptStatus).optional(),
  placeholders: z.array(z.any()).optional(),
  tagIds: z.array(z.string().uuid()).optional(),
})
