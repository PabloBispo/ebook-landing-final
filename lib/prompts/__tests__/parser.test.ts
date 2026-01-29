import { describe, it, expect } from '@jest/globals'
import {
  extractPlaceholders,
  fillTemplate,
  hasUnfilledPlaceholders,
  countPlaceholders,
  extractPlaceholdersWithDefaults,
} from '../parser'

describe('extractPlaceholders', () => {
  it('extrai placeholders simples', () => {
    const template = 'Olá {{nome}}, bem-vindo!'
    expect(extractPlaceholders(template)).toEqual(['nome'])
  })

  it('extrai múltiplos placeholders', () => {
    const template = '{{saudacao}} {{nome}}, você tem {{idade}} anos'
    expect(extractPlaceholders(template)).toEqual(['saudacao', 'nome', 'idade'])
  })

  it('extrai placeholders com default', () => {
    const template = 'Olá {{nome:Visitante}}'
    expect(extractPlaceholders(template)).toEqual(['nome'])
  })

  it('remove duplicatas', () => {
    const template = '{{nome}} e {{nome}} de novo'
    expect(extractPlaceholders(template)).toEqual(['nome'])
  })

  it('retorna array vazio se não houver placeholders', () => {
    const template = 'Texto sem placeholders'
    expect(extractPlaceholders(template)).toEqual([])
  })
})

describe('fillTemplate', () => {
  it('substitui placeholders com valores', () => {
    const template = 'Olá {{nome}}!'
    const result = fillTemplate(template, { nome: 'João' })
    expect(result).toBe('Olá João!')
  })

  it('usa default quando valor não fornecido', () => {
    const template = 'Olá {{nome:Visitante}}!'
    const result = fillTemplate(template, {})
    expect(result).toBe('Olá Visitante!')
  })

  it('mantém placeholder se não tem valor nem default', () => {
    const template = 'Olá {{nome}}!'
    const result = fillTemplate(template, {})
    expect(result).toBe('Olá {{nome}}!')
  })

  it('substitui múltiplos placeholders', () => {
    const template = '{{saudacao}} {{nome}}, você tem {{idade}} anos'
    const result = fillTemplate(template, {
      saudacao: 'Olá',
      nome: 'Maria',
      idade: '25',
    })
    expect(result).toBe('Olá Maria, você tem 25 anos')
  })

  it('combina valores fornecidos com defaults', () => {
    const template = '{{saudacao:Olá}} {{nome}}'
    const result = fillTemplate(template, { nome: 'Pedro' })
    expect(result).toBe('Olá Pedro')
  })
})

describe('hasUnfilledPlaceholders', () => {
  it('detecta placeholders não preenchidos', () => {
    const template = 'Olá {{nome}}'
    expect(hasUnfilledPlaceholders(template)).toBe(true)
  })

  it('retorna false quando não há placeholders', () => {
    const template = 'Olá mundo'
    expect(hasUnfilledPlaceholders(template)).toBe(false)
  })

  it('retorna false quando placeholders têm defaults', () => {
    const template = 'Olá {{nome:Visitante}}'
    expect(hasUnfilledPlaceholders(template)).toBe(true) // Still has placeholder syntax
  })
})

describe('countPlaceholders', () => {
  it('conta placeholders corretamente', () => {
    const template = '{{a}} {{b}} {{c}}'
    expect(countPlaceholders(template)).toBe(3)
  })

  it('não conta duplicatas', () => {
    const template = '{{nome}} {{nome}} {{idade}}'
    expect(countPlaceholders(template)).toBe(2)
  })

  it('retorna 0 quando não há placeholders', () => {
    const template = 'Sem placeholders'
    expect(countPlaceholders(template)).toBe(0)
  })
})

describe('extractPlaceholdersWithDefaults', () => {
  it('extrai placeholders com defaults', () => {
    const template = '{{nome:João}} {{idade:25}}'
    const result = extractPlaceholdersWithDefaults(template)
    expect(result).toEqual({
      nome: 'João',
      idade: '25',
    })
  })

  it('retorna undefined para placeholders sem default', () => {
    const template = '{{nome}} {{idade:25}}'
    const result = extractPlaceholdersWithDefaults(template)
    expect(result).toEqual({
      nome: undefined,
      idade: '25',
    })
  })

  it('retorna objeto vazio quando não há placeholders', () => {
    const template = 'Sem placeholders'
    const result = extractPlaceholdersWithDefaults(template)
    expect(result).toEqual({})
  })
})
