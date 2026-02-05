# Handoff: MongoDB Migration for VMAP Tracking

## Context
The **Admin-Controlled Tracking Dashboard** is fully implemented and functional, but currently persists data in browser `localStorage`. The project has been stabilized on **Next.js 14.2.15** and **React 18.3.1**.

## Objective
Migrate all consignment data persistence from `localStorage` to **MongoDB** using the official Node.js driver.

## Connection Details
- **Connection String**: `mongodb+srv://ricktierwilson_db_user:ricktierwilson_db_user@cluster0.c669rej.mongodb.net/?appName=Cluster0`
- **Database Name**: `vmap_tracking` (recommended)
- **Collection**: `consignments`

## Key Files to Review
- `lib/storage.ts`: Contains the current logic using `localStorage` that needs to be refactored to fetch from API routes.
- `lib/types.ts`: Data models for consignments and stages.
- `app/admin/page.tsx`: Admin console logic.
- `app/portal/dashboard/page.tsx`: Client dashboard logic.

## Immediate Next Steps
1.  **Initialize Environment**:
    - Install the driver: `npm install mongodb`
    - [x] Install the driver: `npm install mongodb`
    - [x] Create `.env.local` with `MONGODB_URI` and `DB_NAME`.
    - [x] Setup `lib/mongodb.ts` as a connection singleton.
2.  **Implement API Layer**:
    - [x] `GET /api/consignment/[id]`
    - [x] `POST /api/admin/consignment`
    - [x] `POST /api/admin/seed`
3. - [x] Refactor Admin UI into minimal tabbed layout
    - [x] Create 'Find', 'Calibrate', and 'Preview' tabs
    - [x] Ensure persistent labels on all devices
- [x] Run production build and resolve all bugs/lint errors
- [x] Document login credentials for Admin and Portal

## Credentials for Testing
- **Admin Login**: `admin@vmap.local` / `vmap-admin-2026`
- **Client Login**: `VMA-7712` / `CN-20498` / OTP: `123456`
