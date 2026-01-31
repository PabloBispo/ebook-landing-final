# Task #39: Visual Guide - Middleware e Proteção de Rotas

## Arquitetura do Sistema de Autenticação

```
┌─────────────────────────────────────────────────────────────────┐
│                         User Request                             │
│                   /prompts/manage                                │
└─────────────────────┬───────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                    MIDDLEWARE.TS                                 │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  1. Check if route starts with /prompts/manage             │ │
│  │  2. Call auth() to get session                             │ │
│  │  3. Decision tree:                                         │ │
│  │     - No session? → Redirect to /login                     │ │
│  │     - Session but USER role? → Redirect to /403           │ │
│  │     - Session with STAFF/ADMIN? → Allow access            │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────┬───────────────────┬────────────────┬──────────────┘
              │                   │                │
      No Session           Role = USER      Role = STAFF/ADMIN
              │                   │                │
              ▼                   ▼                ▼
    ┌──────────────┐    ┌──────────────┐  ┌──────────────────┐
    │ /login       │    │ /403         │  │ /prompts/manage  │
    │ page.tsx     │    │ page.tsx     │  │ page.tsx         │
    └──────────────┘    └──────────────┘  └──────────────────┘
```

## Fluxo de Autenticação Detalhado

```
┌──────────────────────────────────────────────────────────────────┐
│                    UNAUTHENTICATED USER FLOW                      │
└──────────────────────────────────────────────────────────────────┘

1. User navigates to: https://example.com/prompts/manage
                                 │
                                 ▼
2. Middleware intercepts ──────────────────┐
   - Checks session                        │
   - Session is null                       │
                                            │
                                 ▼          │
3. Redirect to: /login?callbackUrl=/prompts/manage
                                 │
                                 ▼
4. User sees LOGIN PAGE:
   ┌─────────────────────────────────────┐
   │     Gerenciar Prompts               │
   │  Faça login para acessar o painel   │
   │                                     │
   │  Email:  [___________________]     │
   │  Senha:  [___________________]     │
   │                                     │
   │  [ Entrar ]                         │
   └─────────────────────────────────────┘
                                 │
                User fills form  │
                                 ▼
5. Form submission:
   - signIn('credentials', { email, password })
   - NextAuth validates against database
   - Bcrypt compares passwords
                                 │
                                 ▼
6. Authentication result:
   ┌─────────────────────────────────────┐
   │ Success:                             │
   │  - JWT token created                 │
   │  - Session established               │
   │  - Redirect to callbackUrl           │
   │                                      │
   │ Failure:                             │
   │  - Error message displayed           │
   │  - "Email ou senha inválidos"        │
   └─────────────────────────────────────┘
                                 │
              If successful      │
                                 ▼
7. Redirect to: /prompts/manage
   - Now has valid session
   - Middleware allows access (if STAFF/ADMIN)
```

## Role-Based Access Control (RBAC)

```
┌──────────────────────────────────────────────────────────────────┐
│                    ROLE VALIDATION FLOW                           │
└──────────────────────────────────────────────────────────────────┘

User with SESSION tries to access /prompts/manage
                     │
                     ▼
            Check session.user.role
                     │
        ┌────────────┴────────────┐
        │                         │
        ▼                         ▼
   role = USER             role = STAFF or ADMIN
        │                         │
        │                         │
        ▼                         ▼
┌──────────────┐          ┌──────────────────┐
│   DENIED     │          │    GRANTED       │
│              │          │                  │
│ Redirect to  │          │ Render dashboard │
│    /403      │          │                  │
└──────────────┘          └──────────────────┘
```

