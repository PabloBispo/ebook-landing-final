import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"
import { compare } from "bcryptjs"
import type { NextAuthConfig } from "next-auth"
import { UserRole } from "@prisma/client"

const authConfig = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "user@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Query account_credentials table directly
        const result = await prisma.$queryRaw<Array<{
          id: string
          email: string
          name: string
          password_hash: string
          role: string
          is_active: boolean
        }>>`
          SELECT id, email, name, password_hash, role, is_active
          FROM account_credentials
          WHERE email = ${credentials.email as string}
          LIMIT 1
        `

        const user = result[0]

        if (!user || !user.is_active) {
          return null
        }

        const isPasswordValid = await compare(credentials.password as string, user.password_hash)

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role as UserRole,
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },
    async session({ session, token }: any) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    }
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: "jwt" as const,
  },
  secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET,
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)
