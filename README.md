# Vanguard Maritime Asset Protection

A production-quality full-stack website for a private maritime security and strategic logistics firm. Built with Next.js 14, TypeScript, and vanilla CSS.

## Overview

This website features an institutional design with a secure client portal. It demonstrates a complete authentication flow using LocalStorage as a temporary database for MVP purposes.

### Key Features

- **Institutional Design**: Professional, minimal aesthetic with red/orange/white color palette
- **Responsive Layout**: Mobile-first design with full responsive support
- **Secure Client Portal**: Multi-step authentication with login and 2FA
- **LocalStorage Database**: Seed data for authentication and client profiles
- **TypeScript**: Fully typed codebase for reliability
- **Accessible**: Keyboard navigation and proper contrast ratios

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Vanilla CSS with CSS Modules
- **State Management**: LocalStorage (browser-based)
- **Images**: Next.js Image optimization

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
vmap/
├── app/                      # Next.js App Router pages
│   ├── api/                  # API route handlers
│   │   └── portal/           # Portal authentication endpoints
│   ├── capabilities/         # Capabilities page
│   ├── security/             # Security & Compliance page
│   ├── environments/         # Operational Environments page
│   ├── technical/            # Technical Assets page
│   ├── ethics/               # Ethics & Compliance page
│   ├── presence/             # Global Presence page
│   ├── portal/               # Client portal pages
│   │   ├── 2fa/              # Two-factor authentication
│   │   └── dashboard/        # Client dashboard
│   ├── layout.tsx            # Root layout with NavBar/Footer
│   ├── page.tsx              # Landing page
│   └── globals.css           # Global styles and design system
├── components/               # Reusable React components
│   ├── NavBar.tsx
│   ├── Footer.tsx
│   ├── PageHeader.tsx
│   ├── CapabilityCard.tsx
│   ├── ComplianceBadge.tsx
│   ├── SpecList.tsx
│   └── ProtectedRoute.tsx
├── lib/                      # Utilities and types
│   ├── storage.ts            # LocalStorage utilities
│   └── types.ts              # TypeScript type definitions
└── public/                   # Static assets
    └── images/               # Generated images