## Login Page Layout

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│                    (white background)                    │
│                                                         │
│                                                         │
│              ┌─────────────────────────┐               │
│              │                         │               │
│              │  Gerenciar Prompts      │  ← Title      │
│              │  (3xl, semibold)        │               │
│              │                         │               │
│              │  Faça login para        │  ← Subtitle   │
│              │  acessar o painel       │               │
│              │  (text-gray-600)        │               │
│              │                         │               │
│              │  ───────────────────    │               │
│              │                         │               │
│              │  Email                  │  ← Label      │
│              │  [____________________] │  ← Input      │
│              │                         │               │
│              │  Senha                  │  ← Label      │
│              │  [____________________] │  ← Input      │
│              │                         │               │
│              │  ┌─────────────────┐   │               │
│              │  │  Email ou senha │   │  ← Error      │
│              │  │  inválidos      │   │    (red)      │
│              │  └─────────────────┘   │               │
│              │                         │               │
│              │  ┌─────────────────┐   │               │
│              │  │     Entrar      │   │  ← Button     │
│              │  │  (bg-black)     │   │    (black)    │
│              │  └─────────────────┘   │               │
│              │                         │               │
│              │  Apenas usuários        │  ← Info       │
│              │  autorizados podem      │               │
│              │  acessar esta área.     │               │
│              │                         │               │
│              └─────────────────────────┘               │
│                   (max-w-md)                           │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## 403 Forbidden Page Layout

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│                    (white background)                    │
│                                                         │
│                                                         │
│              ┌─────────────────────────┐               │
│              │                         │               │
│              │         ┌───┐           │               │
│              │         │ ! │           │  ← Icon       │
│              │         └───┘           │    (red)      │
│              │      (ShieldAlert)      │               │
│              │                         │               │
│              │   Acesso Negado         │  ← Title      │
│              │   (4xl, semibold)       │               │
│              │                         │               │
│              │   Você não tem          │  ← Message    │
│              │   permissão para        │               │
│              │   acessar esta área.    │               │
│              │   Apenas usuários com   │               │
│              │   perfil de Staff ou    │               │
│              │   Admin podem           │               │
│              │   gerenciar prompts.    │               │
│              │                         │               │
│              │  ┌─────────────────┐   │               │
│              │  │ Voltar para     │   │  ← Primary    │
│              │  │ a Home          │   │    Button     │
│              │  │  (bg-black)     │   │               │
│              │  └─────────────────┘   │               │
│              │                         │               │
│              │  ┌─────────────────┐   │               │
│              │  │ Fazer login com │   │  ← Secondary  │
│              │  │ outra conta     │   │    Button     │
│              │  │  (border-gray)  │   │               │
│              │  └─────────────────┘   │               │
│              │                         │               │
│              │  ───────────────────    │               │
│              │                         │               │
│              │  Se você acredita que   │  ← Footer     │
│              │  deveria ter acesso...  │    Info       │
│              │                         │               │
│              └─────────────────────────┘               │
│                   (max-w-md)                           │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## Middleware Configuration

```typescript
// middleware.ts structure

┌─────────────────────────────────────────────────────┐
│ import { NextResponse } from 'next/server'          │
│ import type { NextRequest } from 'next/server'      │
│ import { auth } from '@/lib/auth/auth-options'      │
├─────────────────────────────────────────────────────┤
│                                                     │
│ export async function middleware(request) {         │
│   const { pathname } = request.nextUrl              │
│                                                     │
│   // ┌─────────────────────────────────┐          │
│   // │ Protected Routes Check           │          │
│   // └─────────────────────────────────┘          │
│   if (pathname.startsWith('/prompts/manage')) {    │
│     const session = await auth()                   │
│                                                     │
│     // ┌─────────────────────────────────┐        │
│     // │ No session? → Login              │        │
│     // └─────────────────────────────────┘        │
│     if (!session?.user) {                          │
│       return NextResponse.redirect('/login')       │
│     }                                               │
│                                                     │
│     // ┌─────────────────────────────────┐        │
│     // │ USER role? → Forbidden           │        │
│     // └─────────────────────────────────┘        │
│     if (session.user.role === 'USER') {            │
│       return NextResponse.redirect('/403')         │
│     }                                               │
│   }                                                 │
│                                                     │
│   // ┌─────────────────────────────────┐          │
│   // │ Add Security Headers             │          │
│   // └─────────────────────────────────┘          │
│   const response = NextResponse.next()             │
│   response.headers.set('X-Frame-Options', ...)     │
│   return response                                  │
│ }                                                   │
│                                                     │
│ export const config = {                            │
│   matcher: ['/((?!_next/static|...).*)',]          │
│ }                                                   │
└─────────────────────────────────────────────────────┘
```

## Session Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    SESSION MANAGEMENT                            │
└─────────────────────────────────────────────────────────────────┘

Browser                 Middleware              NextAuth           Database
   │                        │                       │                  │
   │  GET /prompts/manage   │                       │                  │
   ├───────────────────────>│                       │                  │
   │                        │  auth()               │                  │
   │                        ├──────────────────────>│                  │
   │                        │                       │  Verify JWT      │
   │                        │                       │  Token           │
   │                        │                       ├─────────────────>│
   │                        │                       │  (no DB query)   │
   │                        │  Session + Role       │                  │
   │                        │<──────────────────────┤                  │
   │                        │                       │                  │
   │                        │  Check Role           │                  │
   │                        │  STAFF/ADMIN?         │                  │
   │                        │                       │                  │
   │  Render Page           │                       │                  │
   │<───────────────────────┤                       │                  │
   │                        │                       │                  │

