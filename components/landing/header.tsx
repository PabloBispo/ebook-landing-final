'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { ThemeSwitcher } from '@/components/theme-switcher'
import { useApp } from '@/contexts'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { isMobileMenuOpen, setMobileMenuOpen } = useApp()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '#problema', label: 'O Problema' },
    { href: '#perfis', label: 'Perfis' },
    { href: '#modulos', label: 'Módulos' },
    { href: '#casos', label: 'Casos' },
    { href: '#faq', label: 'FAQ' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass border-b border-border shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-white font-bold text-sm">b.ia</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-lg">@bispo.ia</span>
              <p className="text-xs text-muted-foreground">O Engenheiro que Traduz</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors hover:-translate-y-0.5 transform duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <ThemeSwitcher />

            <Link
              href="#checkout"
              className="hidden sm:inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold hover-lift transition-all duration-300 text-sm"
            >
              Quero Começar
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 animate-fade-in">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-lg hover:bg-secondary transition-colors font-medium"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="#checkout"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 px-4 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-center hover-lift"
              >
                Quero Começar
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
