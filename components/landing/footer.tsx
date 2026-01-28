import Link from 'next/link'
import { Sparkles } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const links = {
    product: [
      { label: 'Benefícios', href: '#beneficios' },
      { label: 'Módulos', href: '#modulos' },
      { label: 'Depoimentos', href: '#depoimentos' },
      { label: 'FAQ', href: '#faq' },
    ],
    legal: [
      { label: 'Termos de Uso', href: '/termos' },
      { label: 'Política de Privacidade', href: '/privacidade' },
      { label: 'Política de Reembolso', href: '#faq' },
    ],
  }

  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="font-bold text-lg">Ebooks com IA</span>
                <p className="text-xs text-muted-foreground">Masterclass</p>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground max-w-md mb-4">
              Aprenda a criar ebooks profissionais usando Inteligência Artificial em apenas 3-5 dias.
              Método validado com mais de 500 alunos.
            </p>
            <p className="text-xs text-muted-foreground">
              📧 Suporte: <a href="mailto:pablofernando@live.com" className="hover:text-foreground transition-colors">pablofernando@live.com</a>
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold mb-4">Produto</h3>
            <ul className="space-y-2">
              {links.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {links.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© {currentYear} Ebooks com IA. Todos os direitos reservados.</p>
            <div className="flex items-center gap-4">
              <span>Desenvolvido por Pablo Bispo</span>
              <span>•</span>
              <a
                href="https://claude.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                Powered by Claude Code
              </a>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-6 p-4 rounded-lg bg-muted/50 text-xs text-muted-foreground">
            <p className="mb-2">
              <strong>Aviso Legal:</strong> Este produto é comercializado com apoio da Hotmart.
              A plataforma não faz controle editorial prévio dos produtos comercializados, nem avalia
              a tecnicidade e experiência daqueles que os produzem. A existência de um produto e sua
              aquisição, através da plataforma, não podem ser consideradas como garantia de qualidade
              de conteúdo e resultado, em qualquer hipótese.
            </p>
            <p>
              Ao adquiri-lo, o comprador declara estar ciente dessas informações. Os termos e políticas
              da Hotmart podem ser acessados a qualquer momento no site da plataforma.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