─────────────────────── LOGIN FLOW ────────────────────────────────

Browser                 NextAuth              Database            Bcrypt
   │                        │                      │                  │
   │  signIn(credentials)   │                      │                  │
   ├───────────────────────>│                      │                  │
   │                        │  Query user by email │                  │
   │                        ├─────────────────────>│                  │
   │                        │  User + hashed pwd   │                  │
   │                        │<─────────────────────┤                  │
   │                        │                      │                  │
   │                        │  compare(password, hash)                │
   │                        ├─────────────────────────────────────────>│
   │                        │  isValid: true/false │                  │
   │                        │<─────────────────────────────────────────┤
   │                        │                      │                  │
   │                        │  Create JWT token    │                  │
   │                        │  (include role)      │                  │
   │  Set-Cookie: jwt       │                      │                  │
   │<───────────────────────┤                      │                  │
   │                        │                      │                  │
```

## Component Hierarchy

```
app/
├── layout.tsx
│   └── <Providers>
│       └── <SessionProvider>          ← NextAuth provider
│           └── <ThemeProvider>
│               └── <AuthProvider>
│                   └── <AppProvider>
│                       └── {children}
│
├── login/
│   └── page.tsx                       ← Login form
│       ├── Email input
│       ├── Password input
│       ├── Error display
│       ├── Submit button
│       └── signIn() hook
│
├── 403/
│   └── page.tsx                       ← Forbidden page
│       ├── Icon (ShieldAlert)
│       ├── Title
│       ├── Message
│       ├── Home button
│       └── Logout button
│
└── prompts/
    └── manage/
        ├── page.tsx                   ← Protected dashboard
        ├── new/
        │   └── page.tsx               ← Protected: create
        └── [slug]/
            └── edit/
                └── page.tsx           ← Protected: edit

middleware.ts                          ← Route protection
```

## Color Palette

```
┌─────────────────────────────────────────────────────────┐
│                    COLOR SYSTEM                          │
└─────────────────────────────────────────────────────────┘

Background Colors:
  bg-white              #FFFFFF   Main background
  bg-gray-50            #F9FAFB   Subtle background
  bg-red-50             #FEF2F2   Error background
  bg-black              #000000   Primary button

Text Colors:
  text-gray-900         #111827   Headings
  text-gray-700         #374151   Body text
  text-gray-600         #4B5563   Secondary text
  text-gray-500         #6B7280   Tertiary text
  text-red-700          #B91C1C   Error text
  text-white            #FFFFFF   Button text

Border Colors:
  border-gray-300       #D1D5DB   Input borders
  border-gray-200       #E5E7EB   Subtle borders
  border-red-200        #FECACA   Error borders

Focus Colors:
  ring-gray-900         #111827   Focus ring
```

## Typography Scale

```
┌─────────────────────────────────────────────────────────┐
│                  TYPOGRAPHY SYSTEM                       │
└─────────────────────────────────────────────────────────┘

Headings:
  text-4xl              36px / 2.25rem    403 Title
  text-3xl              30px / 1.875rem   Login Title
  text-lg               18px / 1.125rem   403 Message

Body:
  text-base             16px / 1rem       Default
  text-sm               14px / 0.875rem   Labels, Info
  text-xs               12px / 0.75rem    Captions

Font Weights:
  font-semibold         600               Titles
  font-medium           500               Buttons, Labels
  font-normal           400               Body text
```

## Spacing System

```
┌─────────────────────────────────────────────────────────┐
│                   SPACING SCALE                          │
└─────────────────────────────────────────────────────────┘

Vertical Spacing:
  space-y-6             1.5rem / 24px     Form fields
  space-y-3             0.75rem / 12px    Button stack
  mb-8                  2rem / 32px       Section margins
  mb-6                  1.5rem / 24px     Element margins
  mb-2                  0.5rem / 8px      Label-input gap

Horizontal Padding:
  px-4                  1rem / 16px       Container
  px-3                  0.75rem / 12px    Inputs
  py-2.5                0.625rem / 10px   Buttons
  py-2                  0.5rem / 8px      Inputs
  py-3                  0.75rem / 12px    Error messages

