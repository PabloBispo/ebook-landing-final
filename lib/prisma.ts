import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Lazy initialization to avoid connection during build
function getPrismaClient() {
  if (!globalForPrisma.prisma) {
    // Only initialize if DATABASE_URL is available
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL is not configured')
    }

    globalForPrisma.prisma = new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    })
  }
  return globalForPrisma.prisma
}

// Export as getter to avoid initialization at import time
export const prisma = new Proxy({} as PrismaClient, {
  get: (_target, prop) => {
    const client = getPrismaClient()
    return (client as any)[prop]
  }
})
