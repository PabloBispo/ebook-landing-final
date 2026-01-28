'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react'

// Types
export type UserProfile = 'A' | 'B' | 'C' | null

export interface AppState {
  // User's selected profile (Criador Orgânico, Explorador, Prestador)
  selectedProfile: UserProfile

  // Lead capture state
  hasSubmittedLead: boolean
  leadEmail: string | null

  // Checkout state
  selectedProduct: string | null
  checkoutStep: 'idle' | 'form' | 'payment' | 'success' | 'error'

  // UI state
  isMobileMenuOpen: boolean
  activeSection: string | null
}

export interface AppContextType extends AppState {
  // Profile actions
  setSelectedProfile: (profile: UserProfile) => void

  // Lead actions
  setLeadSubmitted: (email: string) => void

  // Checkout actions
  setSelectedProduct: (productId: string | null) => void
  setCheckoutStep: (step: AppState['checkoutStep']) => void

  // UI actions
  setMobileMenuOpen: (open: boolean) => void
  setActiveSection: (section: string | null) => void

  // Reset
  resetApp: () => void
}

// Initial state
const initialState: AppState = {
  selectedProfile: null,
  hasSubmittedLead: false,
  leadEmail: null,
  selectedProduct: null,
  checkoutStep: 'idle',
  isMobileMenuOpen: false,
  activeSection: null,
}

// Context
const AppContext = createContext<AppContextType | undefined>(undefined)

// Provider
interface AppProviderProps {
  children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  const [state, setState] = useState<AppState>(initialState)

  // Profile actions
  const setSelectedProfile = useCallback((profile: UserProfile) => {
    setState(prev => ({ ...prev, selectedProfile: profile }))
  }, [])

  // Lead actions
  const setLeadSubmitted = useCallback((email: string) => {
    setState(prev => ({
      ...prev,
      hasSubmittedLead: true,
      leadEmail: email,
    }))
  }, [])

  // Checkout actions
  const setSelectedProduct = useCallback((productId: string | null) => {
    setState(prev => ({ ...prev, selectedProduct: productId }))
  }, [])

  const setCheckoutStep = useCallback((step: AppState['checkoutStep']) => {
    setState(prev => ({ ...prev, checkoutStep: step }))
  }, [])

  // UI actions
  const setMobileMenuOpen = useCallback((open: boolean) => {
    setState(prev => ({ ...prev, isMobileMenuOpen: open }))
  }, [])

  const setActiveSection = useCallback((section: string | null) => {
    setState(prev => ({ ...prev, activeSection: section }))
  }, [])

  // Reset
  const resetApp = useCallback(() => {
    setState(initialState)
  }, [])

  const value: AppContextType = {
    ...state,
    setSelectedProfile,
    setLeadSubmitted,
    setSelectedProduct,
    setCheckoutStep,
    setMobileMenuOpen,
    setActiveSection,
    resetApp,
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

// Hook
export function useApp() {
  const context = useContext(AppContext)

  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }

  return context
}

// Utility hooks
export function useProfile() {
  const { selectedProfile, setSelectedProfile } = useApp()
  return { selectedProfile, setSelectedProfile }
}

export function useCheckout() {
  const {
    selectedProduct,
    checkoutStep,
    setSelectedProduct,
    setCheckoutStep,
  } = useApp()

  return {
    selectedProduct,
    checkoutStep,
    setSelectedProduct,
    setCheckoutStep,
  }
}