Max Widths:
  max-w-md              28rem / 448px     Form containers
  max-w-7xl             80rem / 1280px    Dashboard
```

## Browser DevTools - Debugging

```
┌─────────────────────────────────────────────────────────┐
│              DEBUGGING AUTHENTICATION                    │
└─────────────────────────────────────────────────────────┘

1. Check Middleware Execution:
   Network Tab → Look for:
   - 307 redirects (middleware working)
   - Location header (redirect destination)

2. Check Session Cookie:
   Application Tab → Cookies → localhost:3000
   - Look for: next-auth.session-token (or similar)
   - Verify: HttpOnly, Secure flags

3. Check Session Data:
   Console Tab:
   ```javascript
   import { useSession } from 'next-auth/react'
   const { data: session } = useSession()
   console.log(session)
   // Expected: { user: { email, role, ... } }
   ```

4. Check Middleware Logs:
   Terminal running `npm run dev`
   - Look for: Middleware execution logs
   - Check: Session validation messages

5. Check Network Requests:
   Network Tab → Filter: Fetch/XHR
   - POST /api/auth/callback/credentials
   - Response: { url: "..." } or { error: "..." }
```

## Testing Checklist

```
┌─────────────────────────────────────────────────────────┐
│                  TESTING CHECKLIST                       │
└─────────────────────────────────────────────────────────┘

□ Unauthenticated Access
  □ Navigate to /prompts/manage without login
  □ Verify redirect to /login
  □ Check callbackUrl parameter in URL

□ Login Page
  □ Form validation (empty fields)
  □ Email format validation
  □ Password visibility toggle (if implemented)
  □ Loading state during submission
  □ Error message for invalid credentials
  □ Success redirect to callbackUrl

□ USER Role Access
  □ Login with USER role account
  □ Verify redirect to /403
  □ Test "Voltar para Home" button
  □ Test "Fazer login com outra conta" button

□ STAFF/ADMIN Role Access
  □ Login with STAFF role account
  □ Verify access to /prompts/manage
  □ Navigate to /prompts/manage/new
  □ Navigate to /prompts/manage/[slug]/edit
  □ All admin routes accessible

□ Session Persistence
  □ Login and refresh page
  □ Session should persist
  □ Close and reopen browser
  □ Check if session survives

□ Logout
  □ Click logout (if button exists)
  □ Verify redirect to /login
  □ Verify session cleared
  □ Try accessing protected route
  □ Should redirect to /login

□ Security
  □ Check for XSS vulnerabilities
  □ Verify CSRF protection
  □ Check password not visible in Network tab
  □ Verify JWT token is HttpOnly
  □ Check security headers present

□ Responsive Design
  □ Test on mobile (375px)
  □ Test on tablet (768px)
  □ Test on desktop (1440px)
  □ All forms usable on all sizes

□ Accessibility
  □ Tab through form (keyboard navigation)
  □ Screen reader compatibility
  □ Error messages announced
  □ Focus indicators visible
```

## Common Issues and Solutions

```
┌─────────────────────────────────────────────────────────┐
│              TROUBLESHOOTING GUIDE                       │
└─────────────────────────────────────────────────────────┘

Issue: Infinite redirect loop
├─ Symptom: Page keeps redirecting
├─ Cause: Login/403 page in middleware matcher
└─ Solution: Exclude from matcher pattern

Issue: "Invalid session" error
├─ Symptom: Always redirects to login
├─ Cause: JWT secret mismatch or expired
└─ Solution: Check NEXTAUTH_SECRET in .env

Issue: Role check fails
├─ Symptom: ADMIN user gets 403
├─ Cause: Role not in JWT callback
└─ Solution: Verify jwt callback in auth-options.ts

Issue: Login form doesn't submit
├─ Symptom: Nothing happens on submit
├─ Cause: NextAuth API route not working
└─ Solution: Check /api/auth/[...nextauth]/route.ts

Issue: 404 on login page
├─ Symptom: /login shows 404
├─ Cause: Page not created or wrong location
└─ Solution: Verify app/login/page.tsx exists

Issue: Styles not applied
├─ Symptom: Unstyled login page
├─ Cause: Tailwind not processing or purging
└─ Solution: Check tailwind.config.ts content paths

Issue: Middleware not executing
├─ Symptom: Can access protected routes
├─ Cause: Middleware file in wrong location
└─ Solution: Must be middleware.ts in root (not src/)
```

This visual guide provides a comprehensive overview of the authentication system architecture, flows, and implementation details.
