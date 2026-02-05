import { Session, ConsignmentData } from './types';

const STORAGE_KEYS = {
    SESSION: 'vma_session',
    ADMIN_AUTH: 'vm_admin_auth',
    ACTIVE_CONSIGNMENT: 'vm_active_consignment',
} as const;

/**
 * Initialize session in localStorage if not present
 */
export function initSession(): void {
    if (typeof window === 'undefined') return;
    if (!localStorage.getItem(STORAGE_KEYS.SESSION)) {
        const session: Session = {
            isAuthed: false,
            clientId: null,
            lastAccess: null,
        };
        localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session));
    }
}

/**
 * Get current session from localStorage
 */
export function getSession(): Session {
    if (typeof window === 'undefined') {
        return { isAuthed: false, clientId: null, lastAccess: null };
    }
    const data = localStorage.getItem(STORAGE_KEYS.SESSION);
    return data ? JSON.parse(data) : { isAuthed: false, clientId: null, lastAccess: null };
}

/**
 * Set session in localStorage
 */
export function setSession(session: Session): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session));
}

/**
 * Validate credentials against MongoDB (Simulated for now)
 */
export async function validateCredentials(
    authorizationCode: string,
    consignmentId: string
): Promise<{ valid: boolean; clientId?: string }> {
    // In a real app, this would be a POST /api/auth/verify
    // For MVP, we'll check against our seeded record
    if (authorizationCode === 'VMA-7712' && consignmentId === 'CN-20498') {
        return { valid: true, clientId: 'client_001' };
    }
    return { valid: false };
}

/**
 * Clear session in localStorage
 */
export function clearSession(): void {
    if (typeof window === 'undefined') return;
    const session: Session = {
        isAuthed: false,
        clientId: null,
        lastAccess: null,
    };
    localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session));
}

/**
 * Get consignment data from API
 */
export async function getConsignment(consignmentId: string): Promise<ConsignmentData | null> {
    try {
        const response = await fetch(`/api/consignment/${consignmentId}`);
        if (!response.ok) return null;
        return await response.json();
    } catch (error) {
        console.error('Error fetching consignment:', error);
        return null;
    }
}

/**
 * Set consignment data via API
 */
export async function setConsignment(consignment: ConsignmentData): Promise<boolean> {
    try {
        const response = await fetch('/api/admin/consignment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(consignment),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('API Error details:', {
                status: response.status,
                statusText: response.statusText,
                data: errorData
            });
            return false;
        }

        return true;
    } catch (error) {
        console.error('Error setting consignment:', error);
        return false;
    }
}

/**
 * Get admin authentication status (localStorage for now)
 */
export function getAdminAuth(): boolean {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
}

/**
 * Set admin authentication status
 */
export function setAdminAuth(authed: boolean): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, authed ? 'true' : 'false');
}

/**
 * Clear admin session
 */
export function clearAdminSession(): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'false');
}

/**
 * Get active consignment ID from localStorage
 */
export function getActiveConsignmentId(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(STORAGE_KEYS.ACTIVE_CONSIGNMENT);
}

/**
 * Set active consignment ID
 */
export function setActiveConsignmentId(id: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.ACTIVE_CONSIGNMENT, id);
}
