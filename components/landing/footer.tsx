import Link from 'next/link'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const links = {
    product: [
      { label: 'O Problema', href: '#problema' },
      { label: 'Perfis', href: '#perfis' },
      { label: 'Módulos', href: '#modulos' },
      { label: 'Casos', href: '#casos' },
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
                <span className="text-white font-bold text-sm">b.ia</span>
              </div>
              <div>
                <span className="font-bold text-lg">@bispo.ia</span>
                <p className="text-xs text-muted-foreground">O Engenheiro que Traduz</p>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground max-w-md mb-4 italic">
              "Onde a inteligência artificial encontra a inteligência prática."
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Dúvidas?{' '}
              <a
                href="mailto:pablofernando@live.com"
                className="text-primary hover:underline"
              >
                pablofernando@live.com
              </a>
            </p>
            <p className="text-xs text-muted-foreground">
              Respondemos em até 24h úteis.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold mb-4">Navegação</h3>
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
            <p>© {currentYear} @bispo.ia. Todos os direitos reservados.</p>
            <div className="flex items-center gap-4">
              <span>Criado por Pablo Bispo</span>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-6 p-4 rounded-lg bg-muted/50 text-xs text-muted-foreground">
            <p className="mb-2">
              <strong>Aviso Legal:</strong> Os resultados mencionados nesta página são casos reais
              documentados no curso. Resultados individuais podem variar dependendo de diversos
              fatores como nicho, dedicação, audiência prévia e execução. Não garantimos que você
              terá os mesmos resultados - garantimos que você terá acesso ao mesmo método.
            </p>
            <p>
              Produto digital com acesso imediato após confirmação do pagamento.
              Garantia incondicional de 7 dias conforme Código de Defesa do Consumidor.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
