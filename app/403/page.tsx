'use client'

import Link from 'next/link'
import { ShieldAlert } from 'lucide-react'
import { signOut } from 'next-auth/react'

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
            <ShieldAlert className="h-8 w-8 text-red-600" />
          </div>
        </div>

        <h1 className="text-4xl font-semibold text-gray-900 mb-3">
          Acesso Negado
        </h1>

        <p className="text-lg text-gray-600 mb-8">
          Você não tem permissão para acessar esta área. Apenas usuários com
          perfil de Staff ou Admin podem gerenciar prompts.
        </p>

        <div className="space-y-3">
          <Link
            href="/"
            className="block w-full bg-black text-white py-2.5 rounded-md font-medium hover:bg-gray-800 transition-colors"
          >
            Voltar para a Home
          </Link>

          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="block w-full bg-white text-gray-700 py-2.5 rounded-md font-medium border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            Fazer login com outra conta
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Se você acredita que deveria ter acesso a esta área, entre em
            contato com o administrador do sistema.
          </p>
        </div>
      </div>
    </div>
  )
}