```

## Using the Client Portal

The client portal demonstrates a secure authentication flow with mock credentials.

### Test Credentials

1. **Login Page** (`/portal`):
   - **Authorization Code**: `VMA-7712`
   - **Consignment ID**: `CN-20498`

2. **2FA Verification** (`/portal/2fa`):
   - **OTP**: `123456`

3. **Dashboard** (`/portal/dashboard`):
   - View client profile and consignment details
   - Click "Secure Logout" to end session

### How Authentication Works

1. **LocalStorage Seeding**: On first page load, the app seeds LocalStorage with:
   - Authentication records (authorization codes + consignment IDs)
   - Client profiles
   - Session state

2. **Login Flow**:
   - User enters credentials on `/portal`
   - Client-side validation against LocalStorage
   - Temporary client ID stored in sessionStorage
   - Redirect to `/portal/2fa`

3. **2FA Flow**:
   - User enters 6-digit OTP
   - API validates OTP (hardcoded to "123456")
   - Session created in LocalStorage
   - Redirect to `/portal/dashboard`

4. **Dashboard**:
   - Protected by `ProtectedRoute` component
   - Displays client profile from LocalStorage
   - Logout clears session

## LocalStorage Schema

### `vma_auth_records`
```typescript
[
  {
    authorizationCode: "VMA-7712",
    consignmentId: "CN-20498",
    clientId: "client_001"
  }
]
```

### `vma_clients`
```typescript
[
  {
    id: "client_001",
    clientName: "Orchid Offshore Renewables",
    partnerType: "Institutional Partner",
    authorizationTier: "Tier-2 Access",
    assignedLiaison: {
      name: "Liaison Desk A-3",
      channel: "Secure Messaging"
    }
  }
]
```

### `vma_session`
```typescript
{
  isAuthed: boolean,
  clientId: string | null,
  lastAccess: string | null
}
```

## Migration to Production Database

This implementation uses LocalStorage for demonstration purposes. For production deployment:

1. **Replace LocalStorage with a database** (PostgreSQL, MongoDB, etc.)
2. **Move validation to server-side**:
   - Update `/app/api/portal/login/route.ts` to query database
   - Update `/app/api/portal/verify-otp/route.ts` to implement real OTP generation
3. **Implement proper session management** (JWT, session cookies, etc.)
4. **Add encryption** for sensitive data
5. **Implement rate limiting** on authentication endpoints

All files with LocalStorage logic include `TODO` comments marking where changes are needed.

## Design Philosophy

### Color Palette
- **Primary**: White (#ffffff)
- **Accent Red**: #c41e3a
- **Accent Orange**: #e85d04
- **Background**: #fafafa
- **Text**: #1a1a1a (primary), #4a4a4a (secondary)

### Typography
- **Font**: System font stack for performance
- **Monospace**: Used only for codes/IDs
- **Hierarchy**: Clear heading structure for accessibility

### Security Aesthetic
- Subtle grid background pattern
- Thin separators and borders
- Minimal, institutional tone
- No marketing fluff or "salesy" language

## Pages

- `/` - Landing page with hero, industry validation, operational posture
- `/capabilities` - Three operational capabilities (Tactical Extraction, Custodial Escort, Diplomatic Freight)
- `/security` - Certifications, compliance framework, access monitoring
- `/environments` - Operational environments (North Sea, South China Sea, etc.)
- `/technical` - S-14 Secure Transit Container specifications
- `/ethics` - Ethics and compliance frameworks
- `/presence` - Regional operational hubs (Singapore, Hong Kong, London, Dubai)
- `/portal` - Client portal login
- `/portal/2fa` - Two-factor authentication
- `/portal/dashboard` - **Client tracking dashboard** (read-only)
- `/admin/login` - **Admin authentication**
- `/admin` - **Admin control panel**

## Admin-Controlled Tracking Dashboard

The portal now includes an admin-controlled tracking system that allows administrators to manage consignment progress and status updates.

### Admin Access

1. **Login** at `/admin/login`:
   - **Email**: `admin@vmap.local`
   - **Password**: `vmap-admin-2026`

2. **Admin Console** at `/admin`:
   - Load existing consignments or seed default data
   - Control progress (current stage, completion percentage)
   - Set stage statuses (Completed, In Progress, Alert Yellow, Alert Red, Locked)
   - Manage operational log entries
   - Quick actions: Advance/Revert stages

### Client Dashboard

Clients see a **read-only tracking dashboard** at `/portal/dashboard` showing:
- **Segmented Progress Bar**: 4-stage visual progress with partial fill based on admin-set percentage
- **Transit Stops Table**: Location and activity details, highlighting current stage
- **Operational Log**: Timestamped chain-of-custody updates with compliance messaging

### How to Use Admin to Control Dashboard State

1. **Login to Admin**: Navigate to `/admin/login` and use credentials above
2. **Load Consignment**: Click "Seed Default" to create VM-7712 consignment
3. **Adjust Progress**:
   - Change "Current Stage" dropdown (1-4)
   - Drag "Stage Progress" slider (0-100%) to control segment fill length
   - Set individual stage statuses to trigger alerts or locks
4. **Add Log Entry**: Enter location and message, click "Append Log Entry"
5. **Save Changes**: Click "Save Changes" to persist to localStorage
6. **View Client Side**: Login to client portal and navigate to dashboard to see updates

**Note**: Changes are stored in localStorage and reflect immediately after client page refresh.

## Development Notes

- **Tailwind CSS**: Admin dashboard and tracking components use Tailwind CSS
- **Vanilla CSS**: Existing pages use vanilla CSS with CSS Modules
- **TypeScript**: Strict typing throughout
- **Client Components**: Portal and admin pages use `'use client'` for interactivity
- **Image Optimization**: Next.js Image component for performance

## License

Proprietary - Vanguard Maritime Asset Protection

---

**Note**: This is a demonstration website. All credentials, client data, and operational details are fictional and for illustrative purposes only.
